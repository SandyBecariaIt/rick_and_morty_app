<template>
  <div class="card" @click="$emit('select', id)">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="image"
          :alt="name"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ name }}</p>
        </div>
      </div>

      <div class="content">

        <time>
          <i class="fa-solid fa-star"></i>
        </time>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  name: string,
  image: string,
}>()

defineEmits<{
  (event: 'select', id: number): void
}>()
</script>

<style scoped>
.image img {
  object-fit: cover;
}

.card {
  cursor: pointer;
}
</style>
