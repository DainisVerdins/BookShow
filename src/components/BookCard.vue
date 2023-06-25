<template>
    <div class="col">
        <b-card no-body :class="['overflow-hidden book-card', readOnly ? '' : 'clickable' ]">
            <b-row class="g-0 g-sm-2 h-100">
                <b-col md="4" sm="3" class="col-4" lg="4" xl="3">
                    <b-card-img
                        :src="book.image"
                        alt="Book cover"
                    />
                </b-col>
                <b-col md="8" sm="9" class="col-8" lg="8" xl="9">
                    <b-card-body
                        :title="book.title"
                        class="h-100 px-xl-3 px-lg-2 px-sm-3"
                    >
                        <div class="card-body-content">
                            <p :class="['book-author', showBookPublisher ? 'my-0' : 'mb-2']"> {{ book.author }} </p>
                            <p :class="['book-year', showBookPublisher ? 'my-0' : 'mb-2']">{{ 2023 }}</p>
                            <p :class="['book-price', showBookPublisher ? 'my-0' : 'mb-2']">{{ book.price }}</p>
                            <p v-if="showBookPublisher" class="book-publisher my-0">{{ book.publisher }}</p>
                        </div>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
  
<script lang="ts">
import type { Book } from '@src/interfaces/book';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'BookCard',
    props: {
        book: {
            required: true,
            type: Object as PropType<Book>,
        },
        showBookPublisher: {
            type: Boolean,
            default: false
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
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