---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ClipShare"
  text: "一款跨平台剪贴板历史记录与同步工具"
  tagline:
  image:
    src: /img/logo.png
    alt: ClipShare
  actions:
    - theme: brand
      text: 立即下载
      link: /markdown-examples
    - theme: alt
      text: 使用说明
      link: /usage

features:
  - icon:
      src: /img/sync.svg
      width: 32
      height: 32
    title: 剪贴板同步
    details: 自动获知剪贴板变化并同步到其他设备，一台设备复制，另一台设备直接粘贴。<br/>Android 10+ 支持后台同步
  - icon:
      src: /img/devices.svg
      width: 32
      height: 32
    title: 跨平台支持
    details: 基于Flutter开发，支持 Android、Windows。<br/>其余平台开发中...
  - icon:
      src: /img/category.svg
      width: 32
      height: 32
    title: 多类型支持
    details: 不限于文本，同时支持图片、文件、短信同步。<br/>从此小文件同步摆脱QQ、微信。
  - icon:
      src: /img/encrypt.svg
      width: 32
      height: 32
    title: 安全传输
    details: 基于 Diffie–Hellman 密钥交换算法与 DES 对称加密算法加密数据同步
  - icon:
      src: /img/tag.svg
      width: 32
      height: 32
    title: 自定义标签
    details: 设定规则，自动对符合规则的记录打上标签，查找记录不在盲目。
---
