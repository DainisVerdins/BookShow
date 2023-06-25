<template>
  <div v-if="isLoaded" class="book-view">
    <div class="navigation-bar">
      <img
        src="../assets/icons/arrow-to-left.svg"
        alt="arrow to left"
        @click="back"
      />
      <h2
        class="navigation-text"
        @click="back"
      >
        Explore
      </h2>
    </div>

    <div class="row book-preview">
      <div class="col-12 col-lg-4 col-xl-4 pe-0">
          <BookCard
            :book="book"
            show-book-publisher
            read-only
          />
          <div class="d-flex flex-row bd-highlight mt-3">
            <span class="review-raiting me-2">{{ bookRaiting }}</span>
            <StarRaiting
              :rating="book.rating"
              read-only
            />
          </div>
      </div>
      <div class="col-12 col-lg-8 col-xl-8 book-description">
        <p class="mb-0">{{ book.description }}</p>
      </div>
    </div>
    
    <!--Review submiting part-->
    <div class="review-section mb-3">
      <template v-if="showSubmitForm">
        <h1 class="review-title">Write a review</h1>
        <b-form>
          <div class="star-raiting-choiser">
            <h2 class="star-raiting-title">Rate the book</h2>
            <StarRaiting v-model:rating="reviewRating" />
          </div>
          <div class="row">
            <div class="col-12 col-lg-8 col-xl-5">
              <b-form-textarea
                v-model="reviewText"
                placeholder="Enter review text..."
                rows="3"
                max-rows="6"
                class="form-textarea "
              />
            </div>
          </div>
          <b-button
            type="submit"
            variant="primary"
            class="mt-4 btn-submit-review col-12 col-lg-2 col-xl-2"
            @click="submitReview"
          >
            Submit review
          </b-button>
        </b-form>
      </template>
      <template v-else>
        <div class="col-8 col-sm-4 col-lg-3 col-xl-2 badge review-notification-badge">
          <p class="my-0">Thank you! Review received.</p>
        </div>
      </template>
    </div>
  </div>
</template>
  
<script lang="ts">
import type { Book } from '@src/interfaces/book';
import booksService from '@src/services/books-service';
import { defineComponent } from 'vue';
import BookCard from '@src/components/BookCard.vue';
import StarRaiting from '@src/components/StarRaiting.vue';
import bookReviewService from '@src/services/book-review-service';
import type { BookReview } from '@src/interfaces/book-review';

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
    this.bookRaiting = this.book.rating;
    this.isLoaded = true;
  },

  data() {
    return {
      book: {} as Book,
      isLoaded: false,
      bookRaiting: 0,
      reviewText: '',
      reviewRating: 0,
      showSubmitForm: true,
    };
  },

  methods: {
    async submitReview() {
      try {
        await bookReviewService.saveReview({
          bookId: parseInt(this.id),
          reviewText: this.reviewText,
          bookRating: this.reviewRating,
        } as BookReview);
        this.showSubmitForm = false;
        } catch (error: unknown) {
            console.warn((error as Error).message); // TODO: add send notification to user
            this.reviewRating = 0;
            this.reviewText = '';
        }
    },
    back(): void {
      this.$router.push({ name: 'home'});
    }
  }
});
</script>
<style lang="scss">
@import '../styles/custom/variables';


.book-view {
  .navigation-bar {
    display: inline-flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

  .navigation-text {
    margin-bottom: 0;
    color: $black-095;
    font-size: 16px;
    font-family: Inter;
    font-weight: 700;
    line-height: 24px;
    text-decoration-line: underline;
  }
  &:hover {
    background-color: yellow;
    cursor: pointer;
  }
}

.book-preview {
  margin-bottom: 40px;

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

  .form-textarea {
    border-radius: 4px;
    border: 1px solid $ui-grey;
    background: #fff;
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
  .review-notification-badge {
    padding: 10px;
    background-color: #CFEBFF;
    border-radius: 4px;
    color: $black-095;
    font-size: 14px;
    font-family: Inter;
    font-weight: 700;
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
}

</style>