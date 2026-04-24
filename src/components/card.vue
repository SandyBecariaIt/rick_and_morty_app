<template>
  <div class="card">
    <div class="card-image" @click="$emit('select', id)">
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

      <div class="content" @click="$emit('addFavorite', id)">
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
  (event: 'addFavorite', id: number): void
}>()
</script>

<style scoped>
.image img {
  object-fit: cover;
}

.card {
  cursor: pointer;
}

.card-content {
  display: flex;
  justify-content: space-between;
}

.content {
  cursor: pointer;
  color: #FFDF00;
}
</style>
