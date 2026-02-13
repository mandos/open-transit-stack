import * as aws from '@pulumi/aws';
import * as s3 from './s3';
import { cert } from './certificate';

const _default = new aws.cloudfront.OriginAccessControl('default', {
  name: 'default',
  originAccessControlOriginType: 's3',
  signingBehavior: 'always',
  signingProtocol: 'sigv4',
});


export const ippoDistribution = new aws.cloudfront.Distribution('ippo', {
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
    originAccessControlId: _default.id
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
      queryString: true,
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
    // cloudfrontDefaultCertificate: true
  }
});
