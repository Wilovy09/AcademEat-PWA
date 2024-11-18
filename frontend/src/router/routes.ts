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
        path: 'store/:id',
        name: 'store',
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
      {
        path: '/:storeId/add-product',
        name: 'add-product',
        component: () => import('@/views/ProductForm.vue'),
      },
      {
        path: '/product/:productId',
        name: 'view-product',
        component: () => import('@/views/FindProductView.vue'),
      },
      {
        path: '/:storeId/edit-product/:productId',
        name: 'edit-product',
        component: () => import('@/views/EditProductView.vue'),
      },
      {        
        path: '/products/categories/:category',
        name: 'view-category',
        component: () => import('@/views/ProductsByCategoryView.vue'),
      },
    ],
  },
]
