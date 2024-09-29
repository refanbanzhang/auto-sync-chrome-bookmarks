import { fetchBookmarks } from "./api";
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

  const remoteBookmarks = await fetchBookmarks()
  if (remoteBookmarks.length > 1) {
    await coverLocalBookmarks();
  } else {
    console.log('远程书签数量不足，跳过同步')
  }
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

const RULE_ID = 1;
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [RULE_ID],
  addRules: [{
    id: RULE_ID,
    condition: {
      urlFilter: "https://apiv3.shanbay.com/news/user_articles?list_type=liked&ipp=10",
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST]
    },
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [{ key: "ipp", value: "100" }]
          }
        }
      }
    },
  }]
});