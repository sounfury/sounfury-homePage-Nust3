// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.scss", "@/assets/styles/icon/iconfont.css"],

  app: {
    head: {
      title: "sounfury的个人空间",
      meta: [
        { name: "description", content: "个人主页 - 展示与导航" },
        { name: "author", content: "sounfury" },
        { name: "keywords", content: "sounfury, 个人主页, 个人博客, 个人网站" },
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
  ssr: false,
})
