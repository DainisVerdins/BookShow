<template>
    <div class="star-raiting">
        <span 
            v-for="index in starLimit"
            :key="index"
            class="star star-outlined">
        </span>
        <div class="star-raiting-colored" :style="raitingWidthStyle">
            <span
                v-for="index in starLimit"
                :key="index"
                class="star star-filled">
            </span>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
  
export default defineComponent ({
    name: 'StarRaiting',
    props: {
        rating: {
            type: Number,
            default: 0,
        },
        starLimit: {
            type: Number,
            default: 5,
        }
    },
    computed: {
        raitingWidth(): Number {
            return this.rating / this.starLimit * 100;
        },

        raitingWidthStyle(): string {
            return `width: ${this.raitingWidth}%;`;
        }
    }
});
</script>

<style lang="scss">
@import '../styles/custom/variables';

// border-0
.star-raiting {
    position: relative;
    display: inline-flex;

    &-colored {
        display: inline-flex;
        position: absolute;
        width: 0;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .star {
        display: inline-block;
        width: 24px;
        height: 24px;
        flex-shrink: 0;

        &-filled {
            background: url('/src/assets/icons/star-filled.svg');
        }
        &-outlined {
            background: url('/src/assets/icons/star-outlined.svg');
        }
    }
}
</style>