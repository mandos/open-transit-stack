import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { cloudfront } from './cloudfront';
import { bucket } from './s3';

const ghOidcProvider = new aws.iam.OpenIdConnectProvider('github', {
  url: 'https://token.actions.githubusercontent.com',
  clientIdLists: ['sts.amazonaws.com'],
  // Dummy value, see: https://github.com/aws-actions/configure-aws-credentials/issues/357#issuecomment-1626357333
  thumbprintLists: ['ffffffffffffffffffffffffffffffffffffffff'],
});

export const githubActionRole = new aws.iam.Role('github-action', {
  description: 'Deploy ippo app to S3 and invalidate CloudFront cache',
  assumeRolePolicy: aws.iam.getPolicyDocumentOutput({
    statements: [{
      effect: 'Allow',
      principals: [
        {
          type: 'Federated',
          identifiers: [ghOidcProvider.arn],
        }
      ],
      actions: ['sts:AssumeRoleWithWebIdentity'],
      conditions: [
        {
          test: 'StringEquals',
          variable: 'token.actions.githubusercontent.com:aud',
          values: ['sts.amazonaws.com'],
        },
        {
          test: 'StringLike',
          variable: 'token.actions.githubusercontent.com:sub',
          values: ['repo:mandos/open-transit-stack:*']
        }
      ]
    },
    // Only for manual testing purpose
    {
      effect: 'Allow',
      principals: [{
        type: 'AWS',
        identifiers: [
          'arn:aws:iam::282027773285:role/aws-reserved/sso.amazonaws.com/ap-northeast-3/AWSReservedSSO_AdministratorAccess_02d338f825ebeb18'
        ]
      }],
      actions: ['sts:AssumeRole'],
    }]
  }).json
});

const deployToS3Policy = aws.iam.getPolicyDocumentOutput({
  statements: [{
    effect: 'Allow',
    actions: ['s3:PutObject', 's3:DeleteObject', 's3:ListBucket'],
    resources: [bucket.arn, pulumi.interpolate`${bucket.arn}/*`],
  }],
});

new aws.iam.RolePolicy('rw-ippo-bucket', {
  policy: deployToS3Policy.json,
  role: githubActionRole.name
});

const invalidateCloudFrontPolicy = aws.iam.getPolicyDocumentOutput({
  statements: [{
    effect: 'Allow',
    actions: ['cloudfront:CreateInvalidation'],
    resources: [cloudfront.arn],
  }],
});

new aws.iam.RolePolicy('ippo-cloudfront-invalidation', {
  policy: invalidateCloudFrontPolicy.json,
  role: githubActionRole.name
});
