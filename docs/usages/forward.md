# 中转模式使用说明

默认情况下应用只支持局域网内数据同步，若要在公网中使用需要借助中转程序转发数据 或 使用 Webdav/S3对象存储作为中转方式。

使用存储中转因无法得知数据变化，通常还需搭配一个 [通知服务](./notify-server)

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

该项目是前后端分离架构，Web页面需要单独部署 [Github](https://github.com/aa2013/ClipShareForwardServerWeb)。

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

> 容器映射相关

| 描述        | 容器内路径                 | 容器内端口 |
|-----------|-----------------------|-------|
| 中转程序      | /data                 | 9283  |
| 后台 Web 页面 | /usr/share/nginx/html | 80    |

#### 1.2.1 docker run

```yaml
docker run -d \
--name clipshare-forward-server \
--restart always \
-p 8180:80 \
-p 9283:9283 \
-e TZ=Asia/Shanghai \
coclyun/clipshare-forward-server:latest
```

#### 1.2.2 docker-compose

```yaml
version: "3"
services:
  clipshare-forward-server:
    image: coclyun/clipshare-forward-server:latest
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
  port: 9283
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

## 3. 搭建教程

### 3.1 飞牛 nas

#### 3.1.1 添加加速镜像

::: tip 提示
如果你的网络环境可以直接拉取docker镜像则可以跳过该步骤
:::

在桌面上点击 `docker`，然后选择 `镜像仓库`，然后右上角点击 `仓库设置`
![添加加速镜像](http://download.clipshare.coclyun.top/images/usages/feiniu/img0.png)

点击 `添加`

![添加弹窗1](http://download.clipshare.coclyun.top/images/usages/feiniu/img1.png)

输入名称和加速地址后点击确认保存并点击 `启用` 按钮来启用该加速地址

镜像仓库有很多，可以自行在网上搜索，本处使用了 [轩辕镜像](https://docker.xuanyuan.me/)

```
https://docker.xuanyuan.me/
```

![添加弹窗2](http://download.clipshare.coclyun.top/images/usages/feiniu/img2.png)

#### 3.1.2 创建项目

点击docker左侧导航栏的 `Compose`，然后右上角点击 `新增项目`

![compose页](http://download.clipshare.coclyun.top/images/usages/feiniu/img3.png)

创建一个文件夹用于存储容器运行产生的数据并选择它

![选择文件夹路径](http://download.clipshare.coclyun.top/images/usages/feiniu/img4.png)

在 `来源` 中选择 `创建docker-compose.yml`，同时复制本文档的 `1.2.2` 处的 docker-compose 配置并粘贴

![compose配置](http://download.clipshare.coclyun.top/images/usages/feiniu/img5.png)

然后勾选 `创建项目后立即启动`，最后点击确定开始构建！

![构建进度](http://download.clipshare.coclyun.top/images/usages/feiniu/img6.png)

构建完成后，访问 `ip:8180` 即可访问，默认用户名：`admin`，密码：`1234567`


### 3.2 ClawCloud

::: tip 提示
如果你拥有 Github 账户，且注册时间超过180天则可以在 [Claw Cloud](https://console.run.claw.cloud/signin?link=N02FJIL1286E) 免费获得 5$/月 的额度，可以使用它来构建 中转程序，限制是 10G存储/月 和 10G流量/月
:::

#### 3.2.1 构建

注册后点击 `App Launchpad`
![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_app_launchpad.png)

点击 `Create App`

![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_create_app.png)

弹出的窗口中如图填写相关信息，镜像是 `coclyun/clipshare-forward-server`，左侧的 `Total` 是每天的消耗

![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_create_app_image_info.png)


滑到底部，找到存储配置，点击添加，新增一个存储配置用于保存配置信息，否则重启就没有了

![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_create_app_image_add_storage.png)

点击右上角的 `Deploy Application` 发布应用

::: tip 提示
如果信息填好了发布的时候但是提示 `Internal error occurred: failed to allocate a nodePort`
则表示 TCP 端口可能在当前区域被分配完了，可以在主页左上角切换区域再次尝试
:::

#### 3.2.2 测试访问

在应用页面可以看到应用的访问地址, web端口的https协议直接点击即可访问

![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_access_address.png)

tcp协议的是中转地址，复制它的域名（不要前缀tcp://）到 ClipShare 中测试

![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_access_address_forward_test.png)

成功访问

![img.png](http://download.clipshare.coclyun.top/images/usages/clawcloud/claw_access_address_forward_test_result.png)