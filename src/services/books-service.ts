import type { Book } from '@/interfaces/book';
import constants from '@/constants/constants';

const booksService = {
  // this heavy work must to be done in back-end
  getBooks: async (): Promise<Book[]> => {
    const response = await fetch(`http://${constants.DEFAULT_URL}:${constants.DEFAULT_PORT}/src/data/books.json`)
    const booksData = await response.json()

    return booksData.books
  },

  getBookById: async(id: number): Promise<Book> => {
    const response = await fetch(`http://${constants.DEFAULT_URL}:${constants.DEFAULT_PORT}/src/data/books.json`)
    const booksData = await response.json();

    return booksData.books.find((book: Book) => { return book.id === id; });
  }
}

export default booksService
