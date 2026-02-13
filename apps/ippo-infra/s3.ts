import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
// import * as awsx from '@pulumi/awsx';

// Create an AWS resource (S3 Bucket)
export const bucket = new aws.s3.Bucket('ippo-web');

new aws.s3.BucketWebsiteConfiguration('ippo-web', {
  bucket: bucket.id,
  indexDocument: {
    suffix: 'index.html',
  },
}, {});

// Enable public access to the website:
new aws.s3.BucketPublicAccessBlock('public-access-block', {
  bucket: bucket.id,
  blockPublicAcls: false,
});


new aws.s3.BucketOwnershipControls('ownership-controls', {
  bucket: bucket.id,
  rule: {
    objectOwnership: 'ObjectWriter'
  }
});

new aws.s3.BucketAcl('acl', {
  bucket: bucket.id,
  acl: 'public-read',
});

const policyDocument = aws.iam.getPolicyDocumentOutput({
  statements: [
    {
      sid: 'PublicReadGetObject',
      effect: 'Allow',
      principals: [{ type: '*', identifiers: ['*'] }],
      actions: [
        's3:GetObject'
      ],
      resources: [
        pulumi.interpolate`arn:aws:s3:::${bucket.id}/*`
      ]
    }
  ]
});

new aws.s3.BucketPolicy('read-all',
  {
    bucket: bucket.id,
    policy: policyDocument.json
  });
