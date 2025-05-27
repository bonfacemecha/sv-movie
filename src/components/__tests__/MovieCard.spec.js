import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '@/components/MovieCard.vue'

describe('MovieCard', () => {
  it('displays movie title', () => {
    const movie = { id: 1, title: 'Inception', poster_path: '/image.jpg' }

    const wrapper = mount(MovieCard, {
      props: { movie },
    })

    expect(wrapper.text()).toContain('Inception')
    expect(wrapper.html()).toContain('img') // checks if it renders an image
  })
})
