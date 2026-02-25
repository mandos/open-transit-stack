#!/usr/bin/env sh

env_dir="apps/ippo-web/envs"

mkdir -p "$env_dir"
echo "S3_BUCKET_NAME='$(jq -r .bucketName "apps/ippo-infra/outputs/prod.json")'" >"${env_dir}/prod-infra.env"
echo "CLOUDFRONT_DISTRIBUTION_ID='$(jq -r .cloudfrontOutput.id "apps/ippo-infra/outputs/prod.json")'" >>"${env_dir}/prod-infra.env"

cat "$env_dir/prod-infra.env"
