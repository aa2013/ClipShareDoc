# Shizuku Authorization

## What is Shizuku?

[Shizuku](https://shizuku.rikka.app/zh-hans/introduction/) is an open-source Android tool that allows apps to call system APIs without requiring Root permission.

With Shizuku, users can grant certain apps elevated system privileges while balancing security and convenience. Its core functionality is based on [ADB](https://developer.android.google.cn/tools/adb?hl=zh-cn) and runtime permissions, allowing developers to use some advanced APIs under normal user privileges.

## Installation

If Shizuku is not installed yet, you can download the latest version from [Github](https://github.com/RikkaApps/Shizuku/releases) or [Google Play](https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api).

Because of network restrictions in some regions, if Github and Google Play are not accessible, you can install it from the [download link](https://download.clipshare.coclyun.top/others/shizuku-v13.5.4.r1049.0e53409-release.apk) provided on this site, though it may not be the latest version.

::: tip Tip
If keeping Shizuku alive in the background is difficult, [see here](./shizuku-background-alive).
:::

## Start

::: tip Tip
Before continuing, make sure `Developer options` is already enabled on your phone. If not, please search for a tutorial for your phone brand first.
:::

Shizuku can be started in two ways: `Wireless debugging` and `ADB`. Choose the method that best fits your situation.

::: warning Tip
No matter which method you use, Shizuku must be started again after the phone restarts.
:::

### Start with Wireless Debugging

::: tip Tip
If your device is running Android 11 or later, you can directly use `Wireless debugging`. Otherwise, using `ADB` is recommended.
:::

Make sure you are connected to Wi-Fi, then launch `Shizuku`.

1. Open `Shizuku` and tap the `Pairing` button.

<img src="/images/usages/shizuku/wireless_01.jpeg" alt="wireless_01" width="300" data-fancybox="Shizuku">

2. Tap `Developer options`, and you will be taken to the `Developer options` page.

<img src="/images/usages/shizuku/wireless_02.jpeg" alt="wireless_02" width="300" data-fancybox="Shizuku">

3. Find `Wireless debugging`, turn on the switch on the right, then tap the area on the left side of the switch to enter the wireless debugging page.

<img src="/images/usages/shizuku/wireless_03.jpeg" alt="wireless_03" width="300" data-fancybox="Shizuku">

4. Tap `Pair device with pairing code`.

<img src="/images/usages/shizuku/wireless_04.jpeg" alt="wireless_04" width="300" data-fancybox="Shizuku">

5. A `pairing code` will appear at the bottom of the screen, and a notification will appear in the notification bar. Tap `Enter pairing code`.

<img src="/images/usages/shizuku/wireless_05.jpeg" alt="wireless_05" width="300" data-fancybox="Shizuku">

6. After entering the pairing code, tap `Send`, then return to `Shizuku`.

<img src="/images/usages/shizuku/wireless_06.jpeg" alt="wireless_06" width="300" data-fancybox="Shizuku">

7. After returning to `Shizuku`, it should automatically enter the following screen and exit after about 3 seconds. If the Shizuku main page shows `Running`, startup is complete.

<img src="/images/usages/shizuku/wireless_07.jpeg" alt="wireless_07" width="300" data-fancybox="Shizuku">

8. If this screen does not appear, tap the `Start` button on the Shizuku main page.

<img src="/images/usages/shizuku/wireless_08.jpeg" alt="wireless_08" width="300" data-fancybox="Shizuku">

9. If there is still no response, repeat the process from step 1. Sometimes it takes two or three tries to start successfully.

::: tip Tip
To ensure proper authorization and use later, set Shizuku's `Battery optimization` to `Unrestricted` and allow it to `Run in background`.
:::

### Start with ADB

[ADB](https://developer.android.google.cn/tools/adb?hl=zh-cn), short for **Android Debug Bridge**, is a command-line tool used to interact with Android devices. It allows developers to connect devices over USB or Wi-Fi for debugging, app installation, file transfer, log viewing, running tests, and more. It is an essential tool for Android development and device management.

::: tip Tip
Using ADB to start Shizuku requires a computer.
:::

If you have not downloaded `ADB` yet, click here to [download](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn).

1. On your phone, enter `Developer options`, find `USB debugging`, and turn it on.

   <img src="/images/usages/shizuku/adb_02.jpeg" alt="adb_02" width="300" data-fancybox="adb">

2. Set `Default USB configuration` to `File transfer`.

   <img src="/images/usages/shizuku/adb_03.jpeg" alt="adb_03" width="300" data-fancybox="adb">

3. On your computer, extract the downloaded `ADB` tools. Using Windows as an example, enter the extracted directory, type `cmd` in the address bar, and press Enter to open the command line window.

   <img src="/images/usages/shizuku/adb_01.png" alt="adb_01" width="300" data-fancybox="adb">

4. Run the command `adb devices`. If one device appears in the output, the computer connection is successful. Otherwise, go back to step 1 and re-check the setup.

   <img src="/images/usages/shizuku/adb_04.png" alt="adb_04" width="300" data-fancybox="adb">

5. Run the following command to start Shizuku:

```shell
adb shell sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh
```

6. If you see the following output, startup succeeded:

<img src="/images/usages/shizuku/adb_05.png" alt="adb_05" width="300" data-fancybox="adb">

::: tip Tip
To ensure proper authorization and use later, set Shizuku's `Battery optimization` to `Unrestricted` and allow it to `Run in background`.
:::


