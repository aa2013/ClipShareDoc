import {defineConfig} from 'vitepress'
import mdItCustomAttrs from "markdown-it-custom-attrs";
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ClipShare",
    description: "跨平台剪贴板历史记录与同步工具",
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ["link", {rel: "stylesheet",href: "/css/fancybox.css",},],
        ["script", {src: "/js/fancybox.umd.js",},],
        ["script", {},`
                window._hmt = window._hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?cf455f59f0bd661daf0e167091205d00";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
        `],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/images/icons/logo.png',
        darkModeSwitchLabel: '主题切换',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        returnToTopLabel: "回到顶部",
        externalLinkIcon: true,
        nav: [
            {text: '主页', link: '/'},
            {text: '历史版本', link: '/history_version'},
            {text: '使用说明', link: '/usages/android'}
        ],
        sidebar: {
            '/usage': [
                {
                    text: '使用说明',
                    items: [
                        {text: '1. Android', link: '/usages/android.md'},
                        {text: '2. Shizuku 授权', link: '/usages/shizuku.md'},
                        {text: '3. 中转模式', link: '/usages/forward.md'},
                        {text: '4. Others', link: '/usages/others.md'},
                    ]
                }
            ]
        },
        outline: {label: "页面导航", level: 'deep'},
        lastUpdated: {text: "上次更新时间",},
        socialLinks: [
            {icon: 'github', link: 'https://github.com/aa2013/ClipShare'}
        ],

        footer: {
            copyright: 'Copyright © 2024 ClipShare. All Rights Reserved.'
        }
    },
    markdown:{
        config: (md) => {
            // use more markdown-it plugins!
            md.use(mdItCustomAttrs, "image", {
                "data-fancybox": "gallery",
            });
        },
    },

})
