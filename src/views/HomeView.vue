<template>
  <main>
    <h1 class="header-page-text">Explore books</h1>
    <b-input-group size="sm" class="mb-4 ">
      <b-input-group-prepend is-text>
        <img
            src="../assets/icons/loupe.svg"
            alt="loupe"
            height="19"
            width="19" 
        />
      </b-input-group-prepend>
      <b-form-input
        v-model="filterText"
        placeholder="Search for a book"
      />
    </b-input-group>
    <BooksShowcase :filter-input="filterText"/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BooksShowcase from '@src/components/BooksShowcase.vue';

export default defineComponent ({
  components: { BooksShowcase },
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
    text-align: center;
  }
</style>