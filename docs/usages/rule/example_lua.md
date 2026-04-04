```lua
-- 读取原始内容
local content = params.content or ""

-- 先判断内容中是否包含“验证码”关键字（使用 regex.match）
local keywordMatches = regex.match(content, "验证码.*", true, false, false)
local hasCodeKeyword = #keywordMatches > 0

-- 只有命中“验证码”关键字时，才提取第一组 4 到 6 位数字
local code = nil
if hasCodeKeyword then
-- 直接正则匹配 4 到 6 位数字，取第一个结果
local codeMatches = regex.match(content, "\\d{4,6}", true, false, false)
code = codeMatches[1]
end

-- 复制一份标签列表，避免直接依赖 nil
local tags = params.tags or {}

-- 只有在命中关键字且成功提取到验证码时，才加标签
if hasCodeKeyword and code then
table.insert(tags, "验证码")
end

-- 返回规则处理结果
return {
-- 通知标题通常直接沿用原值
title = params.title,

-- 原始内容不变
content = content,

-- 将提取到的验证码作为 extractedContent 返回
extractedContent = code,

-- 返回新的标签列表
tags = tags,

-- 不阻止同步
isSyncDisabled = params.isSyncDisabled or false,

-- 不丢弃
isDropped = false,

-- 不终止后续规则
isFinalRule = false,
}
```