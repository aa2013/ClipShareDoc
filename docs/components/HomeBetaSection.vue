<script setup lang="ts">
import { Android, MicrosoftWindows, Apple, Linux, Github, OpenInNew } from 'mdue'
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { UAParser } from 'ua-parser-js'

const ZH_TEXT = {
  betaLabel: '实验性版本',
  warning: '建议普通用户下载上方正式版本以获得稳定体验。如果你愿意尝鲜并反馈问题，欢迎体验此实验性版本。',
  download: '下载',
  expand: '展开',
  collapse: '收起',
}

const EN_TEXT = {
  betaLabel: 'Beta',
  warning: 'We recommend downloading the stable release above for a reliable experience. If you are an early adopter willing to test and report issues, feel free to try this experimental build.',
  download: 'Download',
  expand: 'Show',
  collapse: 'Collapse',
}

const OS_LIST = ['Windows', 'Android', 'Linux', 'MacOS'] as const
type OS = (typeof OS_LIST)[number]

const downloadIcons: Record<OS, any> = {
  Windows: MicrosoftWindows,
  MacOS: Apple,
  Linux: Linux,
  Android: Android,
}

const { frontmatter, lang } = useData()

const enabled = ref(false)
const version = ref('')
const date = ref('')
const description = ref('')
const downloads = ref<Record<string, { url: string; version: string }>>({})
const selectedPlatform = ref<OS>('Windows')
const loaded = ref(false)
const githubUrl = ref('')
const showDownload = ref(false)

const isEnglish = computed(() => lang.value?.toLowerCase().startsWith('en'))
const messages = computed(() => (isEnglish.value ? EN_TEXT : ZH_TEXT))
const betaInfoPath = computed(() =>
  isEnglish.value ? '/beta-info.en.json' : '/beta-info.json'
)
const isHomePage = computed(() => frontmatter.value.layout === 'home')

const availablePlatforms = computed<OS[]>(() => {
  return OS_LIST.filter((os) => downloads.value[os]?.url)
})

function detectPlatform() {
  const parser = new UAParser()
  const result = parser.getResult()
  const lowerUa = (result.ua || '').toLowerCase()
  const uaLowerOsName = (result.os.name || '').toLowerCase()

  for (const osName of OS_LIST) {
    const lowerOsName = osName.toLowerCase()
    if (
      lowerOsName.includes(uaLowerOsName) ||
      uaLowerOsName.includes(lowerOsName) ||
      lowerUa.includes(lowerOsName)
    ) {
      if (downloads.value[osName]?.url) {
        selectedPlatform.value = osName
        return
      }
    }
  }

  const first = availablePlatforms.value[0]
  if (first) selectedPlatform.value = first
}

async function loadBetaInfo() {
  try {
    const response = await fetch(`${betaInfoPath.value}?t=${Date.now()}`)
    if (!response.ok) throw new Error('not found')
    const json = await response.json()
    if (json.enabled !== true) {
      enabled.value = false
      return
    }
    enabled.value = true
    version.value = json.version || ''
    date.value = json.date || ''
    description.value = json.description || ''
    downloads.value = json.downloads || {}
    githubUrl.value = json.githubUrl || ''
    detectPlatform()
  } catch {
    enabled.value = false
  } finally {
    loaded.value = true
  }
}

onMounted(async () => {
  if (isHomePage.value) {
    await loadBetaInfo()
  }
})
</script>

<template>
  <div
    v-if="isHomePage && loaded && enabled"
    class="beta-section"
  >
    <div class="beta-card">
      <div class="beta-header">
        <span class="beta-badge">{{ messages.betaLabel }}</span>
        <span class="beta-version">v{{ version }}</span>
        <span v-if="date" class="beta-date">{{ date }}</span>
      </div>

      <p class="beta-warning">{{ messages.warning }}</p>

      <p class="beta-desc">{{ description }}</p>

      <button class="beta-toggle" @click="showDownload = !showDownload">
        <span>{{ showDownload ? messages.collapse : messages.expand }}</span>
        <span class="toggle-arrow" :class="{ open: showDownload }">▾</span>
      </button>

      <div v-show="showDownload" class="beta-download-area">
        <div class="beta-platforms">
          <button
            v-for="platform in availablePlatforms"
            :key="platform"
            :class="['platform-btn', { active: platform === selectedPlatform }]"
            @click="selectedPlatform = platform"
          >
            <component :is="downloadIcons[platform]" class="platform-icon" />
            <span class="platform-name">{{ platform }}</span>
          </button>
        </div>

        <div class="beta-action-row">
          <a
            class="beta-download-btn"
            :href="downloads[selectedPlatform]?.url"
            target="_blank"
          >
            {{ messages.download }}（{{ selectedPlatform }}）{{
              downloads[selectedPlatform]?.version ? ` ${downloads[selectedPlatform]?.version}` : ''
            }}
          </a>
          <a
            v-if="githubUrl"
            class="beta-gh-link"
            :href="githubUrl"
            target="_blank"
          >
            <Github class="gh-icon" />
            GitHub Release
            <OpenInNew class="gh-ext-icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.beta-section {
  padding: 0 24px;
  margin-top: 24px;
  margin-bottom: 40px;
}

@media (min-width: 640px) {
  .beta-section {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .beta-section {
    padding: 0 64px;
  }
}

.beta-card {
  max-width: 1152px;
  margin: 0 auto;
  width: 100%;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 12px;
  padding: 24px 28px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s;
}

.beta-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.beta-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  padding: 4px 10px;
  border-radius: 999px;
  color: #fff;
  background: var(--vp-c-brand-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.beta-version {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-3);
  padding: 2px 8px;
  border-radius: 999px;
}

.beta-date {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-left: 4px;
}

.beta-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 0 16px 0;
}

.beta-warning {
  margin: 0 0 14px 0;
  font-size: 13px;
  color: var(--vp-c-warning-2);
  line-height: 1.5;
}

.beta-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 0 16px 0;
}

.beta-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.beta-toggle:hover {
  background: var(--vp-c-brand-2);
  color: #fff;
}

.toggle-arrow {
  font-size: 12px;
  transition: transform 0.2s;
}

.toggle-arrow.open {
  transform: rotate(180deg);
}

.beta-download-area {
  margin-top: 16px;
}

.beta-platforms {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.platform-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.platform-btn:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}

.platform-btn.active {
  border-color: var(--vp-c-brand-3);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.platform-icon {
  width: 20px;
  height: 20px;
}

.platform-name {
  font-weight: 500;
}

.beta-action-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.beta-download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 24px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: var(--vp-c-brand-3);
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.beta-download-btn:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.03);
  text-decoration: none;
  color: #fff;
}

.beta-gh-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 24px;
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: 1px solid var(--vp-c-brand-3);
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.beta-gh-link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
  text-decoration: none;
}

.gh-icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
}

.gh-ext-icon {
  width: 14px;
  height: 14px;
  margin-left: 4px;
}

.beta-warning {
  margin: 0 0 14px 0;
  font-size: 13px;
  color: var(--vp-c-warning-2);
  line-height: 1.5;
}
</style>
