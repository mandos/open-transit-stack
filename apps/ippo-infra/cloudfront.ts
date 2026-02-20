import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { cert } from './certificate';
import * as s3 from './s3';

const _defaultOAC = new aws.cloudfront.OriginAccessControl('default', {
  name: 'default',
  originAccessControlOriginType: 's3',
  signingBehavior: 'always',
  signingProtocol: 'sigv4',
});

export const cloudfront = new aws.cloudfront.Distribution('ippo', {
  enabled: true,
  defaultRootObject: 'index.html',
  priceClass: 'PriceClass_100',
  aliases: ['ippo.mandos.net.pl'],
  comment: 'Serve ippo-web app from S3 bucket',
  tags: {
    name: 'ippo.mandos.net.pl'
  },
  origins: [{
    domainName: s3.bucket.bucketDomainName,
    originId: 's3-ippo-web',
    originAccessControlId: _defaultOAC.id
  }],
  defaultCacheBehavior: {
    allowedMethods: ['HEAD', 'GET', 'OPTIONS'],
    cachedMethods: ['HEAD', 'GET', 'OPTIONS'],
    targetOriginId: 's3-ippo-web',
    viewerProtocolPolicy: 'redirect-to-https',
    forwardedValues: {
      cookies: {
        forward: 'none',
      },
      queryString: false,
    }
  },
  restrictions: {
    geoRestriction: {
      restrictionType: 'none',
    }
  },
  viewerCertificate: {
    acmCertificateArn: cert.arn,
    sslSupportMethod: 'sni-only',
  }
});

const cloudfrontPolicy = aws.iam.getPolicyDocumentOutput({
  statements: [{
    sid: 'AllowCloudFrontReadOnly',
    effect: 'Allow',
    principals: [{ type: 'Service', identifiers: ['cloudfront.amazonaws.com'] }],
    actions: ['s3:GetObject'],
    resources: [pulumi.interpolate`${s3.bucket.arn}/*`],
    conditions: [{
      test: 'StringEquals',
      variable: 'AWS:SourceArn',
      values: [cloudfront.arn],
    }]
  }]
});

new aws.s3.BucketPolicy('cloudfront-read', {
  bucket: s3.bucket.id,
  policy: cloudfrontPolicy.json
});
