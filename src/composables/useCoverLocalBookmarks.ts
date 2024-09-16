import { ref } from 'vue'
import { fetchBookmarks } from '../api'
import { start, finished } from "../stores/useBookmarksStore";

export function useCoverLocalBookmarks() {
  const isLoading = ref(false)
  const hasError = ref(false)

  async function createBookmarksRecursive(parentId: string, bookmarks: chrome.bookmarks.BookmarkTreeNode[]): Promise<void> {
    for (const bookmark of bookmarks) {
      const newBookmark = await chrome.bookmarks.create({
        parentId,
        title: bookmark.title,
        url: bookmark.url
      });

      if (bookmark.children) {
        await createBookmarksRecursive(newBookmark.id, bookmark.children);
      }
    }
  }

  async function createBookmarks(parentId: string, bookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
    try {
      await start()
      await createBookmarksRecursive(parentId, bookmarks)
    } finally {
      await finished()
    }
  }

  async function clearExistingBookmarks() {
    await start()
    const bookmarkBar = (await chrome.bookmarks.getTree())[0].children?.[0];
    if (bookmarkBar) {
      await Promise.all(
        (bookmarkBar.children ?? []).map(item => chrome.bookmarks.removeTree(item.id))
      );
    }
    await finished()
  }

  async function coverLocalBookmarks() {
    try {
      isLoading.value = true
      hasError.value = false
      const cloudBookmarks = await fetchBookmarks()
      await clearExistingBookmarks()
      await createBookmarks('1', cloudBookmarks)
    } catch (error) {
      console.error('更新本地书签失败:', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    hasError,
    coverLocalBookmarks,
  }
}