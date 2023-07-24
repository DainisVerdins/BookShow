<template>
    <div class="book-showcase">
        <template v-if="!booksOnScreen.length">
            <div class="showcase-stub">
                <img
                src="../assets/icons/books.svg"
                alt="books"
                height="144"
                width="144"
            />
            </div>
        </template>
        <template v-else>
            <p class="results-title">{{ booksOnScreen.length }} results</p>
            <div class="books">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <template v-for="book in booksOnScreen" :key="book.id">
                        <ComposeTheBookCard
                            :book="book"
                            @click="openBookDetails(book.id)"
                        />
                    </template>
                </div >
            </div>
        </template>
    </div>
</template>
  
<script lang="ts">
import type { Book } from '@src/interfaces/book';
import booksService from '@src/services/books-service';
import { defineComponent } from 'vue';
import ComposeTheBookCard from '@src/components/ComposeTheBookCard.vue';

export default defineComponent({
    components: { ComposeTheBookCard },
    props: {
        filterInput: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            booksOnScreen: [] as Book[]
        };
    },
    methods: {
        openBookDetails(id: number): void {
            this.$router.push({
                name: 'book-review',
                params: { id: id }
            });
        }
    },
    watch: {
        async filterInput(newFilterInput: string): Promise<void> {
            if(!newFilterInput) {
                this.booksOnScreen = [];
                return;
            }

            // TODO: probably remove this logic to computed property to catche result
            const books = await booksService.getBooks();

            this.booksOnScreen = books.filter((book: Book)=>{ return book.title && book.title.toLowerCase().includes(newFilterInput.toLowerCase()); });
        }
    },
});
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