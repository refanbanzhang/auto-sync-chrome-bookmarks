import { fetchBookmarks } from "./api";
import { useUpdateLocalBookmarks } from "./composables/useUpdateLocalBookmarks";
import { useUpdateRemoteBookmarks } from "./composables/useUpdateRemoteBookmarks";
import { isCreatingBookmarks } from "./stores/useBookmarksStore";

const { rewriteLocalBookmarks } = useUpdateLocalBookmarks();
const { rewriteRemoteBookmarks } = useUpdateRemoteBookmarks();

// 浏览器启动时触发
chrome.runtime.onStartup.addListener(async () => {
  const isCreating = await isCreatingBookmarks()

  if (isCreating) {
    return;
  }

  // 读取远程书签
  const remoteBookmarks = await fetchBookmarks()
  if (remoteBookmarks.length > 1) {
    await rewriteLocalBookmarks();
  }
});

// 创建书签时触发
chrome.bookmarks.onCreated.addListener(async () => {
  const isCreating = await isCreatingBookmarks()

  if (!isCreating) {
    rewriteRemoteBookmarks();
  }
});

// 删除书签时触发
chrome.bookmarks.onRemoved.addListener(async () => {
  const isCreating = await isCreatingBookmarks()

  if (!isCreating) {
    rewriteRemoteBookmarks();
  }
});