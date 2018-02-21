yarn build:prod
aws s3 sync ./dist s3://ny-burger-blog --exclude=stats.json --exclude=server.js --acl public-read --delete
pm2 reload client 
