import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: '/upload',
    component: () => import('@/views/UploadView.vue'),
  },
  {
    path: '/sign',
    component: () => import('@/views/SignView.vue'),
  },
  {
    path: '/test',
    component: () => import('@/views/SignNameModal.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // linkActiveClass: "active",
});

export default router;
