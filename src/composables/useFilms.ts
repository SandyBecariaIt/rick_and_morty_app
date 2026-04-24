import { ref } from 'vue'
import { get } from '@/services/network'
import type { Film, Info, response } from '@/types/film'

export function useFilms() {
  const characters = ref<Film[]>([])
  const character = ref<Film | null>(null)
  const favorites = ref<Film[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const page = ref(1) // actual page
  const info = ref<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

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
  }

  async function getAllCharacters(page: number = 1) {
    loading.value = true
    error.value = null

    try {
      const response = await get<response>(`/character?page=${page}`)
      characters.value = response.results
      info.value = response.info
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function getCharacterById(id: string) {
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

  async function nextPage() {
    if (!info.value.next) return

    loading.value = true
    try {
      const response = await fetch(info.value.next).then((res) => res.json())
      characters.value = response.results
      info.value = response.info
    } finally {
      loading.value = false
    }
  }

  async function prevPage() {
  if (!info.value.prev) return

  loading.value = true
  try {
    const response = await fetch(info.value.prev).then(res => res.json())
    characters.value = response.results
    info.value = response.info
  } finally {
    loading.value = false
  }
}

  function goToPage(p: number) {
  page.value = p
  getAllCharacters(p)
}

  return {
    favorites,
    characters,
    character,
    loading,
    error,
    page,
    info,
    getCharacterById,
    getAllCharacters,
    addFavorites,
    nextPage,
    prevPage,
    goToPage,
  }
}
