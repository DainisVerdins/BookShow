<template>
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
</template>
  
<script setup lang="ts">
import TheBookCard from '@src/components/TheBookCard.vue';
import type { Book } from '@src/interfaces/book';
import booksService from '@src/services/books-service';
import { type Ref, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    searchText: { type: String, required: true }
});

onMounted(async () => {
    books.value = await booksService.getBooks();
    isLoaded.value = true;
});

const filteredBooks = computed((): Book[] => {
    if (props.searchText) {
        return books.value.filter((book: Book) => { return book.title && book.title.toLowerCase().includes(props.searchText.toLowerCase()); });
    }

    return [];
});

let books: Ref<Book[]> = ref([]);
let isLoaded: Ref<boolean> = ref(false);
const router = useRouter()

// methods lives here
const openBookDetails = (bookId: number): void => {
    router.push({
        name: 'book-review',
        params: { id: bookId }
    });
}
</script>

<style lang="scss">
@import '../styles/custom/variables';

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