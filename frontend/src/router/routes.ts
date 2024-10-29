export const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
  },
  {
    path: '/',
    name: 'home-layout',
    meta: { requiresAuth: true },
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'store',
        name: 'my-store',
        component: () => import('@/views/MyStoreView.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/AccountView.vue'),
      },
      {
        path: 'create-store',
        name: 'create-store',
        component: () => import('@/views/SellerFormView.vue'),
      },
    ],
  },
]
