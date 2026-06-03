# 自定义路径配置说明

::: tip 提示
ClipShare 1.5.0+ 版本可用
:::

ClipShare 支持通过外部配置指定文件存储目录和数据库目录。

目前支持两种方式：

- `custom_path.json` 配置文件
- 环境变量

环境变量的优先级高于 `custom_path.json`。如果两种方式同时配置了同一个路径，会优先使用环境变量中的值。

## 可配置项

| 用途      | JSON 文件方式       | 环境变量                        | 说明                   |
|---------|-----------------|-----------------------------|----------------------|
| 文件存储根目录 | `fileStorePath` | `CLIPSHARE_FILE_STORE_PATH` | 用于保存同步文件、截图等文件数据     |
| 数据库目录   | `databasePath`  | `CLIPSHARE_DATABASE_PATH`   | 用于保存 ClipShare 数据库文件 |

注意：`fileStorePath` 配置的是文件存储根目录，不是最终的 `files` 子目录。

例如：

```text
fileStorePath = D:\ClipShareData
```

实际使用时会包含：

```text
D:\ClipShareData\files
D:\ClipShareData\Screenshots
```

在 ClipShare 的启动工作目录下创建 `custom_path.json` 文件。

示例：

```json
{
  "fileStorePath": "D:/ClipShareData",
  "databasePath": "D:/ClipShareData/db"
}
```

也可以只配置其中一项：

```json
{
  "fileStorePath": "D:/ClipShareData"
}
```

或者：

```json
{
  "databasePath": "D:/ClipShareData/db"
}
```

## 路径写法

Windows 路径推荐使用 `/`：

```json
{
  "fileStorePath": "D:/ClipShareData"
}
```

如果使用 `\`，需要在 JSON 中转义：

```json
{
  "fileStorePath": "D:\\ClipShareData"
}
```

Linux / macOS 示例：

```json
{
  "fileStorePath": "/home/user/ClipShareData",
  "databasePath": "/home/user/ClipShareData/db"
}
```

## 关于启动工作目录

`custom_path.json` 会从 ClipShare 的启动工作目录读取。

如果你直接在程序目录中双击启动，通常可以把 `custom_path.json` 放在程序目录下。

如果你通过快捷方式、脚本或其他启动器启动，请确认启动工作目录正确，否则可能无法读取到该文件。

## 优先级

ClipShare 启动时按以下顺序读取路径配置：

1. 读取 `custom_path.json`
2. 读取环境变量
3. 如果环境变量存在，则覆盖 `custom_path.json` 中的同名配置
4. 如果外部配置不存在或目录创建失败，则使用程序默认路径

## 注意事项

- 修改路径配置后，需要重启 ClipShare 才会生效。
- `fileStorePath` 是文件存储根目录，实际文件会保存在其下的 `files` 子目录。
- 环境变量优先级高于 `custom_path.json`。
- `custom_path.json` 必须是合法 JSON，路径字符串中的反斜杠需要转义。
- 更换数据库目录不会自动迁移旧数据库文件，如需保留原数据，请手动备份还原旧数据。
