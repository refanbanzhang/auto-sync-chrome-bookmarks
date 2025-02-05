import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { saveBookmarks } from '../api'

export function useUpdateRemoteBookmarks() {
  const isLoading = ref(false)
  const hasError = ref(false)

  async function rewriteRemoteBookmarks() {
    try {
      isLoading.value = true
      hasError.value = false

      const { state: bookmarks, error } = await useAsyncState(chrome.bookmarks.getTree(), [])

      if (error.value) {
        throw new Error('获取书签时出错')
      }

      const localBookmarks = bookmarks.value[0]?.children?.[0]?.children
      if (localBookmarks && localBookmarks.length > 0) {
        await saveBookmarks(localBookmarks)
      } else {
        console.warn('未找到本地书签')
      }
    } catch (error) {
      console.error('同步书签失败:', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    hasError,
    rewriteRemoteBookmarks
  }
}