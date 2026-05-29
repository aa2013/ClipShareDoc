## Shizuku Background Keepalive Optimization

Starting from version 1.4.0, background keepalive on Android has been greatly improved. In theory, as long as the foreground service exists, it should not be killed in the background. However, due to a current bug, when Shizuku is killed in the background, ClipShare may also crash silently because of a lower-level error.

The following suggestions were provided by community members:

1. Use the [thedjchi/Shizuku](https://github.com/thedjchi/Shizuku) branch build to improve Shizuku keepalive when the screen turns off or Wi-Fi disconnects.
2. Consider changing `Developer options -> Default USB configuration` to `No data transfer (charging only)`.
3. Configure battery optimization and related settings for Shizuku so the system is less likely to kill it in the background. For detailed guidance, see [dontkillmyapp](https://dontkillmyapp.com/).
4. Enable Watchdog in Shizuku.

If you cannot access Github to download the thedjchi/Shizuku branch build, you can use the [thedjchi/Shizuku](https://download.clipshare.coclyun.top/others/shizuku-v13.6.0.r1290-thedjchi.apk) package provided on this site, updated in 2026-01.

