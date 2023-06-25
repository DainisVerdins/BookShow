<template>
  <div v-if="isLoaded">
    <h1>Here must be thing to go back </h1>
    <div class="row book-preview">
      <div class="col">
        <div class="content">
          <BookCard :book="book" />
          <div class="d-flex flex-row bd-highlight mt-3">
            <span class="review-raiting me-2">{{ bookRaiting }}</span>
            <StarRaiting
              :rating="book.rating"
              read-only
            />
          </div>
        </div>
      </div>
      <div class="col book-description">
        <p class="mb-0">{{ book.description }}</p>
      </div>
    </div>
    <!--Review submiting part-->
    <div class="review-section mb-3">
      <h1 class="review-title">Write a review</h1>
      <b-form>
        <div class="star-raiting-choiser">
          <h2 class="star-raiting-title">Rate the book</h2>
          <StarRaiting v-model:rating="reviewRating" />
        </div>
        <div class="row">
          <div class="col-8">
            <b-form-textarea
              v-model="reviewText"
              placeholder="Enter review text..."
              rows="3"
              max-rows="6"
            />
          </div>
        </div>
        <b-button
          type="submit"
          variant="primary"
          class="mt-4 btn-submit-review"
        >
          Submit review
        </b-button>
      </b-form>
    </div>
  </div>
</template>
  
<script lang="ts">
import type { Book } from '@src/interfaces/book';
import booksService from '@src/services/books-service';
import { defineComponent } from 'vue';
import BookCard from '@src/components/BookCard.vue';
import StarRaiting from '@src/components/StarRaiting.vue';

export default defineComponent({
  components: { BookCard, StarRaiting },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  async mounted(): Promise<void> {
    this.book = await booksService.getBookById(parseInt(this.id));
    this.bookRaiting = this.book.rating;
    this.isLoaded = true;
  },
  data() {
    return {
      book: {} as Book,
      isLoaded: false,
      value: 0,
      bookRaiting: 0,
      reviewText: '',
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

.review-section {

  .review-title {
    color: $black-095;
    font-size: 24px;
    font-family: Inter;
    font-weight: 700;
  }


  .star-raiting {
    &-choiser {
      margin-bottom: 24px;
    }
    &-title {
      color: $black-095;
      font-size: 18px;
      font-family: Inter;
      font-weight: 700;
      line-height: 28px;
    }
  }

  .btn-submit-review {
    border-radius: 24px;
    border: 2px solid #3980B2;
    background-color: #fff;
    padding: 10px;
    color: #3980B2;

    .btn-content {
      font-size: 16px;
      font-family: Inter;
      font-weight: 700;
      line-height: 24px;
    }
  }
}
</style>