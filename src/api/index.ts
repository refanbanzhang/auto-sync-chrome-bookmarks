const host = 'https://fc-mp-df4ec9b3-fa24-462e-9e69-c23df91f3ffd.next.bspapp.com'

export async function sendToServer(bookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
  const res = await fetch(`${host}/data/setData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        data: bookmarks
      }
    }),
  })
  return res.json()
}

interface BookmarkData {
  _id: string;
  data: chrome.bookmarks.BookmarkTreeNode[];
}

interface ApiResponse {
  affectedDocs: number;
  data: BookmarkData[];
}

export async function fetchBookmarks(): Promise<ApiResponse> {
  const res = await fetch(`${host}/data/getData`)
  return res.json()
}
