<template>
    <div class="col">
        <b-card data-test="b-card" no-body :class="['overflow-hidden book-card', props.readOnly ? '' : 'clickable']">
            <b-row class="g-0 g-sm-2 h-100">
                <b-col md="4" sm="3" class="col-4" lg="4" xl="3">
                    <b-card-img :src="props.book.image" alt="Book cover" />
                </b-col>
                <b-col md="8" sm="9" class="col-8" lg="8" xl="9">
                    <b-card-body :title="props.book.title" class="h-100 px-xl-3 px-lg-2 px-sm-3">
                        <div class="card-body-content">
                            <p :class="['book-author', props.showBookPublisher ? 'my-0' : 'mb-2']"> {{ props.book.author }} </p>
                            <p :class="['book-year', props.showBookPublisher ? 'my-0' : 'mb-2']">{{ 2023 }}</p>
                            <p :class="['book-price', props.showBookPublisher ? 'my-0' : 'mb-2']">{{ props.book.price }} </p>
                            <p v-if="props.showBookPublisher" class="book-publisher my-0">{{ props.book.publisher }} </p>
                        </div>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
  
<script setup lang="ts">
import type { Book } from '@/interfaces/book';
import type { PropType } from 'vue';
const props = defineProps({
    book: { type: Object as PropType<Book>, required: true },
    showBookPublisher: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false }
});
</script>

<style lang="scss">
@import '../styles/custom/variables';

// border-0
.book-card {
    max-width: 330px;
    max-height: 110px;
    border: none !important;
    border-radius: 0 !important;

    .card-body {
        padding: 0 10px 0 10px;

        .card-body-content {
            .book {
                &-author {
                    font-family: Inter; // TODO:  fix code duplication
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 17px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: $black-070;
                }

                &-year,
                &-publisher {
                    font-family: Inter;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 17px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: $black-055;
                }

                &--price {
                    font-family: Inter;
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 17px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: $black-095;
                }
            }
        }
    }

    .card-img {
        max-height: 110px;
        height: 110px;
        width: 88px;
    }

    .card-title {
        font-family: 'Inter';
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
    }
}

.clickable {
    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
</style>