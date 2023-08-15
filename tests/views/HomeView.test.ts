//@ts-ignore just in case aliases works fine but ts goes mad when it sees them in *.test.ts files
import HomeView from '../../src/views/HomeView.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import booksService from '@/services/books-service'
import type { Book } from '@/interfaces/book'

const books: Book[] = [
  {
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
]

vi.mock('../../src/services/books-service.ts');
booksService.getBooks = vi.fn().mockResolvedValue(books);

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const globalComponentStubs = [
  'b-input-group',
  'b-form-input',
  'b-input-group-prepend',
  'b-card-body',
  'b-col',
  'b-input-group',
]
const wrapper = mount(HomeView, {
  stubs: globalComponentStubs,
});

describe('HomeView view', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  });
})
