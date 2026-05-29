# MacOS System Usage Guide

MacOS is now supported. You can download the unsigned MacOS dmg installer from this site or from Github.

## Installation

Because the installer package is not signed, opening it directly after installation will show a damaged app warning.

![damaged](https://download.clipshare.coclyun.top/images/usages/macos/damaged.png)

During installation, you need to enable the `Allow apps downloaded from anywhere` option in MacOS.

The steps below use MacOS 15 as an example:

1. The `Anywhere` option is hidden by default in system settings, so first run the following command in Terminal:

```shell
sudo spctl --master-disable
```

![master-disable.png](https://download.clipshare.coclyun.top/images/usages/macos/master-disable.png)

2. Then open `Privacy & Security` in System Settings, scroll to the bottom to `Security`, and under `Allow applications downloaded from`, choose `Anywhere`.

![allow-any.png](https://download.clipshare.coclyun.top/images/usages/macos/allow-any.png)

3. Then continue in Terminal and remove the quarantine attribute:

```shell
sudo xattr -r -d com.apple.quarantine /Applications/clipshare.app
```

4. Try opening the app again.

