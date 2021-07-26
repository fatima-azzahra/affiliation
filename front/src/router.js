import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Create Links',
          path: 'links/create',
          component: () => import('@/views/dashboard/pages/createLink'),
        },
        // Pages
        
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'clicks',
          path: 'clicks',
          component: () => import('@/views/dashboard/pages/Clicks'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Links',
          path: 'links',
          component: () => import('@/views/dashboard/pages/Listlinks'),
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Earning',
          path: 'earning',
          component: () => import('@/views/dashboard/pages/Listearning'),
        },
        {
          name: 'withdrawals',
          path: 'withdrawals',
          component: () => import('@/views/dashboard/pages/withdrawals'),
        },
        {
          name: 'paypal',
          path: 'withdrawals/paypal',
          component: () => import('@/views/dashboard/pages/paypal'),
        },
      
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
        
      ],
      
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index2'),
      children: [
        // Dashboard
        {
          name: 'Login',
          path: 'users/login',
          component: () => import('@/views/dashboard/pages/login'),
        },
        {
          name: 'register',
          path: 'users/register',
          component: () => import('@/views/dashboard/pages/register'),
        },
        {
          name: 'Forgot',
          path: 'forgot',
          component: () => import('@/views/dashboard/pages/forgot'),
        },
        {
          name: 'Reset',
          path: '/reset/:token',
          component: () => import('@/views/dashboard/pages/reset'),
        },
        {
          name: 'Virefication',
          path: 'users/verefication/:token',
          component: () => import('@/views/dashboard/pages/Verefication'),
        },
        {
          name: 'VereficationNewEmail',
          path: 'users/verefication-profile/:token',
          component: () => import('@/views/dashboard/pages/ActivateNewEmail'),
        }, 
  ],
},]
})
