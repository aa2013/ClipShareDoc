<p align="center"><a href="./README.md">简体中文</a> | English</p>

---

The official documentation site for [ClipShare](https://github.com/aa2013/ClipShare).

## Version Information

### `docs/public/version-info.en.json`

Stable release download info including platform links, version numbers, changelogs, and screenshots.

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

### `docs/public/beta-info.en.json`

Experimental release download info, displayed only on the homepage. Controlled by the `enabled` field — set to `false` to hide.

```json
{
  "enabled": true,
  "version": "1.5.0-beta",
  "date": "2026-05-28",
  "description": "Brief release notes...",
  "githubUrl": "https://github.com/aa2013/ClipShare/releases",
  "downloads": { ... }
}
```

## Development

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Adding a Language

1. Create a new language directory under `docs/docs/`, e.g. `docs/docs/ja-JP/`
2. Add locale config in `docs/.vitepress/config.mts` under `locales`
3. Add the rewrite rule:

```ts
rewrites: {
    'docs/zh-CN/:rest*': 'zh-CN/:rest*',
    'docs/en-US/:rest*': 'en-US/:rest*',
    'docs/ja-JP/:rest*': 'ja-JP/:rest*',  // new language
},
```
