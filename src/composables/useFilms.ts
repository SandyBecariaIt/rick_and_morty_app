import { ref } from 'vue'
import { get } from '@/services/network'
import type { Film, response } from '@/types/film'

export function useFilms() {
  const characters = ref<Film[]>([])
  const character = ref<Film | null>(null)
  const favorites = ref<Film[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  function addFavorites(id: number) {
    const ch = characters.value.find((c) => c.id === id)
    if (!ch) return

    if (!Array.isArray(favorites.value)) {
      favorites.value = []
    }

    const exists = favorites.value.some((f) => f.id === id)

    if (!exists) {
      favorites.value.push(ch)

      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    console.log('favorites', favorites.value)
  }

  async function getAllCharacters() {
    loading.value = true
    error.value = null

    try {
      const response = await get<response>('/character')
      characters.value = response.results

      console.log('response', characters.value)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function getFilmById(id: string) {
    loading.value = true
    error.value = null

    try {
      character.value = await get<Film>(`/character/${id}`)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    favorites,
    characters,
    character,
    loading,
    error,
    getFilmById,
    getAllCharacters,
    addFavorites,
  }
}
