import { fetchBookmarks } from "./api";
import { useUpdateLocalBookmarks } from "./composables/useUpdateLocalBookmarks";
import { useUpdateRemoteBookmarks } from "./composables/useUpdateRemoteBookmarks";
import { isCreatingBookmarks } from "./stores/useBookmarksStore";

const { coverLocalBookmarks } = useUpdateLocalBookmarks();
const { coverRemoteBookmarks } = useUpdateRemoteBookmarks();

// 浏览器启动时触发
chrome.runtime.onStartup.addListener(async () => {
  const isCreating = await isCreatingBookmarks()
  console.log('onStartup syncing', isCreating)
  if (isCreating) {
    return;
  }

  const remoteBookmarks = await fetchBookmarks()
  if (remoteBookmarks.length > 1) {
    await coverLocalBookmarks();
  } else {
    console.log('远程书签数量不足，跳过同步')
  }
});

// 创建书签时触发
chrome.bookmarks.onCreated.addListener(async () => {
  const isCreating = await isCreatingBookmarks()
  console.log('onCreated syncing', isCreating)
  if (isCreating) {
    return;
  }
  coverRemoteBookmarks();
});

// 删除书签时触发
chrome.bookmarks.onRemoved.addListener(async () => {
  const isCreating = await isCreatingBookmarks()
  console.log('onRemoved syncing', isCreating)
  if (isCreating) {
    return;
  }
  coverRemoteBookmarks();
});