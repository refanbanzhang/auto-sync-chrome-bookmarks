<script setup lang="ts">
import { computed } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useUpdateRemoteBookmarks } from  './composables/useUpdateRemoteBookmarks'
import { useUpdateLocalBookmarks } from './composables/useUpdateLocalBookmarks'

const { isLoading: isLoadingRemote, hasError: hasErrorRemote, coverRemoteBookmarks } = useUpdateRemoteBookmarks()
const { isLoading: isLoadingLocal, hasError: hasErrorLocal, coverLocalBookmarks } = useUpdateLocalBookmarks()
const hasError = computed(() => hasErrorRemote || hasErrorLocal)

async function handleCoverRemoteBookmarks() {
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
    await coverRemoteBookmarks()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('推送书签失败:', error)
    }
  }
}

async function handleCoverLocalBookmarks() {
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
    await coverLocalBookmarks()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('拉取书签失败:', error)
    }
  }
}
</script>

<template>
  <div class="container">
    <div>
      <div>
        <el-button
          type="primary"
          class="btn"
          @click="handleCoverRemoteBookmarks"
          :loading="isLoadingRemote"
        >
          推送
        </el-button>
        <el-button
          type="primary"
          class="btn"
          @click="handleCoverLocalBookmarks"
          :loading="isLoadingLocal"
        >
          拉取
        </el-button>
      </div>
      <p v-if="hasError.value" class="error-message">操作失败，请重试</p>
    </div>
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

.error-message {
  color: red;
  margin-top: 10px;
}
</style>