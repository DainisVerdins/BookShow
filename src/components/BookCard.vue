<template>
    <div class="col">
        <b-card no-body class="overflow-hidden book-card">
        <b-row class="g-0  h-100">
            <b-col md="4">
                <b-card-img
                    :src="book.image"
                    alt="Book cover"
                    class="card-image"
                />
            </b-col>
        <b-col md="8">
            <b-card-body :title="book.title" class="h-100">
                <div class="card-body-content">
                    <p class="mb-2 card-author"> {{ book.author }} </p>
                    <p class="mb-2 card-year">{{ 2023 }}</p>
                    <p class="card-price">{{ book.price }}</p>
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
    props: {
        book: {
            required: true,
            type: Object as PropType<Book>,
        },
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
            .card-author {
                font-family: Inter; // TODO:  fix code duplication
                font-size: 14px;
                font-weight: 400;
                line-height: 17px;
                letter-spacing: 0em;
                text-align: left;
                color: $black-070;

            }
            .card-year {
                font-family: Inter;
                font-size: 14px;
                font-weight: 400;
                line-height: 17px;
                letter-spacing: 0em;
                text-align: left;
                color: $black-055;

            }
            .card-price {
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
   
    .card-image {
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

    &:hover {
        background-color: yellow;
        cursor: pointer;
    }
}
</style>