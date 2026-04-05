```lua
-- Read the original content
local content = params.content or ""

-- First check whether the content contains the "verification code" keyword (using regex.match)
local keywordMatches = regex.match(content, "verification code.*", false, false, false)
local hasCodeKeyword = #keywordMatches > 0

-- Only when the keyword is matched, extract the first group of 4 to 6 consecutive digits
local code = nil
if hasCodeKeyword then
  -- Directly match 4 to 6 digits and take the first result
  local codeMatches = regex.match(content, "\\d{4,6}", true, false, false)
  code = codeMatches[1]
end

-- Copy the tag list to avoid directly depending on nil
local tags = params.tags or {}

-- Add the tag only when the keyword is matched and the code is extracted successfully
if hasCodeKeyword and code then
  table.insert(tags, "Verification Code")
end

-- Return the processed rule result
return {
  -- Notification titles usually keep the original value
  title = params.title,

  -- Keep the original content unchanged
  content = content,

  -- Return the extracted verification code as extractedContent
  extractedContent = code,

  -- Return the updated tag list
  tags = tags,

  -- Do not block sync
  isSyncDisabled = params.isSyncDisabled or false,

  -- Do not drop the content
  isDropped = false,

  -- Do not stop subsequent rules
  isFinalRule = false,
}
```

