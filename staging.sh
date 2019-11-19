rm -rf build/
npm run build

aws s3 sync --profile=nescaum build/ s3://ma-state-action-tracker --acl public-read
rm -rf build/

echo "http://ma-state-action-tracker.s3-website-us-east-1.amazonaws.com"
