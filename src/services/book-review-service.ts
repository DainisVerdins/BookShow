import type { BookReview } from '@src/interfaces/book-review';
import constants from '@src/constants/constants';
import axios from 'axios'

const bookReviewService = {
  // this heavy work must to be done in back-end
    saveReview: async (review: BookReview): Promise<void> => {
      await axios.post<BookReview>(constants.REVIEW_ENDPOINT, review);
    },

}

export default bookReviewService;
