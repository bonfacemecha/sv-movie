//  Mock default export before any imports
vi.mock('@/services/api', () => {
  return {
    default: {
      get: vi.fn(),
    },
  }
})

import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from '@/stores/movies'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import api from '@/services/api'

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can search for movies', async () => {
    const store = useMovieStore()
    const mockResults = [{ id: 1, title: 'Batman Begins' }]

    api.get.mockResolvedValueOnce({
      results: mockResults,
      page: 1,
      total_pages: 1,
    })

    await store.searchMovies('batman')

    expect(api.get).toHaveBeenCalledWith('/search/movie', {
      query: 'batman',
      language: 'en-US',
      page: 1,
    })

    expect(store.movies).toEqual(mockResults)
    expect(store.currentPage).toBe(1)
  })
})
