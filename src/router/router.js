import {createRouter, createWebHistory} from "vue-router"
import {useUserStore} from '../stores/user'
import { useDatabaseStore } from "../stores/database"

import Home from '../views/Home.vue'
import Editar from '../views/EditUrl.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue"
import Perfil from "../views/PerfilUser.vue"
import NotFound from "../views/NotFound.vue"


const requireAuth = async (to, from, next) => {
    const userStore = useUserStore()
    userStore.loadingSession = true
    const user = await userStore.currentUser()
    if (user) {
        next()
    }
    else {
        next('/login')
    }
    userStore.loadingSession = false
}

const redirection = async (to, from, next) => {
    const databaseStore = useDatabaseStore()
    const userStore = useUserStore()
        userStore.loadingSession = true
        databaseStore.getURL(to.params.pathMatch[0])
    const name = await databaseStore.getURL(to.params.pathMatch[0])
    if (!name){
            userStore.loadingSession = false

        next()
    }else {
        window.location.href = name
        userStore.loadingSession = true
        next()
    }
}

const routes = [
    {path: '/', component: Home, beforeEnter: requireAuth, name: 'home'},
    {path: '/editar/:id', component: Editar, beforeEnter: requireAuth },
    {path: '/login', component: Login, name: 'login'},
    {path: '/register', component: Register, name: 'register'},
    {path: '/perfil', component: Perfil, beforeEnter: requireAuth, name: 'perfil'},
    {path: '/:pathMatch(.*)*', component: NotFound, name: '404', beforeEnter: redirection},

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router