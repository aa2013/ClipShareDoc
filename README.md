<p align="center">简体中文 | <a href="./README.en.md">English</a></p>

---

[ClipShare](https://github.com/aa2013/ClipShare) 官方文档站点。

## 版本信息

### `docs/public/version-info.json`

正式的版本下载信息，包含各平台下载链接、版本号、更新日志和截图。

```json
{
  "downloads": {
    "Windows": { "url": "...", "version": "1.4.4" },
    "Android":  { "url": "...", "version": "1.4.4" },
    "Linux":    { "url": "...", "version": "1.4.4" },
    "MacOS":    { "url": "...", "version": "1.4.4" }
  },
  "logs": [ ... ],
  "images": {
    "Windows": [ { "url": "...", "width": 500 } ],
    "Android": [ { "url": "..." } ]
  }
}
```

### `docs/public/beta-info.json`

实验性版本的下载信息，仅首页显示。通过 `enabled` 字段控制开关，设为 `false` 即可关闭。

```json
{
  "enabled": true,
  "version": "1.5.0-beta",
  "date": "2026-05-28",
  "description": "简要的版本更新说明...",
  "githubUrl": "https://github.com/aa2013/ClipShare/releases",
  "downloads": { ... }
}
```

## 开发

```bash
npm install
npm run docs:dev
npm run docs:build
```
