import * as aws from '@pulumi/aws';
import * as cloudflare from '@pulumi/cloudflare';

export const cert = new aws.acm.Certificate('ippo-web', {
  domainName: 'ippo.mandos.net.pl',
  region: 'us-east-1',
  validationMethod: 'DNS',
});

new aws.acm.CertificateValidation('ippo-web', {
  certificateArn: cert.arn,
  region: 'us-east-1',
});

cert.domainValidationOptions.apply(options =>
  options.map(option =>
    new cloudflare.DnsRecord(`${option.domainName}-validation`, {
      name: option.resourceRecordName,
      type: option.resourceRecordType,
      ttl: 3600,
      zoneId: 'f4c015a828bb95b6f028f26a06765555',
      content: option.resourceRecordValue,
      comment: 'Certificate validation record for AWS CF ippo-web; project: ippo-web; deploy_engine: pulumi',
    })
  )
);
