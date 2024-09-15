<script setup lang="ts">
import { defineProps } from 'vue'

interface Bookmark {
  id: string
  title: string
  url?: string
  children?: Bookmark[]
}

const props = defineProps<{
  bookmarks: Bookmark[]
}>()
</script>

<template>
  <ul class="pl-4">
    <li v-for="bookmark in bookmarks" :key="bookmark.id" class="my-1">
      <template v-if="bookmark.url">
        <a :href="bookmark.url" target="_blank" class="text-blue-600 hover:underline">
          {{ bookmark.title }}
        </a>
      </template>
      <template v-else>
        <span class="font-bold">{{ bookmark.title }}</span>
        <BookmarkTree v-if="bookmark.children" :bookmarks="bookmark.children" />
      </template>
    </li>
  </ul>
</template>