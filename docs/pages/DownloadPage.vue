<script>

import {Android, MicrosoftWindows, DotsHorizontal, AppleIos, Apple, Linux} from "mdue";
import {zIndex} from "@tailwindcss/postcss7-compat/lib/plugins";
import {useData} from 'vitepress'

export default {
  name: "DownloadPage",
  methods: {
    zIndex() {
      return zIndex
    },
    switchShowPlatform(platform) {
      const url = new URL(window.location.href);
      url.searchParams.set('platform', platform);
      window.location.href = url.toString();
    },
  },
  data: () => {
    const params = useData();
    return {
      params,
      images: {},
      showPlatform: "Windows",
      logs: [],
      downloads: {},
      platforms: [],
      downloadElements: {
        "Windows": MicrosoftWindows,
        "Mac": Apple,
        "Linux": Linux,
        "Android": Android,
        "IOS": AppleIos,
      }
    }
  },
  components: {
    MicrosoftWindows, Android, DotsHorizontal, AppleIos, Apple, Linux
  },
  created() {
    const queryParams = new URLSearchParams(window.location.search);
    const platformParam = queryParams.get('platform');
    if (Object.keys(this.downloadElements).includes(platformParam)) {
      this.showPlatform = platformParam
    }
    const filePrefix = process.env.NODE_ENV === 'production' ? '' : 'test-'
    fetch(`${filePrefix}version-info.json?t=${new Date().getTime()}`).then(async res => {
      const json = await res.json()
      this.logs = json.logs.filter(v => v.platform === this.showPlatform || v.platform.toLowerCase() === 'all')
      this.downloads = json.downloads
      this.images = json.images
    })
  },
  watch: {
    "$route"(newV, oldV) {
      console.log(newV)
    }
  }
}
</script>

<template>
  <div class="p-6">
    <div class="text-4xl font-bold text-center text-[transparent] hero-text">
      ClipShare
    </div>
    <div class="text-xl my-6 text-center tracking-[3px]">
      跨平台剪贴板历史记录与同步
    </div>
    <div class="max-w-[400px] mx-auto" v-show="logs.length">
      <div class="font-bold text-xl my-4">更新日志</div>
      <div class="flex" v-for="item in logs">
        <div class="flex-1">{{ item['desc'] }}</div>
        <div>{{ item['date'] }}</div>
      </div>
      <div class="mt-6 cursor-pointer hover:text-[var(--vp-button-alt-bg)] transition-all duration-200 ease-linear">
        <a href="/history_version.html" target="_blank">更多日志 ></a>
      </div>
    </div>
    <div class="flex justify-center gap-8 mt-10 flex-wrap">
      <template v-for="(iconComponent,key) in downloadElements">
        <div class="platform" v-if="downloads[key]?.url" @click="()=>switchShowPlatform(key)"
             :style="key===showPlatform?'background: var(--vp-button-brand-bg)':''">
          <div>
            <component :is="iconComponent" class="text-[3rem]"/>
          </div>
          <div :class="key!==showPlatform?'version':''">{{ downloads[key]?.version }}</div>
        </div>
      </template>
      <div class="platform">
        <a href="https://github.com/aa2013/ClipShare/releases" target="_blank">
          <dots-horizontal class="text-[3rem]"/>
        </a>
        <div class="version">more</div>
      </div>
    </div>
    <a class="download-btn block" :href="downloads[showPlatform]?.url" target="_blank">
      立即下载（{{ showPlatform }}）{{ downloads[showPlatform]?.version }}
    </a>
    <div class="stack-container">
      <div v-for="platform in Object.keys(images)" class="stack-item">
        <transition name="fade">
          <div class="flex justify-center gap-8 mt-10 flex-wrap relative" v-if="platform===showPlatform"
               :key="platform">
            <img v-for="item in images[platform]"
                 :src="item.url" :alt="item.name" :width="item.width??300"
                 class="rounded-[8px] cursor-pointer hover:scale-[1.1] duration-200"
                 :data-fancybox="`${showPlatform}-img`" loading="eager"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>