import * as pulumi from '@pulumi/pulumi';
import { bucket } from './s3';
import { ippoDistribution } from './cloudfront';
import { cert } from './certificate';
import { dns } from './dns';

export const url = pulumi.interpolate`https://${dns.name}`;
export const cloudfrontDomain = ippoDistribution.domainName;
export const bucketName = bucket.id;
export const certificateArn = cert.arn;
