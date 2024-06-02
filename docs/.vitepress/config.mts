import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ClipShare",
    description: "一款跨平台剪贴板历史记录与同步工具",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/img/logo.png',
        darkModeSwitchLabel: '主题切换',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        returnToTopLabel: "回到顶部",
        externalLinkIcon: true,
        nav: [
            {text: '主页', link: '/'},
            {text: '历史版本', link: '/history_version'},
            {text: '使用说明', link: '/usage'}
        ],
        sidebar: {
            '/usage': [
                {
                    text: '指南',
                    children: [
                        {text: '文件1', link: '/file1'},
                        {text: '文件2', link: '/file2'},
                    ]
                }
            ]
        },
        outline: {label: "页面导航"},
        lastUpdated: {text: "上次更新时间",},
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 ClipShare. All Rights Reserved.'
        }
    }
})
