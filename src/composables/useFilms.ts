import { ref } from 'vue'
import { get } from '@/services/network'
import type { Film, response } from '@/types/film'

export function useFilms() {
  const characters = ref<Film[]>([])
  const character = ref<Film | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function getAllCharacters() {
    loading.value = true
    error.value = null

    try {
      const response = await get<response>('/character')
    characters.value = response.results

      console.log("response", characters.value)
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
      character.value = await get<Film>(`/films/${id}`)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    characters,
    character,
    loading,
    error,
    getFilmById,
    getAllCharacters
  }
}
