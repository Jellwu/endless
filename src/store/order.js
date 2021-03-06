import axios from 'axios'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orderId: '',
    order: {
      user: {}
    },
    orders: {},
    page: {}
  },
  mutations: {
    ORDERID (state, payload) {
      state.orderId = payload
    },
    GETORDER (state, payload) {
      state.order = payload
    },
    GETORDERLIST (state, payload) {
      state.orders = payload
    },
    GETPAGE (state, payload) {
      state.page = payload
    }
  },
  actions: {
    cartCheckout (context, order) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      context.dispatch('updateLoading', true, { root: true })
      axios.post(url, { data: order }).then((response) => {
        if (response.data.success) {
          context.dispatch('updateLoading', false, { root: true })
          context.commit('ORDERID', response.data.orderId)
          router.push(`/cart_checkout/${response.data.orderId}`)
        }
      })
    },
    getOrder (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('GETORDER', response.data.order)
        }
      })
    },
    payOrder (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`
      axios.post(url).then((response) => {
        if (response.data.success) {
          router.push(`/cart_orderpay/${id}`)
        }
      })
    },
    getOrderList (context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('GETORDERLIST', response.data.orders)
          context.commit('GETPAGE', response.data.pagination)
        }
      })
    }
  },
  getters: {
    Order (state) {
      return state.order
    },
    Orders (state) {
      return state.orders
    },
    pages (state) {
      return state.page
    }
  }
}
