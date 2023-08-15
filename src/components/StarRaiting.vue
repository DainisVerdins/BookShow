<template>
    <div
        class="star-raiting"
        @mouseleave="resetRating"
    >
        <span 
            v-for="_n in starLimit"
            :key="_n"
            :class="['star', isOutlined(_n) ? 'star-outlined' : 'star-filled']"
            @click="setRaiting(_n)"
        >
        </span>
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
        },
        readOnly: {
            type: Boolean,
            default: false,
        }
    },
    mounted() {
        this.currentRating = this.rating;
    },
    data() {
        return {
            currentRating: 0,
            selectedRaiting: 0,
        }
    },
    methods: {
        setRaiting(index: number) {
            if(this.readOnly)
                return;
            this.selectedRaiting = index;
            this.currentRating = index;

            this.$emit('update:rating', index);
        },

        resetRating(): void {
            if (!this.readOnly && !this.currentRating) {
                this.selectedRaiting = 0;
            }
        },

        isOutlined(n: number): boolean {
            return n > Math.round(this.currentRating);
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