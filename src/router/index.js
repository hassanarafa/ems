import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/LoginView.vue';
import Home from '@/views/HomeView.vue';
import Clock from '@/views/ClockView.vue';
import Survey from '@/views/SurveyView.vue';
import ToDo from '@/views/ToDoListView.vue';
import Admin from "@/views/AdminVue.vue"
import SurveyAdmin from "@/views/SurveyAdminView.vue"
import SurveyCreate from "@/components/CreateSurveyPage.vue"
import UserAnswer from "@/views/UserAnswers.vue"

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
    {
        path: '/todo',
        name: 'todo',
        component: ToDo,
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
    },
    {
        path: '/surAdmin',
        name: 'surAdmin',
        component: SurveyAdmin,
    },
    {
        path: '/surveyPage',
        name: 'surveyPage',
        component: SurveyCreate,
    },
    {
        path: '/userAnswer',
        name: 'userAnswer',
        component: UserAnswer,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
