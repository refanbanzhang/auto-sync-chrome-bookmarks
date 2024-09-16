const host = 'https://fc-mp-df4ec9b3-fa24-462e-9e69-c23df91f3ffd.next.bspapp.com'

export async function sendToServer(bookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
  const res = await fetch(`${host}/data/setData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        bookmarks
      }
    }),
  })
  return res.json()
}

export async function fetchBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  const res = await fetch(`${host}/data/getData`)
  const data = await res.json()
  return data.data[0].bookmarks
}
