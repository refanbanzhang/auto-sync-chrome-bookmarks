import { useCoverLocalBookmarks } from "./composables/useCoverLocalBookmarks";
import { useCoverRemoteBookmarks } from "./composables/useCoverRemoteBookmarks";
import { isCreatingBookmarks } from "./stores/useBookmarksStore";

const { coverLocalBookmarks } = useCoverLocalBookmarks();
const { coverRemoteBookmarks } = useCoverRemoteBookmarks();

chrome.runtime.onStartup.addListener(async () => {
  const isCreating = await isCreatingBookmarks()
  console.log('onStartup syncing', isCreating)
  if (isCreating) {
    return;
  }
  coverLocalBookmarks();
});

chrome.bookmarks.onCreated.addListener(async () => {
  const isCreating = await isCreatingBookmarks()
  console.log('onCreated syncing', isCreating)
  if (isCreating) {
    return;
  }
  coverRemoteBookmarks();
});

chrome.bookmarks.onRemoved.addListener(async () => {
  const isCreating = await isCreatingBookmarks()
  console.log('onRemoved syncing', isCreating)
  if (isCreating) {
    return;
  }
  coverRemoteBookmarks();
});
