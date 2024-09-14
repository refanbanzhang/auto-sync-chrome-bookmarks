chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})

// 同步本地书签到云端（本地更新到云端）
// 时机：
// 每次收藏书签或者删除书签时

// 从云端拉取数据到本地（云端更新到本地）
// 时机：
// 每次打开浏览器时

// 冲突处理
// 电脑1删除了书签a，电脑2如何同步呢？
// 1 定时请求远程数据更新本地
// 2 每次打开浏览器时，请求远程数据更新本地

export {}