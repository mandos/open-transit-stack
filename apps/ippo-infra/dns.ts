import { ippoDistribution } from './cloudfront';
import * as cloudflare from '@pulumi/cloudflare';

export const dns = new cloudflare.DnsRecord(`ippo-web`, {
  name: 'ippo',
  type: 'CNAME',
  ttl: 3600,
  zoneId: 'f4c015a828bb95b6f028f26a06765555',
  content: ippoDistribution.domainName,
  comment: 'project: ippo-web; deploy_engine: pulumi',
});
