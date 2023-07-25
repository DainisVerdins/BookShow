<template>
    <div class="star-rating" @mouseleave="resetRating">
        <span v-for="_n in starLimit" :key="_n" :class="['star', isOutlined(_n) ? 'star-outlined' : 'star-filled']"
            @click="setRating(_n)">
        </span>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps({
    rating: { type: Number, default: 5 },
    starLimit: { type: Number, default: 5 },
    readOnly: { type: Boolean, default: false }
});
const emit = defineEmits<{
    'update:rating': [index: number]
}>();

let currentRating: Ref<number> = ref(0);
let selectedRating: Ref<number> = ref(0);

onMounted(() => {
    currentRating.value = props.rating;
})

// methods live here

function setRating(index: number) {
    if (props.readOnly)
        return;

    selectedRating.value = index;
    currentRating.value = index;

    emit('update:rating', index);
}

const isOutlined = ((index: number): boolean => {
    return index > Math.round(currentRating.value);
});

const resetRating = (): void => {
    if (!props.readOnly && !currentRating.value)
        selectedRating.value = 0;
}
</script>

<style lang="scss">
@import '../styles/custom/variables';

// border-0
.star-rating {
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