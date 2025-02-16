export default defineNuxtConfig({
  css: ["@/assets/styles/index.scss", "@/assets/styles/icon/iconfont.css"],

  app: {
    head: {
      title: "sounfury的个人空间 - 简历、作品展示与联系方式",
      htmlAttrs: {
        lang: "zh-CN", // 在 HTML 标签上添加 lang 属性
      },
      meta: [
        {
          name: "description",
          content:
            "欢迎来到 sounfury 的个人空间，这里展示我的个人简历、作品集、联系方式以及其他网站链接，让我们共同探索更多精彩内容。",
        },
        { name: "author", content: "sounfury" },
        {
          name: "keywords",
          content:
            "sounfury, 个人主页, 个人博客, 前端开发, 编程技巧, 技术分享, 生活博客, 简历分享, 作品集, 联系方式",
        },
        { name: "robots", content: "index, follow" }, // 确保搜索引擎能够抓取和跟踪页面
        {
          property: "og:title",
          content: "sounfury的个人空间 - 博客与技术分享",
        }, // Open Graph Title
        {
          property: "og:description",
          content:
            "欢迎来到 sounfury 的个人主页，展示个人博客、技术分享与导航，涵盖前端开发、编程技巧与生活点滴。",
        }, // Open Graph Description

        { property: "og:url", content: "https://sounfury.top" }, // Open Graph URL
      ],
    },
  },

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt"], // 加载 Tailwind CSS
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/styles/tools/_sassMagic.scss";
          `,
        },
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: true,
})
