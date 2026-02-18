import * as aws from '@pulumi/aws';

// Create an AWS resource (S3 Bucket)
export const bucket = new aws.s3.Bucket('ippo-web');

// Disable public access to the website:
new aws.s3.BucketPublicAccessBlock('public-access-block', {
  bucket: bucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: true,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
});
