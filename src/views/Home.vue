<template>
  <div>
    <p class="title">Rick And Morty</p>

    <div class="columns is-multiline">
      <div class="column is-4">
        <Input
          :items="characters"
          placeholder="Buscar película..."
          @select="onSelect"
        />
      </div>

      <div class="column is-full">
        <div class="columns is-multiline" v-if="loading">
          <div v-for="n in 4" class="column is-3">
            <Loader />
          </div>
        </div>

        <div v-else-if="error">{{ error }}</div>

        <div v-else class="columns is-multiline">
          <div v-for="character in characters" :key="character.id" class="column is-3">
            <Card
              :id="character.id"
              :name="character.name"
              :image="character.image"
              @select="(id) => onSelectedMovie(id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useFilms } from "@/composables/useFilms";
import { useRouter } from "vue-router";

// Components

import Loader from "../components/loader.vue";
import Input from "../components/input.vue";
import Card from "../components/card.vue";

const search = ref("");
const router = useRouter();
const { characters, loading, error, getAllCharacters } = useFilms();
console.log(characters)
onMounted(() => {
  getAllCharacters();
});

function onSelect(item: { id: number; title: string }) {
  router.push({ name: 'details', params: { id: item.id } })
}

const onSelectedMovie = (id: string) => {
  router.push({ name: "details", params: { id } });
};

</script>

<style scoped></style>
