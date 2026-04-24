<template>
  <div class="dropdown" :class="{ 'is-active': showResults }">
    <div class="dropdown-trigger" style="width: 100%">
      <div class="field">
        <p class="control has-icons-right">
          <input
            class="input"
            type="text"
            :placeholder="placeholder"
            v-model="query"
            @focus="showResults = true"
            @blur="onBlur"
          />
          <span class="icon is-small is-right">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
        </p>
      </div>
    </div>

    <div class="dropdown-menu" style="width: 100%">
      <div class="dropdown-content">
        <a
          v-for="item in resultados"
          :key="item.id"
          class="dropdown-item"
          @mousedown.prevent="seleccionar(item)"
        >
          {{ item.name }}
        </a>
        <p v-if="query && resultados.length === 0" class="dropdown-item has-text-grey">
          Sin resultados
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Item {
  id: number
  name: string
}

const props = defineProps<{
  items: Item[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (event: 'select', item: Item): void
}>()

const query = ref('')
const showResults = ref(false)

const resultados = computed(() => {
  if (!query.value) return []
  const texto = query.value.toLowerCase()
  return props.items.filter(item =>
    item.name.toLowerCase().includes(texto)
  )
})

function seleccionar(item: Item) {
  query.value = item.name
  showResults.value = false
  emit('select', item)
}

function onBlur() {
  showResults.value = false
}
</script>
