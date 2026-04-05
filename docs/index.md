---
layout: home
---

<script setup>
import { onMounted, ref } from "vue";

const message = ref("Redirecting...");

onMounted(() => {
  if (typeof window !== "undefined") {
    const lang = navigator.language.toLowerCase();

    if (lang.startsWith("zh")) {
      message.value = "正在跳转到中文文档...";
      window.location.replace("/zh-CN/");
    } else {
      message.value = "Redirecting to English documentation...";
      window.location.replace("/en-US/");
    }
  }
});
</script>

{{ message }}