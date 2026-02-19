#!/usr/bin/env sh

usage() {
  echo "Usage: $0 <role-arn>"
  echo ""
  echo "Assume an AWS IAM role and print export commands for temporary credentials."
  echo ""
  echo "Arguments:"
  echo "  role-arn    The ARN of the IAM role to assume"
  echo ""
  echo "Example:"
  echo "  $0 arn:aws:iam::282027773285:role/github-action-1234567"
  echo ""
  echo "To apply credentials, run with eval:"
  echo "  eval \$($0 <role-arn>)"
  echo ""
  echo "To clear credentials afterwards:"
  echo "  unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN"
}

if [ "$1" = "-h" ] || [ "$1" = "--help" ] || [ -z "$1" ]; then
  usage
  exit 0
fi

AWS_ROLE="$1"

CREDENTIALS_JSON="$(aws sts assume-role --role-arn "$AWS_ROLE" --role-session-name test --query 'Credentials' --output json)" || exit 1

echo "export AWS_ACCESS_KEY_ID='$(echo "$CREDENTIALS_JSON" | jq -r .AccessKeyId)'"
echo "export AWS_SECRET_ACCESS_KEY='$(echo "$CREDENTIALS_JSON" | jq -r .SecretAccessKey)'"
echo "export AWS_SESSION_TOKEN='$(echo "$CREDENTIALS_JSON" | jq -r .SessionToken)'"
