---
aside: "left"
---

## 📥 Latest Downloads

| Platform | Architecture | Format | Download | Version | Notes |
|---------|-------------|--------|----------|---------|-------|
| Windows | x86_64 | exe | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/clipshare-1.4.3+25-windows-setup.exe) | 1.4.3 | Windows 10+, Installer |
| Windows | x86_64 | zip | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/clipshare-1.4.3+25-windows.zip) | 1.4.3 | Windows 10+, Portable |
| Android | arm64-v8a | apk | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/app-arm64-v8a-release-v1.4.3.apk) | 1.4.3 | Android 7.0 |
| Android | armeabi-v7a | apk | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/app-armeabi-v7a-release-v1.4.3.apk) | 1.4.3 | Android 7.0 |
| Android | x86_64 | apk | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/app-x86_64-release-v1.4.3.apk) | 1.4.3 | Android 7.0 |
| Linux | x86_64 | AppImage | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/clipshare-1.4.3+25-linux.AppImage) | 1.4.3 | - |
| Linux | x86_64 | deb | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/clipshare-1.4.3+25-linux.deb) | 1.4.3 | - |
| Linux | x86_64 | rpm | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/clipshare-1.4.3+25-linux.rpm) | 1.4.3 | - |
| MacOS | Universal | dmg | [Download](https://download.clipshare.coclyun.top/releases/clipshare/1.4.3/clipshare-1.4.3+25-macos.dmg) | 1.4.3 | MacOS 10.15+ |

> For more historical versions, please visit [Github Releases](https://github.com/aa2013/ClipShare/releases).

## 📌 Release Notes

### 🏷️ v1.4.3 - 2026-03-21

#### General

✨ Added batch merge copy and multi-export for multi-selection  
✨ Added backup support for WebDAV/S3  
🛠️ Fixed incomplete theme switching when starting with dark theme by default  
🛠️ Fixed notification content being copied after sync notifications  
🛠️ Fixed version incompatibility prompts under WebDAV/S3 when not on the latest version  
🛠️ Fixed some S3 services failing to connect because Region and PathStyle parameters were not passed in  
⚡ Improved future update dialogs to support choosing the installer package type  
⚡ Improved swipe multi-select and range multi-select  
⚡ Improved the additional left-swipe action buttons  
⚡ Improved history cards by adding a copy button  
⚡ Improved device discovery logic  
⚡ Improved relay mode support for IPv6 addresses  
⚡ Improved data cleanup by allowing cleanup while retaining a specified number of days  
⚡ Improved delete behavior so data can be removed locally only instead of from all devices  
⚡ Improved reconnect logic  

#### Android

🛠️ Fixed screenshot capture failing on some devices due to permission issues by trying privileged commands  
🛠️ Fixed cases where pasted content could not be pasted into QQ, WeChat, and similar apps after copying  
⚡ Improved floating windows so notification content is no longer displayed  

#### Windows

✨ Added popup windows that remember their size and can be resized  
🛠️ Fixed the notification icon in the upper-left corner sometimes not being displayed  
🛠️ Fixed the blurred drawer background affecting the title bar  
⚡ Improved desktop history cards so they can be copied by right-click double-click  
⚡ Improved future update dialogs so the zip portable package can support automatic updates  

#### Linux

✨ Added popup windows that remember their size and can be resized  
🛠️ Fixed the blurred drawer background affecting the title bar  
⚡ Improved desktop history cards so they can be copied by right-click double-click  

#### MacOS

> Note: updating from version 1.4.2 will cause data loss.

✨ Added popup windows that remember their size and can be resized  
🛠️ Fixed incorrect database and storage paths, which previously redirected into the app itself and caused data loss after updating  
⚡ Improved desktop history cards so they can be copied by right-click double-click  

### 🏷️ v1.4.2 - 2026-02-03

#### General

⚡ Improved some UI details

#### Windows

🛠️ Fixed the Windows exclude-format option switch. It is now available but disabled by default. It used to be enabled by default and could prevent clipboard listening in some environments  
⚡ Improved the desktop file-send popup to support pressing Enter to send  
⚡ Improved startup behavior so the security authentication page is not triggered directly when the app starts minimized

#### Android

🛠️ Fixed rare cases where the floating window failed to close and prevented the input method from appearing  
🛠️ Fixed possible crashes caused by third-party libraries in very rare scenarios  
⚡ Improved the history floating window so it can be opened by double-clicking the left edge of the vertical bar  
⚡ Improved backup restore by pausing screenshot copying to avoid false recognition  
⚡ Improved bottom occlusion issues on full-screen Android devices

#### Linux

✨ Initial release

#### MacOS

> Note: this version may lose data because of path changes. MacOS users are not advised to use version 1.4.2.

⚡ Improved MacOS so closing the window automatically removes the app from the Dock  
⚡ Improved the desktop file-send popup to support pressing Enter to send  
⚡ Improved startup behavior so the security authentication page is not triggered directly when the app starts minimized

### 🏷️ v1.4.1 - 2026-01-05

#### General

🛠️ Fixed updates that could not be downloaded directly  
🛠️ Fixed the conflict caused by running database migration code repeatedly after downgrading and then upgrading again  

#### Windows

🛠️ Fixed clipboard data with special formats not releasing the clipboard, which prevented other processes from using it

#### Android

⚡ Improved initialization issues that could occur after hiding the app to the background

#### MacOS

\-

### 🏷️ v1.4.0 - 2025-12-29

#### General

✨ Added Android notification forwarding with desktop display  
✨ Added text tokenization  
✨ Added encryption for parameters used during device connection  
✨ Added configurable sync data scope  
🛠️ Fixed slow deletion with large amounts of data by adding indexes  
⚡ Improved settings to address cases where some systems cannot auto-copy while the screen is locked  
⚡ Improved the updater to automatically delete update package files after updating  
⚡ Improved the device discovery flow with support for manual subnet scan only and excluding specific network adapters  
⚡ Improved tag management sort order

#### Windows

🛠️ Fixed Windows tray dependency updates and resolved tray disappearing in some scenarios  
🛠️ Fixed minimize-at-start issues by removing the startup option from the Windows installer to avoid conflicts

#### Android

✨ Added an option to stop listening after the screen turns off to save power  
✨ Added support for sharing synced/new data with other apps via broadcasts  
🛠️ Fixed some systems soft rebooting because the system layer crashed after creating a floating window  
🛠️ Fixed the work mode selection dialog not being closable when permission was missing  
🛠️ Fixed the app not being able to stay alive after being hidden to the background  
⚡ Greatly improved Android background keepalive capability  
⚡ Improved logs by supporting generation of native Android logs for the current day and adding a manual clear button

#### MacOS

\-

---

### 🏷️ v1.3.1 - 2025-11-24

#### General

🛠️ Fixed the system app list appearing incorrectly under user apps when selecting blacklist app sources  
🛠️ Fixed the file-send page popup occasionally closing in a way that caused the main route to be popped  
🛠️ Fixed canceling on the security authentication page causing later popups to fail  
⚡ Improved the device list to support filtering online status and sorting by device name  
⚡ Improved the About page so update popups can still be checked manually even after skipping the current version  
⚡ Improved the text in the update dialog to avoid being auto-clicked by Li Tiaotiao  
⚡ Improved blacklist support by adding category conditions

#### Windows

\-

#### Android

🛠️ Fixed the root mode selection dialog not closing automatically  
⚡ Improved the onboarding completion page by moving the finish button to the center  
⚡ Improved device connection and pairing notifications to auto-dismiss and avoid piling up in the status bar

#### MacOS

🛠️ Fixed update check failures on MacOS

---

### 🏷️ v1.3.0 - 2025-11-09

#### General

✨ Added experimental support for using WebDAV/S3 object storage as a relay method  
✨ Added a local database query and editor page in the About page  
🛠️ Fixed cases where popup windows sometimes could not close normally  
🛠️ Fixed possible path decoding errors during file sending where the operation actually succeeded but was shown as failed  
🛠️ Fixed manual single-item sync chains like A->B and B->C losing source info and tag info  
🛠️ Fixed image sync failures caused by missing folders under certain conditions  
⚡ Improved backup and restore so it can be handled module by module  
⚡ Improved deletion performance for cases that used to take a long time  
⚡ Improved relay configuration to support QR-code import  
⚡ Improved relay service status by adding `Connecting`  
⚡ Improved log output

#### Windows

🛠️ Fixed the installer not being able to stop the running program during installation

#### Android

🛠️ Fixed exceptions on some devices during initialization when storage permission had not been granted  
🛠️ Fixed issues that could cause crashes  
⚡ Improved file selection by showing local albums and similar pickers  
⚡ Improved new-install device id generation to avoid duplicates on devices of the same model  
⚡ Improved dependencies and optimized the installed-app acquisition logic

#### MacOS

✨ Initial MacOS adaptation release (2025-11-14)

---

### 🏷️ v1.2.1 - 2025-09-05

#### General

\-

#### Windows

🛠️ Fixed clearing hotkeys with default values and then restarting causing them to revert to defaults  
🛠️ Fixed errors after restarting when window size records existed

#### Android

\-

---

### 🏷️ v1.2.0 - 2025-09-01

#### General

✨ Added blacklist support  
✨ Added backup and restore support  
⚡ Improved some minor UI details  
⚡ Improved startup by displaying error information when initialization fails

#### Windows

🛠️ Fixed some Windows devices failing to obtain device information on startup

#### Android

🛠️ Fixed images copied from the floating window not being pasteable

---

### 🏷️ v1.1.2 - 2025-07-25

#### General

✨ Added device connection notifications  
🛠️ Fixed device info sync errors  
🛠️ Fixed clipboard source information occasionally not syncing  
🛠️ Fixed possible incomplete export counts in the Excel export feature  
🛠️ Fixed new tags not updating in the search filter after creation  
⚡ Improved sync behavior so data missed during disconnect does not have to be synced automatically after reconnection, while also adding manual sync in the device action popup  
⚡ Improved source filtering operations in search/data cleanup filters  
⚡ Improved some minor UI details

#### Windows

✨ Added desktop hotkey settings for showing the main window and exiting the program  
🛠️ Fixed custom hotkeys containing number keys being displayed as `Unknown`  
🛠️ Fixed very rare cases where enabling auto-start could not reconnect the relay automatically  
🛠️ Fixed the desktop popup being unable to reopen the second time when the same hotkey was used to close it  
⚡ Improved storage by separating screenshots and received files (`Screenshots/files`)

#### Android

🛠️ Fixed images being saved to the Downloads directory when the user chose not to save them to the album  
🛠️ Fixed Android record double-click not being able to copy images

---

### 🏷️ v1.1.1 - 2025-06-17

#### General

🛠️ Fixed null-pointer crashes in the clipboard source feature under certain conditions

#### Windows

\-

#### Android

\-

---

### 🏷️ v1.1.0 - 2025-06-15

#### General

✨ Added clipboard source support  
✨ Added a device disconnect notification option

#### Windows

✨ Added an app lock for Windows  
🛠️ Fixed copy failures when certain emoji were included on Windows

#### Android

⚡ Improved Android so screenshots are blocked after enabling app lock

---

### 🏷️ v1.0.0-beta 14 - 2025-06-09

#### General

⚡ Improved disconnect notifications so they are shown only when a device disconnects abnormally  
⚡ Improved update handling by sending a system notification when an update is available

#### Windows

\-

#### Android

🛠️ Fixed relay connections being disconnected after the screen lights up again  
⚡ Improved mobile devices so they do not scan the network or use broadcast discovery on mobile data

---

### 🏷️ v1.0.0-beta 13 - 2025-06-07

#### General

✨ Added Excel export on the search page  
✨ Added data editing so historical data can be modified without changing its timestamp  
✨ Added notifications after device disconnection  
🛠️ Fixed some search filter issues  
🛠️ Fixed tag management search not working  
⚡ Improved updates so files can be downloaded directly and opened  
⚡ Improved cleanup so device info is automatically removed if the device has no data and is no longer paired  
⚡ Improved some UI details

#### Windows

🛠️ Fixed duplicate shortcuts after updating through the Windows updater causing startup launches to fail to stay minimized  
🛠️ Fixed slow exit through the Windows tray

#### Android

🛠️ Fixed relay reconnect failures that could happen when switching from WiFi to mobile data because the network state changed too quickly

---

### 🏷️ v1.0.0-beta 12 - 2025-05-10

#### General

🛠️ Fixed incomplete theme switching  
🛠️ Fixed relay disconnection not reconnecting automatically  
⚡ Improved file transfer history so all items can be selected  
⚡ Improved device connection logic  
⚡ Improved some UI details  
⚡ Improved some interaction logic

#### Windows

⚡ Improved Windows popups so they can be closed with the same hotkey

#### Android

✨ Added Android hidden-API clipboard listening mode to solve clipboard monitoring issues on systems such as OriginOS  
🛠️ Fixed the Android Shizuku service process not exiting  
⚡ Improved Android so device scanning can be skipped when the screen turns from off to on

---

### 🏷️ v1.0.0-beta 11 - 2025-04-09

#### General

✨ Added desktop history popup search  
✨ Added drag-and-drop file sync  
⚡ Improved some UI details  
⚡ Improved some interaction logic

#### Windows

\-

#### Android

\-

---

### 🏷️ v1.0.0-beta 10 - 2025-03-09

#### General

✨ Added QR-code connection when manually adding a device  
✨ Added data cleanup  
⚡ Improved some UI details

#### Windows

✨ Added remembering the previous position of the Windows history popup

#### Android

✨ Added screenshot detection and auto-copy on Android

---

### 🏷️ v1.0.0-beta 9 - 2025-01-19

#### General

⚡ Improved some UI details

#### Windows

🛠️ Fixed missing multi-language translations in Windows popups  
🛠️ Fixed image preview not working in Windows popups

#### Android

✨ Added recent-tasks show/hide option on Android

---

### 🏷️ v1.0.0-beta 8 - 2025-01-14

#### General

✨ Added language options

#### Windows

\-

#### Android

🛠️ Fixed Android jumping to the app automatically after syncing images

---

### 🏷️ v1.0.0-beta 7 - 2025-01-05

#### General

✨ Added reconnect mechanism

#### Windows

\-

#### Android

\-

