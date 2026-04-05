<script setup>
import { Android, MicrosoftWindows, AppleIos, Apple, Linux } from "mdue";
import { computed, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import { UAParser } from "ua-parser-js";

const ZH_TEXT = {
  subtitle: "跨平台剪贴板历史记录与同步",
  updateLogTitle: "更新日志",
  moreLogs: "更多日志 >",
  downloadNow: "立即下载",
};

const EN_TEXT = {
  subtitle: "Cross-platform clipboard history and sync",
  updateLogTitle: "Release Notes",
  moreLogs: "More logs >",
  downloadNow: "Download now",
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

const isEnglish = computed(() => lang.value?.toLowerCase().startsWith("en"));
const messages = computed(() => (isEnglish.value ? EN_TEXT : ZH_TEXT));
const pageBgClass = computed(() => (isDark.value ? "download-page-bg-dark" : "download-page-bg-light"));
const moreLogsHref = computed(() => (isEnglish.value ? "/en-US/history_version" : "/zh-CN/history_version"));
const versionInfoPath = computed(() => (isEnglish.value ? "/version-info.en.json" : "/version-info.json"));

function switchShowPlatform(platform) {
  const url = new URL(window.location.href);
  url.searchParams.set("platform", platform);
  window.location.href = url.toString();
}

function detectPlatform() {
  const queryParams = new URLSearchParams(window.location.search);
  const platformParam = queryParams.get("platform");
  if (platformParam && Object.keys(downloadElements).includes(platformParam)) {
    showPlatform.value = platformParam;
    return;
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
  logsLoading.value = true;
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
    }, 300);
  }
}

async function refreshPage() {
  detectPlatform();
  await loadVersionInfo();
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
        <div class="flex justify-center gap-8 mt-10 flex-wrap">
          <div v-for="i in 3" class="skeleton skeleton-image w-[96px] h-[96px]"/>
        </div>
        <div class="skeleton rounded-[1.25rem] h-[50px] w-[290px] my-[20px] mx-[auto]"/>
      </div>
      <div v-else>
        <div class="max-w-[400px] mx-auto" v-show="logs.length">
          <div class="font-bold text-xl my-4">
            {{ messages.updateLogTitle }}
          </div>
          <div class="max-h-[200px] overflow-auto">
            <div class="flex mb-[5px]" v-for="item in logs">
              <pre class="flex-1 whitespace-pre-wrap break-words">{{ item['desc'] }}</pre>
              <div>{{ item['date'] }}</div>
            </div>
          </div>
          <div class="mt-6 cursor-pointer hover:text-[var(--vp-button-alt-bg)] transition-all duration-200 ease-linear">
            <a :href="moreLogsHref" target="_blank">{{ messages.moreLogs }}</a>
          </div>
        </div>
        <div class="flex justify-center gap-8 mt-10 flex-wrap">
          <template v-for="(iconComponent, key) in downloadElements" :key="key">
            <div class="platform" v-if="downloads[key]?.url" @click="()=>switchShowPlatform(key)"
                 :style="key===showPlatform?'background: var(--vp-button-brand-bg)':''">
              <div>
                <component :is="iconComponent" class="text-[3rem]"/>
              </div>
              <div :class="key!==showPlatform?'version':''">{{ downloads[key]?.version }}</div>
            </div>
          </template>
        </div>
        <a class="download-btn block" :href="downloads[showPlatform]?.url" target="_blank">
          {{ messages.downloadNow }}（{{ showPlatform }}）{{
            downloads[showPlatform]?.version
          }}{{ showPlatform === 'Linux' ? ' .deb' : '' }}
        </a>
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

.download-btn {
  width: 290px;
  height: 50px;
  line-height: 50px;
  margin: 20px auto 0;
  cursor: pointer;
  color: white;
  text-align: center;
  font-weight: bold;
  background: var(--vp-button-alt-bg);
  transition: all 0.2s linear;
  border-radius: 1.5rem;
}

.download-btn:hover {
  transform: scale(1.05);
  background: var(--vp-button-alt-hover-bg);
}

.platform {
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s linear;
  border-radius: 1.5rem;
  flex-direction: column;
  background: var(--vp-button-alt-bg);
}

.version {
  margin: 0;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.2s linear;
}

.platform:hover {
  transform: scale(1.1);
  background: var(--vp-button-alt-hover-bg);
}

.platform:hover .version {
  height: 1.5rem;
  overflow: hidden;
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

