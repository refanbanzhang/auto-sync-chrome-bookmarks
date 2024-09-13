<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello from Vue!')
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
/* 可以在这里添加样式 */
</style>