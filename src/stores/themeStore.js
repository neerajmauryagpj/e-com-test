import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', () => {
  const defaultTheme = ref('light')
  function switchTheme() {
    if (defaultTheme.value == 'light') {
      defaultTheme.value = 'dark'
    } else {
      defaultTheme.value = 'light'
    }
  }
  return { defaultTheme, switchTheme }
})
