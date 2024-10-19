<script>

import {Android, MicrosoftWindows, DotsHorizontal, AppleIos, Apple, Linux} from "mdue";
import {zIndex} from "@tailwindcss/postcss7-compat/lib/plugins";

export default {
  name: "DownloadPage",
  methods: {
    zIndex() {
      return zIndex
    }
  },
  data: () => ({
    images: {},
    showImagePlatform: "Windows",
    logs: [],
    downloads: {},
    platforms:[],
    downloadElements: {
      "Windows": MicrosoftWindows,
      "Mac": Apple,
      "Linux": Linux,
      "Android": Android,
      "IOS": AppleIos,
    }
  }),
  components: {
    MicrosoftWindows, Android, DotsHorizontal, AppleIos, Apple, Linux
  },
  created() {
    const filePrefix = process.env.NODE_ENV === 'production' ? '' : 'test-'
    fetch(`${filePrefix}version-info.json?t=${new Date().getTime()}`).then(async res => {
      const json = await res.json()
      this.logs = json.logs
      this.downloads = json.downloads
      this.images = json.images
    })
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
      <template v-for="(component,key) in downloadElements">
        <div class="platform" v-if="downloads[key]?.url" @mouseover="()=>showImagePlatform=key">
          <a :href="downloads[key]?.url" target="_blank">
            <component :is="component" class="text-[3rem]"/>
          </a>
          <div class="version">{{ downloads[key]?.version }}</div>
        </div>
      </template>
      <div class="platform">
        <a href="https://github.com/aa2013/ClipShare/releases" target="_blank">
          <dots-horizontal class="text-[3rem]"/>
        </a>
        <div class="version">more</div>
      </div>
    </div>
    <div class="stack-container">
      <div v-for="platform in Object.keys(images)" class="stack-item">
        <transition name="fade">
          <div class="flex justify-center gap-8 mt-10 flex-wrap relative" v-show="platform===showImagePlatform"
               :style="{zIndex:platform===showImagePlatform?1:-1}"
               :key="platform">
            <img v-for="item in images[platform]"
                 :src="item.url" :alt="item.name" :width="item.width??300"
                 class="rounded-[8px] cursor-pointer hover:scale-[1.1] duration-200"
                 :data-fancybox="`${showImagePlatform}-img`" loading="eager"/>
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