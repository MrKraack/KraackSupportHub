import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from "../views/DashboardView.vue"
import TicketOverview from "../views/TicketOverview.vue"
import createTicketView from "../views/CreateTicketView.vue"
import TicketDetailView from "../views/TicketDetailView.vue"
import LoginView from "../views/LoginView.vue"
import registerView from "../views/RegisterView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/register',
    name: 'register',
    component: registerView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketOverview
  },
  {
    path: '/createTicket',
    name: 'createTicket',
    component: createTicketView
  },
  {
    path: '/ticket/:id',
    name: 'ticketDetail',
    component: TicketDetailView,
    props: true,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
