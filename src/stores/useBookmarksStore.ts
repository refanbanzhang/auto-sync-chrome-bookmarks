export const start = () => chrome.storage.local.set({ isCreatingBookmarks: true })

export const finished = () => chrome.storage.local.set({ isCreatingBookmarks: false })

export const isCreatingBookmarks = async () => {
  const res = await chrome.storage.local.get('isCreatingBookmarks')
  return res.isCreatingBookmarks
}

