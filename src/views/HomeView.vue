<template>
  <main>
    <h1 class="header-page-text">Explore books</h1>
    <b-input-group size="sm" class="mb-2">
      <b-input-group-prepend is-text>
        <img
            src="../assets/icons/loupe.svg"
            alt="triangle with all three sides equal"
            height="19"
            width="19" 
        />
      </b-input-group-prepend>
      <b-form-input
        v-model="filterText"
        placeholder="Search for a book"
      />
    </b-input-group>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      filterText: ''
    };
  },
});
</script>
<style lang="scss">
  .header-page-text {
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    font-family: 'Inter';
    margin-bottom: 32px;
  }
</style>