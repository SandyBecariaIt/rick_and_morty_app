<template>
  <nav class="pagination is-small">
    
    <button
      class="pagination-previous"
      :disabled="page === 1"
      @click="$emit('prev')"
    >
      Previous
    </button>

    <button
      class="pagination-next"
      :disabled="page === totalPages"
      @click="$emit('next')"
    >
      Next
    </button>

    <ul class="pagination-list">

      <!-- Primera página -->
      <li v-if="visiblePages.showStartDots">
        <a @click.prevent="$emit('goTo', 1)">1</a>
      </li>

      <li v-if="visiblePages.showStartDots">
        <span class="pagination-ellipsis">...</span>
      </li>

      <!-- Páginas visibles -->
      <li v-for="p in visiblePages.pages" :key="p">
        <a
          href="#"
          class="pagination-link"
          :class="{ 'is-current': p === page }"
          @click.prevent="$emit('goTo', p)"
        >
          {{ p }}
        </a>
      </li>

      <!-- Última página -->
      <li v-if="visiblePages.showEndDots">
        <span class="pagination-ellipsis">...</span>
      </li>

      <li v-if="visiblePages.showEndDots">
        <a @click.prevent="$emit('goTo', totalPages)">
          {{ totalPages }}
        </a>
      </li>

    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits(['next', 'prev', 'goTo'])

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.page
  const delta = 2 

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  if (current <= 3) {
    start = 1
    end = Math.min(5, total)
  }

  if (current >= total - 2) {
    start = Math.max(total - 4, 1)
    end = total
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return {
    pages,
    showStartDots: start > 1,
    showEndDots: end < total,
  }
})
</script>