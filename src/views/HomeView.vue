<template>
  <div class="home-view px-3 px-sm-4 px-lg-4 px-xl-5">
    <h1 class="header-page-text d-none d-sm-block d-md-block d-lg-block d-xl-block">
      Explore books
    </h1>
    <div class="search-bar mb-4 col-lg-8 col-xl-3 mx-auto  mt-4">
      <b-input-group>
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
    </div>
      <BooksShowcase :filter-input="filterText"/>
  </div>
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

  .search-bar {
    margin-bottom: 32px;
  }
</style>