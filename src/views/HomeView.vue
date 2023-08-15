<template>
  <div class="home-view px-3 px-sm-4 px-lg-4 px-xl-5">
    <h1 class="header-page-text d-none d-sm-block d-md-block d-lg-block d-xl-block">
      Explore books
    </h1>
    <div class="search-bar mb-4 col-lg-8 col-xl-3 mx-auto  mt-4">
      <b-input-group>
        <b-input-group-prepend is-text>
          <img src="../assets/icons/loupe.svg" alt="loupe" height="19" width="19" />
        </b-input-group-prepend>
        <b-form-input data-test="blabla" v-model="searchText" type-text placeholder="Search for a book" />
      </b-input-group>
    </div>
    <div class="book-showcase" v-if="isLoaded">
      <template v-if="!filteredBooks.length">
        <div class="showcase-stub">
          <img src="../assets/icons/books.svg" alt="books" height="144" width="144" />
        </div>
      </template>
      <template v-else>
        <p class="results-title">{{ filteredBooks.length }} results</p>
        <div class="books">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <template v-for="book in filteredBooks" :key="book.id">
              <TheBookCard :book="book" @click="openBookDetails(book.id)" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheBookCard from '@components/TheBookCard.vue';
import type { Book } from '@interfaces/book';
import booksService from '@services/books-service';
import { type Ref, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

onMounted(async () => {
  books.value = await booksService.getBooks();
  isLoaded.value = true;
});

const filteredBooks = computed((): Book[] => {
  if (searchText.value) {
    return books.value.filter((book: Book) => { return book.title && book.title.toLowerCase().includes(searchText.value.toLowerCase()); });
  }

  return [];
});

let searchText: Ref<string> = ref('');
let books: Ref<Book[]> = ref([]);
let isLoaded: Ref<boolean> = ref(false);

const router = useRouter();

// methods lives here
const openBookDetails = (bookId: number): void => {
  console.log('filteredBooks.value.length',filteredBooks.value.length);
  router.push({
    name: 'book-review',
    params: { id: bookId }
  });
};

</script>
<style lang="scss">
@import '../styles/custom/variables';

.header-page-text {
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  font-family: 'Inter';
  margin-bottom: 32px;
  text-align: center;
}

.search-bar {
  margin-bottom: 32px;
}

.book-showcase {
  .showcase-stub {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .results-title {
    color: $black-055;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
}
</style>