---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ClipShare"
  text: "跨平台剪贴板历史记录与同步工具"
  tagline:
  image:
    src: /images/icons/logo.png
    alt: ClipShare
  actions:
    - theme: brand
      text: 立即下载
      link: /download
    - theme: alt
      text: 使用说明
      link: /usages/android
    - theme: alt
      text: 常见问题
      link: /faq

features:
  - icon:
      src: /images/icons/sync.svg
      width: 32
      height: 32
    title: 剪贴板同步
    details: 自动获知剪贴板变化并同步到其他设备。<br/>支持跨设备复制粘贴，一台设备复制，另一台设备直接粘贴。<br/>Android 10+ 支持后台同步
  - icon:
      src: /images/icons/devices.svg
      width: 32
      height: 32
    title: 跨平台支持
    details: 基于Flutter开发，支持 Android、Windows。<br/>其余平台开发中...
  - icon:
      src: /images/icons/category.svg
      width: 32
      height: 32
    title: 多类型支持
    details: 不限于文本，同时支持图片、文件、短信同步。
  - icon:
      src: /images/icons/encrypt.svg
      width: 32
      height: 32
    title: 安全传输
    details: 基于 Diffie–Hellman 密钥交换算法与 AES 对称加密算法加密数据同步
  - icon:
      src: /images/icons/network.svg
      width: 32
      height: 32
    title: 公网同步
    details: 更广的网络环境支持，可自行搭建中转服务器以在公网环境下同步剪贴板。
  - icon:
      src: /images/icons/tag.svg
      width: 32
      height: 32
    title: 自定义标签
    details: 设定规则，自动对符合规则的记录打上标签。
---
