import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"

export const useThemeStore = defineStore("theme", () => {
  // 直接使用 useLocalStorage 创建响应式主题变量
  const theme = useLocalStorage("theme", "dark")

  // 切换主题方法
  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light"
    document.body.setAttribute("data-theme", theme.value)
  }

  // 初始化主题
  if (typeof window !== "undefined") {
    document.body.setAttribute("data-theme", theme.value)
  }

//getters



  return { theme, toggleTheme }
})
