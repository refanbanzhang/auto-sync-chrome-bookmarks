import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { sendToServer } from '../api'

export function useCoverRemoteBookmarks() {
  const isLoading = ref(false)
  const hasError = ref(false)

  async function coverRemoteBookmarks() {
    try {
      isLoading.value = true
      hasError.value = false

      const { state: bookmarks, error } = await useAsyncState(
        chrome.bookmarks.getTree(),
        []
      )

      if (error.value) {
        throw new Error('获取书签时出错')
      }

      await sendToServer(bookmarks.value[0].children[0].children)
    } catch (error) {
      console.error('同步书签时出错:', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    hasError,
    coverRemoteBookmarks
  }
}