---
aside: "left"
---

## 1. 掉后台情况

后台保活主要是依赖 `电池优化` 设置为无限制，还有后台任务卡片中加锁。

如果已经做了这些设置仍然出现放到后台几十秒钟就断开连接的情况，当前可以选择打开应用设置中的 `显示历史记录悬浮窗`
，可能可以解决这个问题。

<img src="/images/faq/backend_history_float_window.png" alt="backend_history_float_window" width="300" data-fancybox="faq">

## 2. 无线调试

经用户使用一些系统如鸿蒙3中开发者选项设置可能无 `无线调试`
开关，需要 [使用电脑](https://blog.csdn.net/qq_24683975/article/details/121490565?spm=1011.2415.3001.5331)
启用无线调试或直接使用电脑有线激活 Shizuku

如果鸿蒙中在开启无线调试时出现以下提示，需要关闭系统自带的悬浮球

<img src="/images/faq/ohos_wireless_debug_toast.png" alt="backend_history_float_window" width="300" data-fancybox="faq">

## 3. 开机启动最小化失败

使用安装器更新程序时（新安装没问题）不要勾选【自动启动】，使用应用内设置的【开机自启】去设置。

如果已经误选尝试重新在应用内设置重新开关一下【开机自启】，或者`Win + R` 执行 `shell:startup` 检查开机启动文件夹内是否包含 ClipShare，并删除

::: tip 原因
安装程序中勾选【自动启动】后会将程序快捷方式放入开机启动文件夹，开机后会自动启动，但是程序本身也配置了开机自启，这样开机会执行两次启动，第二次启动会让程序显示到前台，所以表现为最小化失败
:::