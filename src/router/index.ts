import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@src/views/HomeView.vue';
import BookView from '@src/views/BookView.vue';
import NotFoundView from '@src/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { 
      path: '/book/:id',
      name: 'book-review',
      component: BookView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    },
  ]
})

export default router
