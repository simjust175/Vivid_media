/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import DashboardPage from '@/pages/DashboardPage.vue';
import GalleryPage from '@/pages/GalleryPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
//import HeaderArea from '../components/LandingPage/HeaderArea.vue';
//import index from '@/pages/index.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

// Add a custom route
router.addRoute({
  path: '/dash',
  component: DashboardPage,
});

// router.addRoute({
//   path: '/',
//   component: index
// });

router.addRoute({
  path: '/gallery',
  component: GalleryPage,
});

router.addRoute({
  path: '/contact',
  component: ContactPage,
});

export default router

