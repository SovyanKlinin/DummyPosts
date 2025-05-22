import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Main from "../components/Main.vue";
import PostCreateEdit from "../views/PostCreateEdit.vue";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
        meta: {
            requiresAuth: false
        },
        children: [
            {
                path: '/posts',
                name: 'Main',
                component: Main
            }
        ]
    },
    
    {
        path: '/post_editor/edit/',
        name: 'EditPost',
        component: PostCreateEdit
    },

    {
        path: '/post_editor/create',
        name: 'CreatePost',
        component: PostCreateEdit
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;