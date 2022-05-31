
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '/lab', component: () => import('pages/LabFirst.vue') }
    ]
  },
  {
    path: '/lab2',
    component: () => import('pages/LabFirst')
  },
  {
    path: '/lab3',
    component: () => import('pages/LabSecond')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
