# Data Broadcast

::: tip Tip
This document can be ignored on non-Android systems.
:::

On Android, a broadcast can be sent after new data is added or synced. Other apps can receive this broadcast and do additional processing, such as with Tasker.

Enable the `Send broadcast when new data is added` option in the app settings under `Clipboard`.

## Broadcast Action

```
top.coclyun.clipshare.ACTION_ON_HISTORY_CHANGED
```

## Broadcast Parameters

| Parameter | Description | Notes |
|---|---|---|
| `type` | Content type | Valid values: `text`, `image`, `file`, `sms`, `notification` |
| `content` | Content | For images and files this is the local path; for notifications this is JSON data |
| `from_dev_id` | Source device ID | The unique identifier of the sending device |
| `from_dev_name` | Source device name | The name of the sending device |

In Tasker, you can reference these parameters with the `%` prefix, for example: `%type`, `%content`.

