# MacOS系统使用说明

现已支持MacOS！可通过本站或Github 下载 `未签名` 的 MacOS 系统对应的dmg安装包！

## 安装

由于安装包并未签名，安装后直接打开会提示已损坏

![damaged](https://download.clipshare.coclyun.top/images/usages/macos/damaged.png)

安装时需要在MacOS系统中打开 “未知来源” 选项以进行安装

此处以 MacOS 15 为例介绍步骤：

1. 系统设置中默认隐藏了“未知来源” 选项，在终端中执行以下命令

```shell
sudo spctl --master-disable
```
![master-disable.png](https://download.clipshare.coclyun.top/images/usages/macos/master-disable.png)

2. 然后打开系统设置中的 “隐私与安全性”，下拉到底部 “安全性” - “允许以下来源的应用程序”，选择 “任何来源”

![allow-any.png](https://download.clipshare.coclyun.top/images/usages/macos/allow-any.png)

3. 然后继续在终端执行以下命令移除隔离属性：

```shell
sudo xattr -r -d com.apple.quarantine /Applications/clipshare.app
```

4. 然后重新尝试打开 app