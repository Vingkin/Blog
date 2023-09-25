import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import {copyCode} from "vuepress-theme-hope";

export default defineUserConfig({
    base: "/",

    lang: "zh-CN",
    title: "Vingkin的学习博客",
    description: "Vingkin的学习博客",

    theme,

    plugins: [
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
            // 为分类和标签添加索引
            customFields: [
                {
                    getter: (page: any) => page.frontmatter.category,
                    formatter: "分类：$content",
                },
                {
                    getter: (page: any) => page.frontmatter.tag,
                    formatter: "标签：$content",
                }
            ],
        }),
    ]
    // Enable it with pwa
    // shouldPrefetch: false,
});
