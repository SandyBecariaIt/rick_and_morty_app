<template>
  <div class="card">
    <div class="card-content">
      <div @click="router.back()" class="content title-content">
        <i class="fa-solid fa-arrow-left"></i>
        <p class="title-text">{{ character?.name || '' }}</p>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline" v-if="!loading && !error || !character">
          <div class="column is-4">
            <figure class="image">
              <img :src="character?.image || ''" />
            </figure>
          </div>

          <div class="column is-8">
            <p class="subtitle"><strong>Nombre: </strong>{{ character?.name || '' }}</p>
            <p class="subtitle"><strong>Estado: </strong>{{ character?.status || '' }}</p>
            <p><strong>Especie: </strong>{{ character?.species || '' }}</p>
            <p><strong>Genero: </strong>{{ character?.gender || '' }}</p>
            <p>{{ character?.location?.name || '' }}</p>
          </div>
        </div>

        <p v-else-if="error">{{ error }}</p>
        <p v-else>Cargando...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFilms } from "@/composables/useFilms";
import { useRouter } from "vue-router";

const router = useRouter();
const { character, loading, error, getFilmById } = useFilms();

onMounted(() => {
  const id = router.currentRoute.value.params.id as string;
  getFilmById(id);
});
</script>

<style scoped>
.title-content {
  cursor: pointer;
  display: flex;
}

.title-text {
  margin-left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.fa-solid {
  margin-top: 9px;
  font-size: 1.2rem;
}
</style>
