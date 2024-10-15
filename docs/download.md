---
layout: page
---
<script setup>
// import DownloadPage from './pages/DownloadPage.vue'
import { defineClientComponent } from 'vitepress'

const ClientComp = defineClientComponent(() => {
  return import('./pages/DownloadPage.vue')
})
</script>

<ClientComp/>