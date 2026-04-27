// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'
import './style.css'
import './tailwind.postcss'
declare const _hmt: any;
export default {
  extends: DefaultTheme,
  Layout: Home,
  enhanceApp({ app, router, siteData }) {
    router.onBeforeRouteChange = (to) => {
      if (typeof _hmt !== 'undefined') {
        _hmt.push(['_trackPageview', to]);
      }
    };
  },
} satisfies Theme
