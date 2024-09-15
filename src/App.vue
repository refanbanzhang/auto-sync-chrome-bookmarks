<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { sendToServer, fetchBookmarks } from './api'
import { ElMessageBox } from 'element-plus'

const isLoading = ref(false)
const hasError = ref(false)

async function coverRemoteBookmarks() {
  try {
    await ElMessageBox.confirm(
      '确定要推送本地书签到服务器吗？这将覆盖服务器上的书签。',
      '确认推送',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    isLoading.value = true
    hasError.value = false

    const { state: bookmarks, error } = await useAsyncState(
      chrome.bookmarks.getTree(),
      []
    )

    if (error.value) {
      throw new Error('获取书签时出错')
    }

    await sendToServer(bookmarks.value)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('同步书签时出错:', error)
      hasError.value = true
    }
  } finally {
    isLoading.value = false
  }
}

async function createBookmarks(parentId: string, bookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
  const createPromises = bookmarks.map(async (bookmark) => {
    if (bookmark.url) {
      return chrome.bookmarks.create({
        parentId,
        title: bookmark.title,
        url: bookmark.url
      })
    } else {
      const newFolder = await chrome.bookmarks.create({
        parentId,
        title: bookmark.title
      })
      if (bookmark.children) {
        await createBookmarks(newFolder.id, bookmark.children)
      }
    }
  })

  await Promise.all(createPromises)
}

async function clearExistingBookmarks() {
  const existingBookmarks = await chrome.bookmarks.getTree()
  const nodes = existingBookmarks[0].children ?? []
  const removePromises = nodes.flatMap(node =>
    (node.children ?? []).map(item => chrome.bookmarks.removeTree(item.id))
  )

  await Promise.all(removePromises)
}

async function coverLocalBookmarks() {
  try {
    await ElMessageBox.confirm(
      '确定要从服务器拉取书签吗？这将覆盖本地的书签。',
      '确认拉取',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    isLoading.value = true
    hasError.value = false

    const res = await fetchBookmarks()
    const cloudBookmarks = res.data[0]?.data
    if (!cloudBookmarks || !cloudBookmarks[0]?.children?.[0]?.children) {
      throw new Error('Invalid bookmark data structure')
    }

    await clearExistingBookmarks()
    await createBookmarks('1', cloudBookmarks[0].children[0].children)
  } catch (error) {
    console.error('更新本地书签失败:', error)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <el-button
      type="primary"
      class="btn"
      @click="coverRemoteBookmarks"
      :loading="isLoading"
    >
      推送
    </el-button>
    <el-button
      type="primary"
      class="btn"
      @click="coverLocalBookmarks"
      :loading="isLoading"
    >
      拉取
    </el-button>
    <p v-if="hasError" class="error-message">操作失败，请重试</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
}

.btn {
  margin: 0 6px;
}
</style>