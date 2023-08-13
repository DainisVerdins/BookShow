//@ts-ignore just in case aliases works fine but ts goes mad when it sees them in *.test.ts files
import TheBookCard from '@/components/TheBookCard.vue'
import type { Book } from '@/interfaces/book'

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

const globalComponentStubs = ['b-card-img', 'b-card', 'b-row', 'b-card-body', 'b-col']

const theBook: Book = {
  id: 1,
  title: 'Brave New World',
  author: 'Aldous Huxley',
  description: "How beauteous mankind is! O brave new world, That has such people in't.",
  image: 'some url',
  rating: 3.5,
  publisher: 'Star ABC',
  isbn: '1234567890',
  price: '25.5'
}

const wrapper = mount(TheBookCard, {
  props: {
    book: theBook
  },
  global: {
    stubs: globalComponentStubs
  }
})

describe('TheBookCard.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('if props.readOnly is false b-card have  class "clickable" ', () => {
    expect(wrapper.findComponent('[data-test="b-card"]').classes()).toContain('clickable')
  })
  
  it('if props.readOnly is true child b-card haven\'t class "clickable" ', async () => {
    await wrapper.setProps({ readOnly: true })
    expect(wrapper.findComponent('[data-test="b-card"]').classes()).not.toContain('clickable')
  })
})
