# Notification Service Deployment

If you use WebDAV or S3 object storage as the relay method, you also need a notification service to notify clients about data changes. The notification content only contains the category and a unique data id. It does not include sensitive information, so it is safe to use.

By default, the app already includes the public free notification service provided by this site. If you want to self-host one just in case this server goes down, you can deploy it with Docker.

Source code: [Github](https://github.com/aa2013/ClipShare/tree/master/go/notification)

The `docker-compose` deployment example is as follows:

```yaml
version: '3.8'

services:
  notification-server:
    image: coclyun/clipshare-notify-server:latest
    container_name: clipshare-notify-server
    ports:
      - "18083:8083"
    volumes:
      - ./logs:/data/logs
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
```

