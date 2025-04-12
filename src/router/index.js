import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/LoginView.vue';
import Home from '@/views/HomeView.vue';
import Clock from '@/views/ClockView.vue';
import Survey from '@/views/SurveyView.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/clock',
        name: 'clock',
        component: Clock,
    },
    {
        path: '/survey',
        name: 'survey',
        component: Survey,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
