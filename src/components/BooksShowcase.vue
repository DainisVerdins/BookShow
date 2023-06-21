<template>
    <div class="book-showcase">
        <template v-if="!booksOnScreen.length">
            <img
                src="../assets/icons/books.svg"
                alt="books"
                height="144"
                width="144" 
            />
        </template>
        <template v-else>
            {{ booksOnScreen }}
        </template>
    </div>
</template>
  
<script lang="ts">
import type { Book } from '@src/interfaces/book';
import booksService from '@src/services/books-service';
import { defineComponent } from 'vue';
  
export default defineComponent({
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

    watch: {
        async filterInput(newFilterInput: string) {
            // tmp solution // TODO: fix me
            // TODO: probably remove this logic to computed property to catche result
            const books = await booksService.getBooks();

            this.booksOnScreen = books.filter((book: Book)=>{ return book.title && book.title.toLowerCase().includes(newFilterInput.toLowerCase()); });
        }
    },
});
</script>

<style lang="scss">
.book-showcase {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}
</style>