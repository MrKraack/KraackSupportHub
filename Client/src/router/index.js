import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from "../views/DashboardView.vue"
import TicketOverview from "../views/TicketOverview.vue"
import createTicketView from "../views/CreateTicketView.vue"
import TicketDetailView from "../views/TicketDetailView.vue"
import LoginView from "../views/LoginView.vue"
import registerView from "../views/RegisterView.vue"

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
  },
  {
    path: '/register',
    name: 'register',
    component: registerView,
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketOverview,
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
  },
  {
    path: '/createTicket',
    name: 'createTicket',
    component: createTicketView,
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
  },
  {
    path: '/ticket/:id',
    name: 'ticketDetail',
    component: TicketDetailView,
    props: true,
    meta: {
      requiresAuth: true // Add meta field to indicate protected route
    }
  }

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
