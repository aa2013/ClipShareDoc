# ClipShare Rule Lua Script Guide

:::tip Tip
This document applies to ClipShare version 1.5.0 and later.
:::

This document explains how to write Lua scripts for ClipShare rule management, what can and cannot be used, and the input/output format of scripts.

This script environment is not a full Lua 5.4 runtime. It runs inside a sandboxed environment with restrictions. Please follow this document when writing scripts and do not assume that every Lua standard library is available.

## 1. Use Cases

When regular-expression rules are not enough and more complex logic is required, you can use Lua script rules.

Typical scenarios:

- Multi-condition checks based on content
- Extracting content and then processing it again
- Dynamically generating tags
- Deciding whether to block sync based on content type
- Combining notification title, source, tags, and other context for judgments

## 2. Execution Model

Each script rule executes a Lua function when triggered. The function receives one parameter: `params`.

You need to return a Lua table as the processing result.

If the script execution fails, the rule will not get a valid result.

> Important: `params` is implicitly available

Although the runtime always passes a fixed `params` argument internally, `params` is already directly available when you write the script. You do not need to declare the function entry yourself.

That means you should write the script logic directly, for example:

```lua
local content = params.content or ""

return {
  title = params.title,
  content = content,
  extractedContent = params.extractedContent,
  tags = params.tags or {},
  isSyncDisabled = params.isSyncDisabled or false,
  isDropped = false,
  isFinalRule = false,
}
```

Do not write it like this:

```lua
function main(params)
  ...
end
```

And do not write it like this either:

```lua
return function(params)
  ...
end
```

You only need to write the script body directly and return the result table at the end.

## 3. Input Parameter `params`

The script always receives one fixed parameter:

```lua
params
```

Available fields:

| Field | Type | Description |
|---|---|---|
| `params.type` | `string` | Content type, possibly `text`, `image`, `sms`, or `notification` |
| `params.source` | `string?` | Content source, possibly a local path or an app package name |
| `params.title` | `string?` | Notification title; usually only present for notification content |
| `params.content` | `string` | Original content |
| `params.extractedContent` | `string?` | Previously extracted content |
| `params.tags` | `table?` | Existing tag list |
| `params.isSyncDisabled` | `bool?` | Whether sync has already been marked as blocked |

> Important: `?` after a type means nullable

If a field type ends with `?`, it means the field may be `nil`, in other words, it may have no value.

It is recommended to handle nullability before using such fields, otherwise the script may fail.

Two common ways to handle it:

1. Explicitly check whether it is nil

```lua
if params.title ~= nil then
  print(params.title)
end
```

2. Use `or` to provide a default value

```lua
local title = params.title or ""
local tags = params.tags or {}
local isSyncDisabled = params.isSyncDisabled or false
```

If you are not sure whether a field may be nil, prefer giving it a default value with `or`.

## 4. Return Result

The script must return a table. It is recommended to always return a complete structure:

```lua
return {
  title = params.title,
  content = params.content,
  extractedContent = params.extractedContent,
  tags = params.tags or {},
  isSyncDisabled = params.isSyncDisabled or false,
  isDropped = false,
  isFinalRule = false,
}
```

Field descriptions:

| Field | Type | Description |
|---|---|---|
| `title` | `string?` | Title after processing, mainly used for notification content |
| `content` | `string` | Content after processing |
| `extractedContent` | `string?` | Extracted content after processing |
| `tags` | `table` | Tag list after processing |
| `isSyncDisabled` | `bool` | Whether sync should be blocked |
| `isDropped` | `bool` | Whether this content should be dropped |
| `isFinalRule` | `bool` | Whether to stop subsequent rules |

## 5. ClipShare Global Functions and Objects

The following items are not part of the Lua standard library. They are global functions and objects injected by ClipShare into the Lua sandbox environment while the rule script runs.

You can think of them as helper capabilities specifically provided by ClipShare for rule scripts.

They are mainly used for:

- Reading runtime information provided by ClipShare
- Outputting debug logs
- Sending notifications
- Calling some platform-related capabilities
- Performing common encoding, decoding, and digest calculations

If you want to implement custom rule logic, you will usually use both basic Lua syntax and the global functions/objects listed here.

### 5.1 `log` Debug Logs

Used to output debug logs:

```lua
log.debug("message")
log.info("message")
log.warn("message")
log.error("message")
```

Parameter description:

| Function | Parameters | Purpose |
|---|---|---|
| `log.debug(message)` | `message: string` | Output a debug log |
| `log.info(message)` | `message: string` | Output an info log |
| `log.warn(message)` | `message: string` | Output a warning log |
| `log.error(message)` | `message: string` | Output an error log |

### 5.2 `print` Quick Debug Output

This is a quick debug function, equivalent to outputting a debug log.

Equivalent to:

```lua
log.debug(...)
```

It is suitable for quick debugging.

### 5.3 `json` JSON Encoding and Decoding

Used for JSON encoding and decoding.

```lua
json.encode(value)
json.decode(text)
```

Parameter description:

| Function | Parameters | Return Value | Purpose |
|---|---|---|---|
| `json.encode(value)` | `value: table` | `string` | Encode a Lua table into a JSON string |
| `json.decode(text)` | `text: string` | `table` | Parse a JSON string into a Lua table |

### 5.4 `notify` Send Notification

Used to actively send an app notification from the script.

Send a notification:

```lua
notify(title, content)
```

Parameter description:

| Function | Parameters | Purpose |
|---|---|---|
| `notify(title, content)` | `title: string`, `content: string` | Send an app notification |

### 5.5 `ContentType` Content Type

Represents the type of the current content.

Available enum values:

```lua
ContentType.text
ContentType.image
ContentType.sms
ContentType.notification
```

Value descriptions:

| Value | Description |
|---|---|
| ContentType.text | Text |
| ContentType.image | Image |
| ContentType.sms | SMS |
| ContentType.notification | Notification |

### 5.6 `Platform` Platform Information

Represents the platform where the current script is running.

Platform info:

```lua
Platform.isAndroid
Platform.isIOS
Platform.isWindows
Platform.isMacOS
Platform.isLinux
```

Value descriptions:

| Value | Description |
|---|---|
| Platform.isAndroid | Whether the platform is Android |
| Platform.isIOS | Whether the platform is iOS |
| Platform.isWindows | Whether the platform is Windows |
| Platform.isMacOS | Whether the platform is MacOS |
| Platform.isLinux | Whether the platform is Linux |

### 5.7 `self` Current Device Information

Represents information about the current device itself.

Current device info:

```lua
self.devId
self.devName
```

Value descriptions:

| Value | Description |
|---|---|
| devId | Local device id |
| devName | Local device name |

### 5.8 `app` App Version Information

Represents version information about the current ClipShare app itself.

App version info:

```lua
app.versionName
app.versionNumber
```

Value descriptions:

| Value | Description |
|---|---|
| versionName | ClipShare version name, such as 1.4.3 |
| versionNumber | ClipShare version number, such as 25 |

### 5.9 `android` Android Extension Capabilities

Represents extension capabilities available on the Android platform.

Android-only capabilities:

```lua
android.notifyMediaScan(imagePath)
android.toast(content)
android.sendHistoryChangedBroadcast(type, content, from_dev_id, from_dev_name)
```

Parameter description:

| Function | Parameters | Purpose |
|---|---|---|
| `android.notifyMediaScan(imagePath)` | `imagePath: string` | Notify the Android media library to scan the specified file, usually for images or media files |
| `android.toast(content)` | `content: string` | Show a Toast on Android |
| `android.sendHistoryChangedBroadcast(type, content, from_dev_id, from_dev_name)` | `type: ContentType`, `content: string`, `from_dev_id: string`, `from_dev_name: string` | Send a history-changed broadcast |

### 5.10 `crypto` Digest Calculation

Used to calculate common digest values.

```lua
crypto.calcMD5(content)
crypto.calcSHA1(content)
crypto.calcSHA256(content)
```

Parameter description:

| Function | Parameters | Return Value | Purpose |
|---|---|---|---|
| `crypto.calcMD5(content)` | `content: string` | `string` | Calculate MD5 |
| `crypto.calcSHA1(content)` | `content: string` | `string` | Calculate SHA-1 |
| `crypto.calcSHA256(content)` | `content: string` | `string` | Calculate SHA-256 |

### 5.11 `base64` Base64 Encoding and Decoding

Used for Base64 encoding and decoding.

```lua
base64.encode(content)
base64.decode(content)
```

Parameter description:

| Function | Parameters | Return Value | Purpose |
|---|---|---|---|
| `base64.encode(content)` | `content: string` | `string` | Encode a string to Base64 |
| `base64.decode(content)` | `content: string` | `string` | Decode a Base64 string |

### 5.12 `regex` Regular Expression

> Note: Lua itself provides pattern matching (`string.match/find` with Lua patterns), not the regular expressions people usually mean.
> If you need standard regex support, use the injected `regex` here.

Used for regex matching.

```lua
regex.match(content, pattern, caseSensitive, multiLines, dotAll)
regex.matchGroups(content, pattern, caseSensitive, multiLines, dotAll)
```

Parameters:

| Parameter | Type | Purpose |
|---|---|---|
| `content` | `string` | Original text to be matched |
| `pattern` | `string` | Regular expression pattern |
| `caseSensitive` | `bool` | Whether matching is case-sensitive |
| `multiLines` | `bool` | Whether multi-line mode is enabled (anchors match by line) |
| `dotAll` | `bool` | Whether `.` matches newlines |

Function return values:

| Function | Return Value | Description |
|---|---|---|
| `regex.match(content, pattern, caseSensitive, multiLines, dotAll)` | `table` | Returns a list of all full matches (group 0), indexed from 1. Returns an empty table if no match exists |
| `regex.matchGroups(content, pattern, caseSensitive, multiLines, dotAll)` | `table` | Returns a 2D list of capture groups for all matches (group 1..N only, excluding group 0). Returns an empty table if no match exists |

Return value examples:

```lua
-- regex.match(...)
{ "abc123", "xyz456" }

-- regex.matchGroups(...)
{
  { "abc", "123" },
  { "xyz", "456" }
}
```

## 6. Lua Version and Sandbox Restrictions

The current rule script runtime is based on Lua `5.4.8`.

You can generally assume common basic syntax, control flow, local variables, functions, and most common standard-library features are still available, but this is not a complete, unrestricted Lua environment.

The focus is not "what can be used", but rather "what cannot be used and what is restricted".

### 6.1 Restrictions on `os`

The current `os` library is not complete. Only a safe subset is preserved:

- `os.clock`
- `os.date`
- `os.time`
- `os.difftime`

Apart from these, do not assume that other `os.*` APIs are available.

## 7. Unavailable Functions

Do not use the following functions or related capabilities, and do not let AI generate them:

- `load`
- `loadfile`
- `loadstring`
- `dofile`
- `require`
- `module`
- `package`
- `debug`
- `coroutine`
- `getmetatable`
- `setmetatable`
- `rawget`
- `rawset`
- `rawequal`
- `collectgarbage`
- `io`
- Any file read/write capability
- Any ability to execute system commands

Even if AI provides these, do not copy them directly.

## 8. Writing Recommendations

- Prefer keeping the returned structure complete
- When the logic becomes complex, store intermediate results in local variables first
- Use `log.debug` or `print` to help with debugging
- Try not to modify global variables that are not documented here
- Do not depend on dangerous capabilities that are not explicitly documented here

## 9. Example: Extract Verification Codes from SMS/Text and Add a Tag

Here is a common example: first check whether the content contains the `verification code` keyword. If it does, extract the first group of 4 to 6 consecutive digits and add the tag `Verification Code`.

Note that Lua uses its own pattern matching syntax. The example script below uses the injected `regex` standard regex support instead.

Example content:

> The same extraction can also be done with a regex rule. It is shown here only as a script example.

```text
[Some Service] Your verification code is 123456. It is valid for 5 minutes. Please do not share it with others.
```

<details class="details custom-block">
<summary>Click to expand the example script</summary>

<!-- @include: ./example_lua.md -->

</details>

## 10. Asking AI

The following text can be sent directly to AI to generate Lua scripts suitable for ClipShare rules.

##### ClipShare Rule Lua Script Generation Prompt:

<details class="details custom-block">
<summary>Click to expand and view</summary>

<<< ./prompt.md

</details>

