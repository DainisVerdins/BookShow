<template>
    <div v-if="isLoaded">
        <h1>Here must be thing to go back </h1>
        <div class="row book-preview">
          <div class="col">
            <div class="content">
              <BookCard :book="book"/>
              <div class="d-flex flex-row bd-highlight mt-3">
                  <span class="review-raiting me-2">{{ reviewRating }}</span>
                 <StarRaiting :rating="book.rating" read-only/>
              </div>
            </div>
          </div>
          <div class="col book-description">
            <p class="mb-0">{{ book.description }}</p>
          </div>
        </div>
        <p>Here must be component submiting review</p>
        <StarRaiting  />
    </div>
</template>
  
<script lang="ts">
import type { Book } from '@src/interfaces/book';
import booksService from '@src/services/books-service';
import { defineComponent } from 'vue';
import BookCard from '@src/components/BookCard.vue';
import StarRaiting from '@src/components/StarRaiting.vue';
  
export default defineComponent ({
  components: { BookCard, StarRaiting },
  props: {
        id: {
            required: true,
            type: String,
        },
    },
    async mounted(): Promise<void> {
      this.book = await booksService.getBookById(parseInt(this.id));
      this.reviewRating = this.book.rating;
      this.isLoaded = true;
    },
    data() {
      return {
        book: {} as Book,
        isLoaded: false,
        value: 0,
        reviewRating: 0
      };
    },
  });
</script>
<style lang="scss">
@import '../styles/custom/variables';
.book-preview {
  margin-bottom: 40px;
  border: 1px solid green;
  .content {
    .review-raiting {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      color: $black-055;

      margin-bottom: 0;
    }
  }
  .book-description {
    display: flex;
    flex-direction: column;
    color: $black-070;
  }
}
</style>