import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'

import Layout from '@/views/Layout/index.vue'
import NewAdmin from '@/views/NewAdmin/index.vue'
import addNews from '@/views/NewAdmin/addNews.vue'
import editNews from '@/views/NewAdmin/editNews.vue'
import editCategory from '@/views/NewAdmin/editCategory.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/NewAdmin',
      component: NewAdmin,
      children: [
        {
          path: '/NewAdmin/AddNews',
          component: addNews
        },
        {
          path: '/NewAdmin/EditNews',
          component: editNews
        },
        {
          path:'/NewAdmin/EditCategory',
          component:editCategory
        }
      ]

    }

  ]
})

export default router
