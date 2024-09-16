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

const RULE_ID = 1;
const TARGET_URL = "https://apiv3.shanbay.com/news/user_articles";
const PARAM_KEY = "ipp";
const PARAM_VALUE = "100";

function createRule() {
  return {
    id: RULE_ID,
    priority: 1,
    condition: {
      urlFilter: `${TARGET_URL}?list_type=liked&${PARAM_KEY}=10`,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST]
    },
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [{ key: PARAM_KEY, value: PARAM_VALUE }]
          }
        }
      }
    },
  };
}

chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [RULE_ID],
  addRules: [createRule()]
});