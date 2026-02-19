import * as pulumi from '@pulumi/pulumi';
import { bucket } from './s3';
import { cloudfront } from './cloudfront';
import { cert } from './certificate';
import { dns } from './dns';
import { githubActionRole } from './github-deploy';

export const url = pulumi.interpolate`https://${dns.name}`;
export const cloudfrontOutput = {
  id: cloudfront.id,
  domain: cloudfront.domainName,
};
export const bucketName = bucket.id;
export const certificateArn = cert.arn;
export const deployerRole = githubActionRole.arn;
