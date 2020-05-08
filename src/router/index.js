import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // 若使用者在網站隨意輸入不存在的分頁，會直接導向首頁
    {
      path: '*',
      redirect: '/'
    },
    // 前台
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/fontend/Home.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/fontend/Profile.vue')
    },
    {
      path: '/productList',
      name: 'Products',
      component: () => import('../views/fontend/Products.vue')
    },
    {
      path: '/productList/:productID',
      name: 'Productsdetail',
      component: () => import('../views/fontend/page/ProductDetail.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/fontend/Cart.vue')
    },
    {
      path: '/cart_info',
      name: 'CartInfo',
      component: () => import('../views/fontend/page/Cart_info.vue')
    },
    {
      path: '/cart_checkout/:orderID',
      name: 'cart_checkout',
      component: () => import('../views/fontend/page/Cart_checkout.vue')
    },
    {
      path: '/cart_orderpay/:orderID',
      name: 'cart_orderpay',
      component: () => import('../views/fontend/page/Cart_orderpay.vue')
    },
    {
      path: '/couponpage',
      name: 'couponpage',
      component: () => import('../views/fontend/Couponpage.vue')
    },
    // 後台管理
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/backend/Login.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/backend/Admin.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'productscheck',
          name: 'Productscheck',
          component: () => import('../views/backend/Dashboard/Productscheck.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/backend/Dashboard/Orders.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: () => import('../views/backend/Dashboard/Coupon.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
