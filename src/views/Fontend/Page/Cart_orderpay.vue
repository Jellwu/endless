<template>
  <div>
    <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
    <div class="customform-banner d-flex align-items-center justify-content-center mb-5">
      <div>
        <h1 class="text-endless">訂單查詢</h1>
      </div>
    </div>
    <div class="container my-5">
      <div class="row d-flex d-flex justify-content-between align-items-center mt-5">
        <div class="col-md-8">
          <h2 class="text-white carts-check-title ml-2">
            Final Step. 訂單查詢
          </h2>
        </div>
        <div class="col-md-4">
          <div class="pay-process">
            <ul class="d-flex justify-content-between">
              <li class="pay-process-1 complited-1"></li>
              <li class="pay-process-2 complited-2"></li>
              <li class="pay-process-3 complited-3"></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center my-5">
        <div class="col-md-5 d-flex flex-column">
          <div class="col mb-4">
            <div class="h2 bg-warning text-dark text-center py-3">
              貨運明細
            </div>
            <div class="bg-orders text-endless cartOrder-content">
              <p>
                <span class="pr-2">收件人姓名:</span>
                <span>{{ Order.user.name }}</span>
              </p>
              <p>
                <span class="pr-2">收件人電郵:</span>
                <span>{{ Order.user.email }}</span>
              </p>
              <p>
                <span class="pr-2">聯絡電話:</span>
                <span>{{ Order.user.tel }}</span>
              </p>
              <p>
                <span class="pr-2">寄送地址:</span>
                <span>{{ Order.user.address }}</span>
              </p>
              <p>
                <span>備註:</span><br>
                <span>{{ Order.message }}</span>
              </p>
            </div>
          </div>

          <div class="col mb-4">
            <div class="h2 bg-warning text-dark text-center py-3">
              訂單摘要
            </div>
            <div class="bg-orders text-endless py-3">
              <p class="cartOrder-content">
                <span>訂單編號:</span>
                <span style="font-size:18px">{{ Order.id }}</span>
              </p>
              <p class="cartOrder-content">
                <span>付款狀態:</span>
                <span class="text-success" v-if="Order.is_paid === true">
                  已完成付款
                </span>
                <span class="text-danger" v-else-if="Order.is_paid === false">
                  尚未完成付款
                </span>
              </p>
              <p class="cartOrder-content">
                <span>訂單總價:</span>
                <span>{{ Order.total | currency }}</span>
              </p>
            </div>
          </div>

          <div class="col">
            <div class="h2 bg-warning text-dark text-center py-3">
              訂購明細
            </div>
            <div class="bg-orders text-endless py-4">
              <div class="row d-flex justify-content-center py-2 cartOrder-content" v-for="items in Order.products" :key='items.id'>
                <div class="col-5">
                  <img :src="items.product.imageUrl" class="img-fluid rounded" alt="...">
                </div>
                <div class="col-7 d-flex flex-column justify-content-center" style="font-weight:bold;">
                  <p>{{ items.product.title }}</p>
                  <p>{{ items.qty }} {{ items.product.unit }}</p>
                  <p v-if="items.final_total === items.total">
                    {{ items.total | currency }}
                  </p>
                  <p v-else-if="items.final_total !== items.total">
                    <del>{{ items.total | currency }}</del><br>
                    <span class="h5 text-success mr-2">{{ items.final_total | currency }}</span>
                    <small class="text-white text-center shadow-none badge badge-success">
                      折扣價
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 md-spacing">
          <div class="sticky-top">
            <div class="col">
              <div class="bg-orderpay d-flex justify-content-center align-items-center"
              v-if = "Order.is_paid">
                訂單付款完成
              </div>
              <div class="d-flex justify-content-center align-items-center"
              v-if ="!Order.is_paid">
                訂單尚未付款完成
              </div>
            </div>
            <div class="col mt-3">
              <button type="button" name="button" class="goProducts btn-block btn-warning">
                <router-link href="#" to="/productList" class="py-3 h2 text-dark">
                  回到產品頁
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'Product',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('orderModules', ['Order']),
    ...mapGetters('cartModules', ['cart']),
    ...mapGetters(['isLoading'])
  },
  methods: {
    getOrder () {
      const id = this.orderId
      this.$store.dispatch('orderModules/getOrder', id)
    },
    gocheck () {
      const id = this.orderId
      this.$router.push(`/cart_checkout/${id}`)
    }
  },
  created () {
    this.orderId = this.$route.params.orderID
    this.getOrder()
  }
}
</script>
<style scpoed>
.goProducts a {
  display: block;
  text-decoration: none;
  color: #343a40
}

.customform-banner {
  background-image: url('https://images.unsplash.com/photo-1580112646171-13522164ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 300px;
}
</style>
