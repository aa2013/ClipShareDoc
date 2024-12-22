# 中转模式使用说明

默认情况下应用只支持局域网内数据同步，若要在公网中使用需要借助中转程序转发数据。

本中转程序基于Go语言开发，并配有 Web 后台管理页面，支持设置密钥模式和公开模式，公开模式下可以对文件同步进行限速限制，而密钥功能支持对设备连接数、同步速度进行限制。
:::tip 提示
中转程序不会保留传输的任何数据，仅做数据转发

成功建立双向连接后除文件同步外数据均为加密传输
:::

## 1. 部署

### 1.1 二进制部署

<br/>

#### 1.1.1 中转程序下载

| 平台      | 架构    | 版本  | 下载                                                                                                                                      |
|---------|-------|-----|-----------------------------------------------------------------------------------------------------------------------------------------|
| Windows | amd64 | 1.1 | [forward_server_windows_amd64.exe](https://download.clipshare.coclyun.top/releases/forward-server/1.1/forward_server_windows_amd64.exe) |
| Linux   | amd64 | 1.1 | [forward_server_linux_amd64](https://download.clipshare.coclyun.top/releases/forward-server/1.1/forward_server_linux_amd64)             |
| 历史版本    | -     | -   | [Github](https://github.com/aa2013/ClipShareForwardServerWeb/releases)                                                                  |

#### 1.1.2 Web后台管理页面

该项目是前后端分离架构，Web页面需要单独部署，可根据自己需求进行开发 [Github](https://github.com/aa2013/ClipShareForwardServerWeb)。

该管理页面主要提供以下功能：

+ 简单的网络速度/流量/连接数的实时查看
+ `config.yaml` 配置文件修改
+ 私有模式下的`套餐` 和 `密钥` 的管理
+ 运行日志查看

![connections](https://download.clipshare.coclyun.top/images/forward-server-web/connection.png)

![login](https://download.clipshare.coclyun.top/images/forward-server-web/login.png)

![plan](https://download.clipshare.coclyun.top/images/forward-server-web/plan.png)

![settings](https://download.clipshare.coclyun.top/images/forward-server-web/settings.png)

![logs](https://download.clipshare.coclyun.top/images/forward-server-web/logs.png)

### 1.2 Docker部署

> 容器内部数据存储路径

| 描述        | 容器内路径                 |
|-----------|-----------------------|
| 中转程序数据    | /data                 |
| 后台 Web 页面 | /usr/share/nginx/html |

> 容器内部端口

| 描述        | 容器内端口 |
|-----------|-------|
| 中转程序      | 9283  |
| 后台 Web 页面 | 80    |

#### 1.2.1 docker run

:::tip 提示
请将命令中的 `<version>` 替换为最新的镜像版本
:::

```yaml
docker run -d \
--name clipshare-forward-server \
--restart always \
-p 8180:80 \
-p 9283:9283 \
-e TZ=Asia/Shanghai \
coclyun/clipshare-forward-server:<version>
```

#### 1.2.2 docker-compose

:::tip 提示
请将命令中的 `<version>` 替换为最新的镜像版本
:::

```yaml
version: "3"
services:
  clipshare-forward-server:
    image: coclyun/clipshare-forward-server:<version>
    container_name: clipshare-forward-server
    restart: always
    ports:
      - "8180:80"
      - "9283:9283"
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./data:/data

```

## 2. 相关文件说明

中转程序的所有文件都位于程序所在位置的 `./data` 文件夹下，主要是配置文件、数据库文件、日志文件等

### 2.1 配置文件 config.yaml

配置文件存储了中转程序的一些基本配置信息
::: tip 注意
注释中带有 * 的表示修改该设置后会立即生效!
:::

```yaml
# *是否为公开模式，公开模式所有人都可以连接。同时，从公开模式修改为私有模式后会断开所有除白名单以外的连接！
public-mode: true

# Web管理页面的后台接口配置
web:
  # 后台接口的端口
  port: 8282
  # *管理员登录有效期（单位为秒），若不进行操作，将会在该时间后登录失效
  login-expired-seconds: 1800
  # 管理员登录账号
  admin:
    # *管理员登录用户名，建议修改，此处仅为默认值
    username: admin
    # *管理员登录密码，建议修改，此处仅为默认值
    password: "1234567"

# 中转程序配置
forward:
  # 中转程序端口
  port: 9999
  # *白名单设备，位于此名单的设备中转程序不会做任何资源限制，此项若没有可去除，id 和 name 不能为空，有多项请以 - 号开头
  unlimited-devices:
    - id: aaa # 设备id，即应用中的 “设置” 中的设备id，此项不能为空
      name: aaa # 设备名称，此项不能为空，这个可以自定义，与应用中的设备名称无关
      desc: aaa # 描述，此项可空
    - id: bbb
      name: bbb
      desc: bbb
  # 文件传输限制，仅在公开模式下生效
  file-transfer-limit:
    # *是否启用文件传输限制
    enabled: true
    # *限速速率，单位 KB/s
    rate: 100

# 日志配置
log:
  # *内存中保留的日志数量，其他日志请到 ./data/logs/ 目录中查看
  memory-buffer-size: 1000

```

### 2.2 数据库文件

数据库文件位于 `./data/app.db`，是一个 `sqlite3` 数据库文件，只有当使用私有模式时才会使用到数据库，用于存储配置的套餐以及对应的密钥相关信息