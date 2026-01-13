---
aside: "left"
---

## 1. 后台保活情况

后台保活主要是依赖 `电池优化` 设置为无限制，还有后台任务卡片中加锁。

::: tip 提示
1.4.0 版本开始极大增强了保活能力，在此前版本的请升级尝试
:::

### 关于自启和开机启动

当前暂无相关功能

## 2. 无线调试

经用户使用一些系统如鸿蒙3中开发者选项设置可能无 `无线调试`
开关，需要 [使用电脑](https://blog.csdn.net/qq_24683975/article/details/121490565?spm=1011.2415.3001.5331)
启用无线调试或直接使用电脑有线激活 Shizuku

如果鸿蒙中在开启无线调试时出现以下提示，需要关闭系统自带的悬浮球

<img src="/images/faq/ohos_wireless_debug_toast.png" alt="backend_history_float_window" width="300" data-fancybox="faq">

## 3. 开机启动最小化失败

使用安装器更新程序时（新安装没问题）不要勾选【自动启动】，使用应用内设置的【开机自启】去设置。

如果已经误选尝试重新在应用内设置重新开关一下【开机自启】，或者`Win + R` 执行 `shell:startup` 检查开机启动文件夹内是否包含
ClipShare，并删除

::: tip 原因
安装程序中勾选【自动启动】后会将程序快捷方式放入开机启动文件夹，开机后会自动启动，但是程序本身也配置了开机自启，这样开机会执行两次启动，第二次启动会让程序显示到前台，所以表现为最小化失败
:::

## 4. 同型号 Android 手机无法连接

基本上是 `设备id`(不是设备名称) 重复的原因。
解决方案：卸载并重新安装 `1.3.0` 以上版本

::: tip 原因
在 `1.3.0` 版本以前，Android 上使用系统的 `android id` 作为 设备id 生成来源，该 id 理论上不会重复。
但实际上发现同型号设备还是容易重复，可能和厂商有关，自 `1.3.0` 版本开始修改了设备 id 生成方式，为了兼容旧版本 设备id 的数据，
`只有在新安装或清除软件数据后才会启用新的 id 生成方式。`
:::

若不想卸载也可先升级到 `1.3.0` 及以上的版本，然后在 `关于` -> `数据库版本`, 右侧图标点击进入数据库编辑页面，执行以下SQL修改为新的
id 生成方式并重启软件（执行成功无提示）：

```sql
update Config
set value = 'persistentDeviceId'
where key = 'mobileDevIdGenerateWay'
```

::: warning 注意
通过修改数据库的形式修改id生成方式后等价于变为新的设备，需要重新配对
:::

## 5. 飞牛OS WebDAV 同步失败

如果使用飞牛的 WebDAV 功能进行中转，当前可能会出现无法同步的问题，原因是似乎不支持直接创建多级文件夹导致失败

解决办法：通过定时任务去每日自动创建指定文件夹即可

步骤：

### 5.1 飞牛商店安装 1Panel

安装的时候记住账号密码和安全入口，然后打开 1Panel，注意使用安全入口访问

<img src="/images/faq/fn_webdav_1.png" alt="fn_os_webdav_1panel_address" width="300" data-fancybox="faq">

### 5.2 创建定时脚本

添加一个计划任务，时间自定
<img src="/images/faq/fn_webdav_2.png" alt="fn_os_webdav_1panel_add_task" data-fancybox="faq">

填入脚本内容：

::: tip 提示
脚本为生成当天和下一天的文件夹，替换脚本中的 clipshare 历史记录的对应设备id的文件夹位置
:::

```shell
# 获取当天日期
today=$(date +"%Y-%m-%d")
# 获取第二天的日期
tomorrow=$(date -d "+1 day" +"%Y-%m-%d")

# ↓↓ 在飞牛的文件夹地址栏内找到 clipshare 的 `history` 文件夹下的设备id对应的文件夹路径复制后直接替换即可 ↓↓
clipshare_path=/vol1/1000/clipshare/history/d270e51d53eec265276646acf646448d

# 创建当天的文件夹
mkdir -p $clipshare_path/$today/files
# 创建第二天的文件夹
mkdir -p $clipshare_path/$tomorrow/files
```

## 6. Android 同步后未自动复制

通常是未授予剪贴板写入权限，或部分系统默认是使用时允许，请检查权限设置手动授予，若系统中无该设置，请下载 `App Ops` 后进行授权

> 系统设置

<img src="/images/faq/write_clipboard_permission1.png" alt="write_clipboard_permission1" data-fancybox="faq" width="300">

> App Ops

<img src="/images/faq/write_clipboard_permission2.png" alt="write_clipboard_permission2" data-fancybox="faq" width="300">
