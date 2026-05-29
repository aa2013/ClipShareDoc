<script setup>
import { Android, MicrosoftWindows, AppleIos, Apple, Linux, History, ChevronRight, FileDocumentOutline } from "mdue";
import { computed, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import { UAParser } from "ua-parser-js";

const ZH_TEXT = {
  subtitle: "跨平台剪贴板历史记录与同步",
  updateLogTitle: "更新日志",
  moreLogs: "更多日志",
  downloadNow: "立即下载",
};

const EN_TEXT = {
  subtitle: "Cross-platform clipboard history and sync",
  updateLogTitle: "Release Notes",
  moreLogs: "More logs",
  downloadNow: "Download",
};

const OS_Windows = "Windows";
const OS_Linux = "Linux";
const OS_Android = "Android";
const OS_MacOS = "MacOS";
const OS_IOS = "IOS";
const OS_LIST = [OS_Windows, OS_Android, OS_Linux, OS_MacOS, OS_IOS];

const downloadElements = {
  [OS_Windows]: MicrosoftWindows,
  [OS_MacOS]: Apple,
  [OS_Linux]: Linux,
  [OS_Android]: Android,
  [OS_IOS]: AppleIos,
};

const { isDark, lang } = useData();
const route = useRoute();

const images = ref({});
const showPlatform = ref(OS_Windows);
const logs = ref([]);
const logsLoading = ref(true);
const downloads = ref({});
const isFirstLoad = ref(true);
const logsRefreshing = ref(false);

const isEnglish = computed(() => lang.value?.toLowerCase().startsWith("en"));
const messages = computed(() => (isEnglish.value ? EN_TEXT : ZH_TEXT));
const pageBgClass = computed(() => (isDark.value ? "download-page-bg-dark" : "download-page-bg-light"));
const moreLogsHref = computed(() => (isEnglish.value ? "/en-US/history_version" : "/zh-CN/history_version"));
const versionInfoPath = computed(() => (isEnglish.value ? "/version-info.en.json" : "/version-info.json"));

function switchShowPlatform(platform) {
  showPlatform.value = platform
  const url = new URL(window.location.href)
  url.searchParams.set('platform', platform)
  window.history.replaceState({}, '', url.toString())
}

function detectPlatform() {
  const platformParam = route.query?.platform
  if (platformParam && typeof platformParam === 'string' && Object.keys(downloadElements).includes(platformParam)) {
    showPlatform.value = platformParam
    return
  }

  const parser = new UAParser();
  const result = parser.getResult();
  const lowerUa = (result.ua || "").toLowerCase();
  const uaLowerOsName = (result.os.name || "").toLowerCase();

  for (const osName of OS_LIST) {
    const lowerOsName = osName.toLowerCase();
    if (
      lowerOsName.includes(uaLowerOsName) ||
      uaLowerOsName.includes(lowerOsName) ||
      lowerUa.includes(lowerOsName)
    ) {
      showPlatform.value = osName;
      break;
    }
  }
}

async function loadVersionInfo() {
  if (isFirstLoad.value) {
    logsLoading.value = true;
  } else {
    logsRefreshing.value = true;
  }
  try {
    const response = await fetch(`${versionInfoPath.value}?t=${Date.now()}`);
    const json = await response.json();
    logs.value = (json.logs || [])
      .filter((item) => item.platform === showPlatform.value || item.platform.toLowerCase() === "all")
      .slice(0, 5);
    downloads.value = json.downloads || {};
    images.value = json.images || {};
  } finally {
    setTimeout(() => {
      logsLoading.value = false;
      logsRefreshing.value = false;
    }, 300);
  }
}

async function refreshPage() {
  detectPlatform();
  await loadVersionInfo();
  isFirstLoad.value = false;
}

onMounted(async () => {
  await refreshPage();
});

watch(
  () => route.path,
  async () => {
    await refreshPage();
  }
);

watch(showPlatform, async () => {
  await loadVersionInfo();
});
</script>

<template>
  <div class="p-6">
    <div class="text-4xl font-bold text-center text-[transparent] hero-text">
      ClipShare
    </div>
    <div class="text-xl my-6 text-center tracking-[3px]">
      {{ messages.subtitle }}
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="logsLoading" class="max-w-[400px] mx-auto">
        <div class="skeleton h-[30px] w-[90px]"/>
        <div class="flex flex-col py-[15px]">
          <div class="skeleton skeleton-text" v-for="i in 5"/>
        </div>
        <div class="skeleton skeleton-text w-[80px] h-[25px]"/>
        <div class="flex justify-center gap-2 mt-10 flex-wrap">
          <div v-for="i in 4" class="skeleton h-[40px] w-[130px] rounded-[8px]"/>
        </div>
        <div class="flex justify-center mt-5">
          <div class="skeleton rounded-[999px] h-[48px] w-[240px]"/>
        </div>
      </div>
      <div v-else>
        <div class="max-w-[500px] mx-auto" v-show="logs.length">
          <h2 class="log-title">
            <History class="log-title-icon" />
            {{ messages.updateLogTitle }}
          </h2>
          <div class="log-scroll">
            <div v-if="logsRefreshing" class="flex flex-col py-[10px]">
              <div v-for="i in 5" :key="i" class="mb-[12px]">
                <div class="skeleton skeleton-text mb-[4px]" />
                <div class="skeleton skeleton-text w-[60%]" />
              </div>
            </div>
            <div v-else class="log-list">
              <div class="log-item" v-for="item in logs">
                <div class="log-date">{{ item['date'] }}</div>
                <pre class="log-desc">{{ item['desc'] }}</pre>
              </div>
            </div>
          </div>
          <a :href="moreLogsHref" target="_blank" class="more-logs-link">
            <FileDocumentOutline class="more-logs-icon" />
            {{ messages.moreLogs }}
            <ChevronRight class="more-logs-arrow" />
          </a>
        </div>
        <div class="flex justify-center gap-2 mt-10 flex-wrap">
          <template v-for="(iconComponent, key) in downloadElements" :key="key">
            <button
              v-if="downloads[key]?.url"
              :class="['platform-btn', { active: key === showPlatform }]"
              @click="() => switchShowPlatform(key)"
            >
              <component :is="iconComponent" class="platform-icon" />
              <span class="platform-name">{{ key }}</span>
            </button>
          </template>
        </div>
        <div class="download-wrap">
          <a class="download-btn" :href="downloads[showPlatform]?.url" target="_blank">
            {{ messages.downloadNow }}（{{ showPlatform }}）{{
              downloads[showPlatform]?.version
            }}{{ showPlatform === 'Linux' ? ' .deb' : '' }}
          </a>
        </div>
      </div>
    </transition>
    <div class="stack-container" v-if="false">
      <div v-for="platform in Object.keys(images)" class="stack-item">
        <transition name="fade">
          <div class="flex justify-center gap-8 mt-10 flex-wrap relative" v-if="platform===showPlatform"
               :key="platform">
            <img v-for="item in images[platform]"
                 :src="item.url" :alt="item.name" :width="item.width??300"
                 class="rounded-[20px] cursor-pointer hover:scale-[1.05] duration-200"
                 :data-fancybox="`${showPlatform}-img`" loading="eager"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-page-bg-dark {
  background: linear-gradient(125deg, #1b1b1f, #252b4d, #1b1b1f);
}

.download-page-bg-light {
  background: linear-gradient(125deg, #e6f0ff, #fdcbf1 10%, #c2e9fb, #a8edea);
}

.hero-text {
  background: var(--vp-home-hero-name-background);
  -webkit-text-fill-color: var(--vp-home-hero-name-background);
  background-clip: text;
}

.download-wrap {
  display: flex;
  justify-content: center;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 32px;
  margin-top: 20px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  background: var(--vp-c-brand-3);
  transition: all 0.2s;
  border-radius: 999px;
  text-decoration: none;
}

.download-btn:hover {
  transform: scale(1.03);
  background: var(--vp-c-brand-2);
  text-decoration: none;
  color: #fff;
}

.platform-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 0;
  width: 130px;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 14px;
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

.log-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--vp-c-divider);
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.log-title-icon {
  width: 20px;
  height: 20px;
  color: var(--vp-c-brand-3);
}

.log-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--vp-c-brand-3);
  border-radius: 2px;
}

.log-scroll {
  max-height: 220px;
  overflow-y: auto;
  mask-image: linear-gradient(to bottom, #000 calc(100% - 30px), transparent);
  -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 30px), transparent);
}

.log-list {
  padding-right: 4px;
}

.log-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.log-item:first-child {
  padding-top: 0;
}

.log-date {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  margin-top: 1px;
}

.log-desc {
  flex: 1;
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
}

.more-logs-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.more-logs-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: none;
}

.more-logs-icon {
  width: 17px;
  height: 17px;
}

.more-logs-arrow {
  width: 16px;
  height: 16px;
}

.stack-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.stack-item {
  grid-column: 1 / 2; /* 所有子元素放在同一列 */
  grid-row: 1 / 2; /* 所有子元素放在同一行 */
}
</style>

