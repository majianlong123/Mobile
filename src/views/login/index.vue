<template>
  <div class="body">
    <pubHeader :noShadow="true"></pubHeader>
    <img class="logo"
      src="@/assets/image/logo.png" />
    <div class="field">
      <img src="@/assets/image/icon/login-account.png" />
      <input v-model="loginForm.UserAccount"
        placeholder="请输入你的账号" />
    </div>
    <div class="field">
      <img src="@/assets/image/icon/login-pwd.png" />
      <input v-model="loginForm.Pwd"
        type="password"
        placeholder="请输入你的密码" />
    </div>
    <div class="fanhui" @click="gohome">
      <span>暂不登录</span>
    </div>
    <!-- <div class="right" @click="open('GetBackPwd')">找回密码</div> -->
    <div class="button">
      <div @click="handleLogin">登录</div>
      <div class="border"
        @click="open('Register')">注册</div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
import pubHeader from '@/components/header'

export default {
  components: {
    pubHeader
  },
  data() {
    return {
      loginForm: {
        UserAccount: '',
        Pwd: ''
      }
    }
  },
  methods: {
    handleLogin() {
      if (!this.loginForm.UserAccount) {
        this.$toast.fail('请输入账号')
      } else if (!this.loginForm.Pwd) {
        this.$toast.fail('请输入密码')
      } else {
        this.$store.dispatch('user/login', this.loginForm).then((res) => {
          console.log(res);
          this.$router.push('/')
        })
        // login(this.loginForm)
        //   .then((res) => {
        //   this.$router.push('/')
        //     console.log(res)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
      }
    },
    open(url) {
      this.$router.push({ name: url })
    },
    gohome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  text-align: center;
}
.logo {
  margin: 1rem 0 0.8rem 0;
  width: 20%;
  height: auto;
}
.field {
  margin: 0.4rem 1.07rem;
  padding: 0.1rem 0.4rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    height: 0.8rem;
    width: auto;
    margin-right: 0.4rem;
  }
  input {
    border: 0;
    font-size: $size-medium;
    &::placeholder {
      color: #ccc;
    }
  }
}
.right {
  margin: 0 1.07rem;
  margin-top: 0.2rem;
  font-size: $size-medium;
  text-align: right;
  color: $color-pl;
}
.button {
  margin-top: 1rem;
  div {
    margin: 0.53rem auto;
    border-radius: 1rem;
    width: 65%;
    color: white;
    padding: 0.3rem 0;
    font-size: $size-large;
    background: #1989fa;
  }
  .border {
    color: white;
    // border: 1px solid  $color-red;
    background: #1989fa73;
  }
}
.fanhui {
  width: 100%;
  text-align: right;
}
.fanhui span {
  font-size: 14px;
  color: #ccc;
  margin-right: 50px;
}
</style>
