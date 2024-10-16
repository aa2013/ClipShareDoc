<script>

import {Android, MicrosoftWindows,DotsHorizontal,AppleIos,Apple,Linux} from "mdue";
export default {
  name: "DownloadPage",
  data:()=>({
    logs:[],
    downloads:{},
    downloadElements: {
      "Windows": MicrosoftWindows,
      "Mac": Apple,
      "Linux": Linux,
      "Android":Android,
      "IOS": AppleIos,
    }
  }),
  components: {
    MicrosoftWindows,Android,DotsHorizontal,AppleIos,Apple,Linux
  },
  created() {
    const filePrefix = process.env.NODE_ENV==='production'?'':'test-'
    fetch(`${filePrefix}version-info.json?t=${new Date().getTime()}`).then(async res => {
      const json = await res.json()
      this.logs = json.logs
      this.downloads = json.downloads
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
        <div class="flex-1">{{item['desc']}}</div>
        <div>{{item['date']}}</div>
      </div>
      <div class="mt-6 cursor-pointer hover:text-[var(--vp-button-alt-bg)] transition-all duration-200 ease-linear">
        <a href="/history_version.html" target="_blank">更多日志 ></a>
      </div>
    </div>
    <div class="flex justify-center gap-8 mt-10 flex-wrap">
      <template v-for="(component,key) in downloadElements">
        <div class="platform" v-if="downloads[key]?.url">
          <a :href="downloads[key]?.url" target="_blank">
            <component :is="component" class="text-[3rem]" />
          </a>
          <div class="version">{{downloads[key]?.version}}</div>
        </div>
      </template>
      <div class="platform">
        <a href="https://github.com/aa2013/ClipShare/releases" target="_blank">
          <dots-horizontal class="text-[3rem]"/>
        </a>
        <div class="version">more</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hero-text{
    background: var(--vp-home-hero-name-background);
    -webkit-text-fill-color:var(--vp-home-hero-name-background);
    background-clip: text;
  }
  .platform{
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
  .version{
    margin: 0;
    padding: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.2s linear;
  }
  .platform:hover{
    transform: scale(1.1);
    background: var(--vp-button-alt-hover-bg);
  }
  .platform:hover .version{
    height: 1.5rem;
    overflow: hidden;
  }
</style>