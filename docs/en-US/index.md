---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ClipShare"
  text: "Cross-platform Clipboard History and Sync Tool"
  tagline:
  image:
    src: /images/icons/logo.png
    alt: ClipShare
  actions:
    - theme: brand
      text: Download V1.5.0 Now
      link: ./download
    - theme: alt
      text: Guides
      link: ./usages/android
    - theme: alt
      text: FAQ
      link: ./faq

features:
  - icon:
      src: /images/icons/sync.svg
      width: 32
      height: 32
    title: Clipboard Sync
    details: "Automatically detects clipboard changes and syncs them to other devices.<br/>Supports cross-device copy and paste: copy on one device and paste directly on another.<br/>Android 10+ supports background sync."
  - icon:
      src: /images/icons/devices.svg
      width: 32
      height: 32
    title: Cross-platform Support
    details: "Built with Flutter and currently available on Android, Windows, Linux, and MacOS.<br/>The iOS version is under testing..."
  - icon:
      src: /images/icons/category.svg
      width: 32
      height: 32
    title: Multiple Content Types
    details: "Not limited to text. It also supports syncing images, files, and SMS messages.<br/>Supports simple file transfer.<br/>Also supports notification forwarding (Android only): notifications received on your phone can pop up on your computer."
  - icon:
      src: /images/icons/encrypt.svg
      width: 32
      height: 32
    title: Secure Transmission
    details: "Data sync is encrypted with the Diffie-Hellman key exchange algorithm and the AES symmetric encryption algorithm."
  - icon:
      src: /images/icons/network.svg
      width: 32
      height: 32
    title: Public Network Sync
    details: >
        Supports wider network environments. You can build your own relay server to sync the clipboard over the public internet.
        <div class="vp-doc external-link-icon-enabled">
            Details
            <a href="./usages/forward" target="_blank">
              View docs
            </a>
        </div>
  - icon:
      src: /images/icons/tag.svg
      width: 32
      height: 32
    title: Custom Rules
    details: >
        Supports custom rules. You can use regular expressions or Lua scripts to process data under matched conditions.
        <div class="vp-doc external-link-icon-enabled">
            Details
            <a href="./usages/rule/guide" target="_blank">
              View docs
            </a>
        </div>
---

