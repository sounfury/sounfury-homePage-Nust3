/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // 添加 DaisyUI 插件
  daisyui: {
    themes: ["light", "dark"], // 默认启用的主题
    darkTheme: "dark", // 设置深色主题的名称
  },
}
