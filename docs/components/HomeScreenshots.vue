<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const ZH_LABELS: Record<string, string> = {
  Windows: '桌面端',
  Android: '移动端',
}

const EN_LABELS: Record<string, string> = {
  Windows: 'Desktop',
  Android: 'Mobile',
}

const { frontmatter, lang } = useData()

const versionInfoPath = computed(() =>
  isEnglish.value ? '/version-info.en.json' : '/version-info.json'
)
const isEnglish = computed(() => lang.value?.toLowerCase().startsWith('en'))
const labels = computed(() => (isEnglish.value ? EN_LABELS : ZH_LABELS))
const isHomePage = computed(() => frontmatter.value.layout === 'home')

const screenshots = ref<{ platform: string; items: { name: string; url: string; width?: number }[] }[]>([])

async function loadScreenshots() {
  try {
    const response = await fetch(`${versionInfoPath.value}?t=${Date.now()}`)
    if (!response.ok) return
    const json = await response.json()
    const images = json.images || {}
    const targets = ['Windows', 'Android']
    screenshots.value = targets
      .filter((p) => images[p]?.length)
      .map((p) => ({ platform: p, items: images[p] }))
  } catch {
    screenshots.value = []
  }
}

onMounted(async () => {
  if (isHomePage.value) {
    await loadScreenshots()
  }
})
</script>

<template>
  <div v-if="isHomePage && screenshots.length" class="screenshots-section">
    <div v-for="group in screenshots" :key="group.platform" class="platform-group">
      <h3 class="platform-label">{{ labels[group.platform] || group.platform }}</h3>
      <div class="screenshots-grid">
        <div v-for="(item, index) in group.items" :key="index" class="screenshot-card">
          <img
            :src="item.url"
            :alt="item.name"
            :width="item.width ?? 300"
            class="screenshot-img"
            :data-fancybox="`home-${group.platform}`"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screenshots-section {
  padding: 0 24px;
  margin: 48px 0 64px;
}

@media (min-width: 640px) {
  .screenshots-section {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .screenshots-section {
    padding: 0 64px;
  }
}

.platform-group {
  max-width: 1152px;
  margin: 0 auto 28px;
}

.platform-label {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  padding-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid var(--vp-c-divider);
  position: relative;
}

.platform-label::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--vp-c-brand-3);
  border-radius: 2px;
}

.platform-label::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--vp-c-brand-3);
}

.screenshots-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: space-around;
}

.screenshot-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  line-height: 0;
}

.screenshot-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.screenshot-img {
  display: block;
  cursor: pointer;
  max-height: 280px;
  width: auto;
}
</style>
