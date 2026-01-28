## Shizuku后台保活优化

自 1.4.0 版本起 Android 系统上已经极大增强了后台保活能力，理论上前台服务存在则不会被杀后台，但是受限于当前的一个 BUG，当 Shizuku 被杀后台以后，ClipShare 也会因为底层错误无反馈崩溃

以下方案由群友提供：

1. Shizuku 使用 [thedjchi/Shizuku](https://github.com/thedjchi/Shizuku) 分支版本以提升熄灭屏幕、WIFI断开时，Shizuku 的保活能力
2. 考虑将 “开发者选项-默认USB配置” 改为 “不用于数据传输（仅充电）”
3. 为 Shizuku 配置电池优化选项等，尽量让系统不杀后台，具体操作方法有专题站 [dontkillmyapp](https://dontkillmyapp.com/)
4. Shizuku 开启 Watchdog

如果无法访问 Github 下载 thedjchi/Shizuku 分支版本，可使用本站提供的 [thedjchi/Shizuku](https://download.clipshare.coclyun.top/others/shizuku-v13.6.0.r1290-thedjchi.apk)，更新于 2026-01