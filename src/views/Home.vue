<template>
  <div>
    <p class="title">Rick And Morty</p>

    <div class="columns is-multiline">
      <div class="column is-4">
        <Input :items="characters" placeholder="Buscar película..." @select="onSelect" />
      </div>

      <div class="column is-4" @click="showFavorites = !showFavorites" style="cursor: pointer;">
        <i class="fa-solid fa-star"></i>
        Mis Favoritos ({{ favorites.length }})
      </div>

      <div class="column is-full">
        <div class="columns is-multiline" v-if="loading">
          <div v-for="n in 4" class="column is-3">
            <Loader />
          </div>
        </div>

        <div v-else-if="error">{{ error }}</div>

        <div v-else class="columns is-multiline">
          <div v-for="character in listToShow" :key="character.id" class="column is-3">
            <Card :id="character.id" :name="character.name" :image="character.image"
              @select="(id) => onSelectedMovie(id)" @addFavorite="(id) => addFavoriteFunction(id)" />
          </div>
        </div>
      </div>

      <div class="column is-full">
        <Pagination :page="page" :totalPages="info.pages" @next="nextPage" @prev="prevPage" @goTo="goToPage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from "@/components/pagination.vue";
import { ref, computed, onMounted } from "vue";
import { useFilms } from "@/composables/useFilms";
import { useRouter } from "vue-router";

// Components

import Loader from "../components/loader.vue";
import Input from "../components/input.vue";
import Card from "../components/card.vue";

const search = ref("");
const router = useRouter();
const showFavorites = ref(false)
const {
  characters,
  favorites,
  page,
  info,
  loading,
  error,
  getAllCharacters,
  addFavorites,
  nextPage,
  prevPage,
  goToPage,
} = useFilms();

console.log("fav", favorites.value)

onMounted(() => {
  getAllCharacters();

  const stored = localStorage.getItem('favorites')

  if (stored) {
    const parsed = JSON.parse(stored)

    favorites.value = Array.isArray(parsed) ? parsed : [parsed]
  }
});

const listToShow = computed(() => {
  return showFavorites.value ? favorites.value : characters.value
})

function addFavoriteFunction(id: number) {
  addFavorites(id)
}

function onSelect(item: { id: number; name: string }) {
  router.push({ name: 'details', params: { id: item.id } })
}

const onSelectedMovie = (id: number) => {
  router.push({ name: "details", params: { id } });
};

</script>
