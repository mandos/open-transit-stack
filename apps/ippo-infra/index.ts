import * as pulumi from '@pulumi/pulumi';
import { cert } from './certificate';
import { cloudfront } from './cloudfront';
import { dns } from './dns';
import { githubActionRole } from './github-deploy';
import { bucket } from './s3';

export const url = pulumi.interpolate`https://${dns.name}`;
export const cloudfrontOutput = {
  id: cloudfront.id,
  domain: cloudfront.domainName,
};
export const bucketName = bucket.id;
export const certificateArn = cert.arn;
export const deployerRole = githubActionRole.arn;
