# ippo-infra

AWS infrastructure for the ippo web application, managed with [Pulumi](https://www.pulumi.com/) (TypeScript).

## Architecture

```
Cloudflare DNS (ippo.mandos.net.pl)
        |
        v
AWS CloudFront (CDN, HTTPS)
        |
        v
AWS S3 (private, static files)
```

- **S3** bucket with all public access blocked
- **CloudFront** distribution with Origin Access Control (OAC) for secure S3 access
- **ACM** certificate (us-east-1) with DNS validation via Cloudflare
- **Cloudflare** DNS CNAME pointing to CloudFront
- **IAM** OIDC role for GitHub Actions deployment (no long-lived credentials)

## Project Structure

| File | Resources |
|------|-----------|
| `s3.ts` | S3 bucket, public access block |
| `cloudfront.ts` | OAC, CloudFront distribution, CloudFront-only bucket policy |
| `certificate.ts` | ACM certificate, DNS validation records |
| `dns.ts` | Cloudflare CNAME record |
| `github-deploy.ts` | GitHub OIDC provider, deploy IAM role and policies |
| `index.ts` | Stack outputs |

## Prerequisites

- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/) (>= v3)
- Node.js (>= 18)
- AWS credentials configured
- Cloudflare API token (for DNS management)

## Usage

```bash
# Preview changes
pulumi preview

# Deploy
pulumi up

# View outputs
pulumi stack output

# Tear down
pulumi destroy
```

## Stack Outputs

| Output | Description |
|--------|-------------|
| `url` | Application URL |
| `cloudfrontOutput` | CloudFront distribution ID and domain |
| `bucketName` | S3 bucket name |
| `certificateArn` | ACM certificate ARN |
| `deployerRole` | GitHub Actions deploy role ARN |

## Scripts

- `scripts/assume-role.sh` - Assume the GitHub deploy IAM role for local testing
