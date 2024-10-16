---
layout: page
---
<script setup>
import { defineClientComponent } from 'vitepress';

const DownloadPage = defineClientComponent(() => {
  return import('./pages/DownloadPage.vue')
})
</script>

<DownloadPage/>