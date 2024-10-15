# Shizuku 授权

## Shizuku 是什么？
[Shizuku](https://shizuku.rikka.app/zh-hans/introduction/) 是一个用于 Android 系统的开源工具，它允许应用程序在无需 Root 权限的情况下调用系统 API。

通过 Shizuku，用户可以授予特定应用程序更高的系统权限，从而在安全性和易用性之间取得平衡。它的核心功能是基于 [ADB](https://developer.android.google.cn/tools/adb?hl=zh-cn) 调用和运行时权限，使开发者可以在普通用户权限下使用一些高级 API。


## 安装
若还未安装 Shizuku，可以前往 [Github](https://github.com/RikkaApps/Shizuku/releases) 或 [Google Play](https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api) 下载最新版本

鉴于国内特殊网络环境，若无法访问 Github 和 Google Play，可通过本站提供的 [下载地址](https://download.clipshare.coclyun.top/shizuku-v13.5.4.r1049.0e53409-release.apk) 安装，但无法保证是最新版本

## 启动
::: tip 提示
在继续之前，请先确保手机已启用 `开发者选项`，若未启用请先根据您的手机品牌搜索相关教程
:::

Shizuku 有两种启动方式，分别为 `无线调试` 和 `ADB` 启动，请根据合适的方式选择

:::warning 提示
无论使用哪种启动方式，当手机重启后都需要重新启动 Shizuku
:::

### 通过无线调试启动

::: tip 提示
若您的设备为 Android 11 或更高版本可以直接使用 `无线调试`，否则建议使用 `ADB` 启动
:::

请确保已连接到 WIFI，然后启动 `Shizuku`

1. 打开 `Shizuku`，点击 `配对` 按钮

<img src="/images/usages/shizuku/wireless_01.jpeg" alt="wireless_01" width="300" data-fancybox="Shizuku">

2. 点击 `开发者选项` 按钮，然后会跳转到 `开发者选项` 界面

<img src="/images/usages/shizuku/wireless_02.jpeg" alt="wireless_02" width="300" data-fancybox="Shizuku">

3. 找到 `无线调试` 并打开右侧开关，然后点击开关左侧的区域进入无线调试界面

<img src="/images/usages/shizuku/wireless_03.jpeg" alt="wireless_03" width="300" data-fancybox="Shizuku">

4. 点击 `使用配对码配对设备`

<img src="/images/usages/shizuku/wireless_04.jpeg" alt="wireless_04" width="300" data-fancybox="Shizuku">

5. 屏幕底部弹出 `配对码`，并且通知栏弹出通知，点击 `输入配对码`

<img src="/images/usages/shizuku/wireless_05.jpeg" alt="wireless_05" width="300" data-fancybox="Shizuku">

6. 配对码输入完成后，点击 `发送`，然后返回 `Shizuku`

<img src="/images/usages/shizuku/wireless_06.jpeg" alt="wireless_06" width="300" data-fancybox="Shizuku">

7. 返回`Shizuku`后应该会自动进入此界面，等待3s后自动退出，此时 Shizuku 主界面显示 `正在运行` 则启动完成

<img src="/images/usages/shizuku/wireless_07.jpeg" alt="wireless_07" width="300" data-fancybox="Shizuku">

8. 若没有进入此界面，请点击 Shizuku 主界面的 `启动` 按钮

<img src="/images/usages/shizuku/wireless_08.jpeg" alt="wireless_08" width="300" data-fancybox="Shizuku">

9. 若仍然无反应，请从第一步开始重复，有时候需要重复两三次才能启动成功

::: tip 提示
为保证后续正常授权和使用应用，请将 Shizuku 的 `电池优化` 设置为 `不受限制`，并允许 `后台运行`
:::

### 通过 ADB 启动

[ADB](https://developer.android.google.cn/tools/adb?hl=zh-cn)，全称为 **Android Debug Bridge**，是一个用于与 Android 设备进行交互的命令行工具。它允许开发者通过 USB 或 Wi-Fi 连接设备，进行调试、安装应用、传输文件、查看日志、运行测试等操作，是 Android 开发和设备管理的必备工具。

::: tip 提示
使用 ADB 启动 Shizuku 需要一台电脑
:::

若还未下载 `ADB` 请点此 [下载](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn)

1. 手机进入 `开发者选项`，找到 `USB调试` 并打开

   <img src="/images/usages/shizuku/adb_02.jpeg" alt="adb_02" width="300" data-fancybox="adb">
   
2. `默认USB模式` 选择 `文件传输`

   <img src="/images/usages/shizuku/adb_03.jpeg" alt="adb_03" width="300" data-fancybox="adb">

3. 电脑上解压下载好的 `ADB` 工具，此处以 Windows系统为例，进入所在目录，然后在地址栏输入 `cmd` 并回车进入命令行窗口

   <img src="/images/usages/shizuku/adb_01.png" alt="adb_01" width="300" data-fancybox="adb">

4. 执行命令 `adb devices`, 若有一条输出则表示已经成功连接电脑，否则从第一步开始重新检查步骤是否正确

   <img src="/images/usages/shizuku/adb_04.png" alt="adb_04" width="300" data-fancybox="adb">

5. 输入以下命令启动 Shizuku

```shell
adb shell sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh
```

6. 显示以下输出则启动成功

<img src="/images/usages/shizuku/adb_05.png" alt="adb_05" width="300" data-fancybox="adb">

::: tip 提示
为保证后续正常授权和使用应用，请将 Shizuku 的 `电池优化` 设置为 `不受限制`，并允许 `后台运行`
:::