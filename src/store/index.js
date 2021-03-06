import Vue from 'vue'
import Vuex from 'vuex'

// 將products模組輸入到index.js
import productsModules from './products'
import cartModules from './cart'
import loginModules from './login'
import couponModules from './coupon'
import orderModules from './order'

Vue.use(Vuex)

// Loading放在最外層
export default new Vuex.Store({
  state: {
    isLoading: false,
    isCartmessage: {
      state: false,
      msg: ''
    }
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    CARTMESSAGE (state, payload) {
      state.isCartmessage = payload
    },
    REMOVEMSG (state, payload) {
      state.isCartmessage = payload
    }
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    },
    cartMessage (context, payload) {
      context.commit('CARTMESSAGE', payload)
      context.dispatch('removeMsg', { state: false, msg: '' })
    },
    removeMsg (context, payload) {
      // 在1500毫秒後把false塞回isCartmessage
      setTimeout(() => {
        context.commit('REMOVEMSG', payload)
      }, 1500)
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    isCartmessage (state) {
      return state.isCartmessage
    }
  },
  modules: {
    productsModules,
    cartModules,
    loginModules,
    couponModules,
    orderModules
  }
})
