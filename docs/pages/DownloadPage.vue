<script>

import {Android, MicrosoftWindows,DotsHorizontal,AppleIos,Apple,Linux} from "mdue";
export default {
  name: "DownloadPage",
  data:()=>({
    logs:[],
    urls:{}
  }),
  components:{
    MicrosoftWindows,Android,DotsHorizontal,AppleIos,Apple,Linux
  },
  created() {
    const filePrefix = process.env.NODE_ENV==='production'?'':'test-'
    fetch(`${filePrefix}version-info.json?t=${new Date().getTime()}`).then(async res => {
      const json = await res.json()
      this.logs = json.logs
      this.urls = json.urls
      console.log(json)
    })
  }
}
</script>

<template>
  <div class="p-6">
    <div class="text-6xl font-bold text-center text-[transparent] hero-text">
      ClipShare
    </div>
    <div class="text-2xl my-6 text-center tracking-[3px]">
      跨平台剪贴板历史记录与同步
    </div>
    <div class="max-w-[400px] mx-auto" v-show="logs.length">
      <div class="flex" v-for="item in logs">
        <div class="flex-1">{{item['desc']}}</div>
        <div>{{item['date']}}</div>
      </div>
      <div class="mt-6 cursor-pointer hover:text-[var(--vp-button-alt-bg)] transition-all duration-200 ease-linear">
        <a href="/history_version.html" target="_blank">更多日志 ></a>
      </div>
    </div>
    <div class="flex justify-center gap-12 mt-10 flex-wrap">
      <div class="platform" v-if="urls['Windows']">
        <a :href="urls['Windows']" target="_blank">
          <microsoft-windows class="text-[56px]"/>
        </a>
      </div>
      <div class="platform" v-if="urls['Mac']">
        <a :href="urls['Mac']" target="_blank">
          <apple class="text-[56px]"/>
        </a>
      </div>
      <div class="platform" v-if="urls['Linux']">
        <a :href="urls['Linux']" target="_blank">
          <linux class="text-[56px]"/>
        </a>
      </div>
      <div class="platform" v-if="urls['Android']">
        <a :href="urls['Android']" target="_blank">
          <android class="text-[56px]"/>
        </a>
      </div>
      <div class="platform" v-if="urls['IOS']">
        <a :href="urls['IOS']" target="_blank">
          <apple-ios class="text-[56px]"/>
        </a>
      </div>
      <div class="platform">
        <a href="https://github.com/aa2013/ClipShare/releases" target="_blank">
          <dots-horizontal class="text-[56px]"/>
        </a>
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
    width: 88px;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    transition: all 0.2s linear;
    border-radius: 16px;
    background: var(--vp-button-alt-bg);
  }
  .platform:hover{
    transform: scale(1.1);
    background: var(--vp-button-alt-hover-bg);
  }
</style>