// // 同步本地书签到云端（本地更新到云端）
// // 时机：
// // 每次收藏书签或者删除书签时

// // 从云端拉取数据到本地（云端更新到本地）
// // 时机：
// // 每次打开浏览器时

// // 冲突处理
// // 电脑1删除了书签a，电脑2如何同步呢？
// // 1 定时请求远程数据更新本地
// // 2 每次打开浏览器时，请求远程数据更新本地
// console.log('background.ts')
// chrome.runtime.onStartup.addListener(() => {
//   console.log('浏览器已启动')
// })

// syncBookmarksFromCloud()
// setTimeout(() => {
//   syncBookmarksToCloud()
// }, 5000)

// // 监听书签添加事件
// chrome.bookmarks.onCreated.addListener((id, bookmark) => {
//   console.log('新书签已添加:', bookmark)
//   // 这里可以添加同步到云端的逻辑
//   syncBookmarksToCloud()
// })

// // 监听书签删除事件
// chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
//   console.log('书签已删除:', removeInfo)
//   // 这里可以添加同步到云端的逻辑
//   syncBookmarksToCloud()
// })

// async function sendToServer(bookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
//   console.log('bookmarks', bookmarks)
//   // 需要一个存储json的接口
//   // 这里应该是实际从您的API获取书签的逻辑
//   // 以下是一个示例实现
//   const response = await fetch('https://fc-mp-df4ec9b3-fa24-462e-9e69-c23df91f3ffd.next.bspapp.com/data/setData', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({data: {
//       data: bookmarks
//     }}),
//   })
//   console.log('response', response)
//   if (!response.ok) {
//     throw new Error('Failed to fetch bookmarks from API')
//   }
//   return await response.json()
// }

// // 同步书签到云端的函数（示例）
// async function syncBookmarksToCloud() {
//   console.log('正在同步书签到云端...')
//   // 这里添加实际的同步逻辑
//   // 例如：获取所有书签，然后发送到您的服务器
//   try {
//     const bookmarks = await chrome.bookmarks.getTree()
//     console.log('bookmarks', bookmarks)
//     // 发送 bookmarks 到您的服务器
//     await sendToServer(bookmarks)
//     console.log('书签同步完成')
//   } catch (error) {
//     console.error('同步书签时出错:', error)
//   }
// }

// interface BookmarkData {
//   _id: string;
//   data: chrome.bookmarks.BookmarkTreeNode[];
// }

// interface ApiResponse {
//   affectedDocs: number;
//   data: BookmarkData[];
// }

// // 从云端同步书签到本地
// async function syncBookmarksFromCloud() {
//   console.log('正在从云端同步书签...')
//   try {
//     // 从接口获取书签
//     const res = await fetchBookmarksFromApi()
//     const cloudBookmarks = res.data[0].data
//     // 更新本地书签
//     await updateLocalBookmarks(cloudBookmarks)

//     console.log('从云端同步书签完成')
//   } catch (error) {
//     console.error('从云端同步书签时出错:', error)
//   }
// }

// // 从接口获取书签（示例函数）
// async function fetchBookmarksFromApi(): Promise<ApiResponse> {
//   // 这里应该是实际从您的API获取书签的逻辑
//   // 以下是一个示例实现
//   const response = await fetch('https://fc-mp-df4ec9b3-fa24-462e-9e69-c23df91f3ffd.next.bspapp.com/data/getData')

//   if (!response.ok) {
//     throw new Error('Failed to fetch bookmarks from API')
//   }
//   return await response.json()
// }

// // 更新本地书签（示例函数）
// async function updateLocalBookmarks(cloudBookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
//   // 首先，移除所有现有的书签
//   const existingBookmarks = await chrome.bookmarks.getTree()
//   for (const node of existingBookmarks[0].children || []) {
//     if (node.id !== '0' && node.id !== '1') {  // 不删除 "书签栏" 和 "其他书签" 文件夹
//       await chrome.bookmarks.removeTree(node.id)
//     }
//   }

//   // 然后，添加从云端获取的书签
//   async function addBookmarks(parentId: string, nodes: chrome.bookmarks.BookmarkTreeNode[]) {
//     for (const node of nodes) {
//       if (node.url) {
//         await chrome.bookmarks.create({
//           parentId,
//           title: node.title,
//           url: node.url
//         })
//       } else if (node.children) {
//         const newFolder = await chrome.bookmarks.create({
//           parentId,
//           title: node.title
//         })
//         await addBookmarks(newFolder.id, node.children)
//       }
//     }
//   }

//   await addBookmarks('1', cloudBookmarks)  // '1' 是 "书签栏" 的 ID
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'getBookmarks') {
//     // 模拟书签数据
//     const mockBookmarks = [
//       {
//         id: '1',
//         title: '书签文件夹',
//         children: [
//           { id: '2', title: '示例书签', url: 'https://example.com' }
//         ]
//       }
//     ]
//     sendResponse(mockBookmarks)
//   }
// })

// export {}