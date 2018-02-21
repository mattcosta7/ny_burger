yarn build:prod
aws s3 cp ./dist s3://ny-burger-blog --recursive --exclude=stats.json --exclude=server.js --exclude=service-worker.js --exclude=index.html --acl public-read --cache-control max-age=31536000
aws s3 cp ./dist/index.html s3://ny-burger-blog --acl public-read
aws s3 cp ./dist/service-worker.js s3://ny-burger-blog --acl public-read
# aws s3 sync ./dist s3://ny-burger-blog --exclude=stats.json --exclude=server.js --acl public-read --delete --cache-control max-age=31536000
pm2 reload client 
