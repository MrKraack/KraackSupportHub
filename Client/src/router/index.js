import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from "../views/DashboardView.vue"
import TicketOverview from "../views/TicketOverview.vue"
import createTicketView from "../views/CreateTicketView.vue"
import TicketDetailView from "../views/TicketDetailView.vue"

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
