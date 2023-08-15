<template>
  <div v-if="isLoaded" class="book-view">
    <div class="navigation-bar">
      <img src="../assets/icons/arrow-to-left.svg" alt="arrow to left" @click="back" />
      <h2 class="navigation-text" @click="back">
        Explore
      </h2>
    </div>

    <div class="row book-preview">
      <div class="col-12 col-lg-4 col-xl-4 pe-0">
        <TheBookCard :book="book" show-book-publisher read-only />
        <div class="d-flex flex-row bd-highlight mt-3">
          <span class="review-rating me-2">{{ book.rating }}</span>
          <TheStarRating :rating="book.rating" read-only />
        </div>
      </div>
      <div class="col-12 col-lg-8 col-xl-8 book-description">
        <p class="mb-0">{{ book.description }}</p>
      </div>
    </div>

    <!--Review submitting part-->
    
    <div class="review-section mb-3">
      <template v-if="showSubmitForm">
        <h1 class="review-title">Write a review</h1>
        <b-form>
          <div class="star-rating-chooser">
            <h2 class="star-rating-title">Rate the book</h2>
            <TheStarRating v-model:rating="reviewRating" />
          </div>
          <div class="row">
            <div class="col-12 col-lg-8 col-xl-5">
              <b-form-textarea v-model="reviewText" placeholder="Enter review text..." rows="3" max-rows="6"
                class="form-textarea " />
            </div>
          </div>
          <b-button type="submit" variant="primary" class="mt-4 btn-submit-review col-12 col-lg-2 col-xl-2"
            @click="submitReview">
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
  
<script setup lang="ts">
import type { Book } from '@interfaces/book';
import booksService from '@services/books-service';
import TheBookCard from '@components/TheBookCard.vue';
import TheStarRating from '@components/TheStarRating.vue';
import bookReviewService from '@services/book-review-service';
import type { BookReview } from '@interfaces/book-review';
import { onMounted, reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: { type: String, required: true },
});

onMounted(async () => {
  book = await booksService.getBookById(parseInt(props.id));
  isLoaded.value = true;
});

let book: Book = reactive({} as Book);
let isLoaded: Ref<boolean> = ref(false);

let showSubmitForm: Ref<boolean> = ref(true);
let reviewRating: Ref<number> = ref(0);
let reviewText: Ref<String> = ref('');

const router = useRouter();

const back = (): void => {
  router.push({ name: 'home' });
}

const submitReview = async (): Promise<void> => {
  try {
    console.log(book);
    await bookReviewService.saveReview({
      bookId: parseInt(props.id),
      reviewText: reviewText.value,
      bookRating: reviewRating.value,
    } as BookReview);

    showSubmitForm.value = false;

  } catch (error: unknown) {
    console.warn((error as Error).message); // TODO: add send notification to user
    reviewRating.value = 0;
    reviewText.value = '';
  }
}


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
}

.book-preview {
  margin-bottom: 40px;

  .review-rating {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: $black-055;

    margin-bottom: 0;
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

  .star-rating {
    &-chooser {
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
</style>