# 通知服务部署

如果使用Webdav或S3对象存储作为中转方式，需要搭配一个通知服务进行数据变更通知，通知内容仅包含类别和表示数据的唯一id，不含敏感信息可放心使用。

默认情况下应用已经内置本站提供的公益免费通知服务，如果需要自建（万一本服务器崩了呢）可以通过 Docker 进行部署。

源代码：[Github](https://github.com/aa2013/ClipShare/tree/master/go/notification)

docker-compose 部署脚本如下：

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

