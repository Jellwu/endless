<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="container text-endless">
      <form class="form-signin my-5 ml-auto mr-auto border border-1" @submit.prevent="singIn">
        <h1 class="h3 mb-5 mt-2 font-weight-normal text-warning text-center">管理者 登入</h1>
        <label class="text-left" for="inputEmail">Email address</label>
        <input v-model="user.username" type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required autofocus>
        <label class="text-left" for="inputPassword">Password</label>
        <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-warning btn-block" type="submit">Sign in</button>
      </form>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="resignModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">尚未驗證</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            請重新登入
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LOGIN',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    singIn () {
      const user = this.user
      this.$store.dispatch('loginModules/singin', user)
    }
  },
  computed: {
    ...mapGetters('loginModules', ['isLoading'])
  }
}
</script>

<style lang="scss" scoped>
input{
    margin-bottom: 15px;
}
.container{
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 0px 50px 0px;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 50px 15px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
