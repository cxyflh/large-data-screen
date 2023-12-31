import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'

export const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'index',
        path: '/home',
        component: HomePage,
    },
    {
        name: 'supervisionReport',
        path: '/supervision-report',
        component: () => import( /* webpackChunkName: "supervisionReport" */'@/views/supervision-report.vue'),
    },
    {
        name: 'szyd',
        path: '/SZYD',
        component: () => import( /* webpackChunkName: "SZYD" */'@/views/three-importance-large-amount.vue'),
    },
  {
    name: 'third-party-report',
    path: '/third-party-report',
    component: () => import( /* webpackChunkName: "thirdPartyReport" */'@/views/ThirdPartyReport.vue'),
  },
  {
    name: 'expert-score',
    path: '/expert-score',
    component: () => import( /* webpackChunkName: "thirdPartyReport" */'@/views/ExpertScore.vue'),
  },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_PATH),
    routes: routes,
    scrollBehavior: (to, from) => {
        if (to.path !== from.path) {
            setTimeout(() => {
                document.getElementById('app').scrollTop = 0;
            });
        }
        return {
            top: 0,
        };
    },
});
export default router;
