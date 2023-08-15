
import type { BookReview } from '@/interfaces/book-review';
import constants from '@/constants/constants';

import axios from 'axios'

const bookReviewService = {
  // this heavy work must to be done in back-end
    saveReview: async (review: BookReview): Promise<void> => {
      await axios.post<BookReview>(constants.REVIEW_ENDPOINT, review);
    },

}

export default bookReviewService;
