<template>
  <div id="productDetail" class="container">
    <cartMessage></cartMessage>
    <div class="spacing"></div>
    <div class="row">
      <div class="col-lg-6 d-flex justify-content-center">
        <img class="img-fluid rounded" :src="productDetail.imageUrl" alt="">
      </div>
      <div class="col-lg-6 d-flex flex-column justify-content-around">
        <div class="text-endless">
          <h2 class="my-3">
            <span><i class="fas fa-crown text-warning"></i></span>
            {{ productDetail.title }}
          </h2>
          <p class="mb-2" style="text-indent : 2em;">{{ productDetail.content }}</p>
          <p style="text-indent : 2em;">{{ productDetail.description }}</p>
          <div class="text-right mb-4">
            <del class="font-weight-lighter"><span class="my-2">原價：{{ productDetail.origin_price | currency }}</span></del><br>
            <span class="h4 text-warning font-weight-bolder">特價:{{ productDetail.price | currency }}</span>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <div class="input-group" style="width:100%">
            <select class="custom-select border border-warning text-dark form-control" id="inputGroupSelect04" v-model="productNum">
              <option :value="0" selected disabled>--請選購數量--</option>
              <option :value="Num" v-for="Num in 10" :key='Num'>
                選購 {{ Num }} {{ productDetail.unit }}
              </option>
            </select>
            <div class="input-group-append text-right">
              <button class="btn btn-outline-warning" type="button" :disabled="productNum === 0" :class="{ 'discursor': productNum === 0 }" @click.prevent='addtoCart(productDetail.id, productNum)'>
                購物車 <i class="fas fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="text-warning font-weight-bolder text-right" style="height:25px">
          <span v-if="subtotal">小計：{{ subtotal | currency }}</span>
        </div>
      </div>
    </div>
    <div class="px-5 my-4"></div>
    <adList></adList>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import cartMessage from '@/components/CartMessage.vue'
import adList from '@/components/AdList.vue'

export default {
  name: 'Product',
  data () {
    return {
      productNum: 0
    }
  },
  computed: {
    ...mapGetters('productsModules', ['productDetail']),
    ...mapGetters('cartModules', ['cart']),
    ...mapGetters(['isLoading']),
    subtotal () {
      const data = this.productDetail.price * this.productNum
      return data
    }
  },
  methods: {
    getProducts (pages = 1) {
      this.$store.dispatch('productsModules/getProducts', pages)
    },
    getProductDetail (id) {
      this.$store.dispatch('productsModules/getproductDetail', id)
    },
    addtoCart (id, qty = 1) {
      // 判斷購物車是否有重複的資料: 有的話重新給一個新的數量，無則直接新增一筆到購物車
      const vm = this
      const duplicatdItem = vm.cart.carts.filter(items => items.product_id === id)
      if (duplicatdItem.length > 0) {
        const sameItem = duplicatdItem[0]
        const originCartId = sameItem.id
        const originProductId = sameItem.product.id
        const newQty = parseInt(sameItem.qty) + parseInt(qty)
        vm.$store.dispatch('cartModules/updateCartQty', {
          originCartId,
          originProductId,
          newQty
        })
      } else {
        vm.$store.dispatch('cartModules/addtoCart', {
          id,
          qty
        })
      }
    }
  },
  // 監控 route的變化：當路徑有改變的時候，重新去渲染網頁的內容
  watch: {
    $route (to, from) {
      this.getProductDetail(to.params.productID)
    }
  },
  components: {
    cartMessage,
    adList
  },
  created () {
    this.getProducts()
    const productId = this.$route.params.productID
    this.getProductDetail(productId)
  }
}
</script>
