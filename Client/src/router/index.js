import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from "../views/DashboardView.vue"
import TicketOverview from "../views/TicketOverview.vue"
import createTicketView from "../views/CreateTicketView.vue"
import TicketDetailView from "../views/TicketDetailView.vue"
import LoginView from "../views/LoginView.vue"
import registerView from "../views/RegisterView.vue"
import businessView from "../views/BusinessView.vue"
import BusinessDetailView from "../views/BusinessDetailView.vue"
import BusinessCreateView from "../views/BusinessCreateView.vue"

import axios from "axios"


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true 
    }
  },
  {
    path: '/register',
    name: 'register',
    component: registerView,
    meta: {
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
   
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketOverview,
    meta: {
      requiresAuth: true 
    }
  },
  {
    path: '/createTicket',
    name: 'createTicket',
    component: createTicketView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ticket/:id',
    name: 'ticketDetail',
    component: TicketDetailView,
    props: true,
    meta: {
      requiresAuth: true 
    }
  },
  {
    path: '/business',
    name: 'business',
    component: businessView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresAdmin: true 
    }
    
  },
  {
    path: '/business/:id',
    name: 'businessDetail',
    component: BusinessDetailView,
    props: true,
    meta: {
      requiresAuth: true 
    }
  },
  {
    path: '/business/Create',
    name: 'businessCreate',
    component: BusinessCreateView,
    props: true,
    
  },

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    //Check if current user is Authenticated
    let response = await axios.get("http://localhost:8081/cookieVerify")

    if (response.data) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next("/login");
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
      //get current user role
    let response = await axios.get("http://localhost:8081/cookieinfo")

    if (response.data.roles === 1432) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      alert("You're not authorized to visit this section")
      next("/tickets");
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
