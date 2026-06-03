# Custom Path Configuration Guide

ClipShare supports specifying file storage directories and database directories through external configuration.

::: tip Tips
Available with ClipShare 1.5.0+version
:::

Currently, two methods are supported:

- `custom_path.json` configuration file
- Environment variables

Environment variables have higher priority than `custom_path.json`. If the same path is configured using both methods, the value from the environment variable will be used.

## Configurable Items

| Purpose | JSON File Method | Environment Variable | Description |
|---------|-----------------|----------------------|-------------|
| File storage root directory | `fileStorePath` | `CLIPSHARE_FILE_STORE_PATH` | Used to save synchronized files, screenshots, and other file data |
| Database directory | `databasePath` | `CLIPSHARE_DATABASE_PATH` | Used to save ClipShare database files |

Note: `fileStorePath` configures the file storage root directory, not the final `files` subdirectory.

For example:

```text
fileStorePath = D:\ClipShareData
```

The actual usage will include:

```text
D:\ClipShareData\files
D:\ClipShareData\Screenshots
```

Create the `custom_path.json` file in ClipShare's startup working directory.

Example:

```json
{
  "fileStorePath": "D:/ClipShareData",
  "databasePath": "D:/ClipShareData/db"
}
```

You can also configure only one item:

```json
{
  "fileStorePath": "D:/ClipShareData"
}
```

Or:

```json
{
  "databasePath": "D:/ClipShareData/db"
}
```

## Path Syntax

For Windows paths, it is recommended to use `/`:

```json
{
  "fileStorePath": "D:/ClipShareData"
}
```

If you use `\`, it needs to be escaped in JSON:

```json
{
  "fileStorePath": "D:\\ClipShareData"
}
```

Linux / macOS example:

```json
{
  "fileStorePath": "/home/user/ClipShareData",
  "databasePath": "/home/user/ClipShareData/db"
}
```

## About the Startup Working Directory

`custom_path.json` is read from ClipShare's startup working directory.

If you double-click to start ClipShare directly from the program directory, you can usually place `custom_path.json` in the program directory.

If you start ClipShare via a shortcut, script, or other launcher, please ensure the startup working directory is correct; otherwise, the file may not be read.

## Priority

ClipShare reads path configurations in the following order when starting:

1. Read `custom_path.json`
2. Read environment variables
3. If an environment variable exists, it overrides the same configuration in `custom_path.json`
4. If external configuration does not exist or directory creation fails, the program's default path is used

## Important Notes

- After modifying the path configuration, you need to restart ClipShare for the changes to take effect.
- `fileStorePath` is the file storage root directory; actual files will be saved in the `files` subdirectory under it.
- Environment variables have higher priority than `custom_path.json`.
- `custom_path.json` must be valid JSON; backslashes in path strings need to be escaped.
- Changing the database directory will not automatically migrate old database files. To retain original data, please manually back up and restore the old data.