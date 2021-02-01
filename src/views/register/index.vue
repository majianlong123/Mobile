<template>
  <div>
    <pubHeader leftType name="注册"></pubHeader>
    <div class="cell">
      <img src="@/assets/image/icon/register-name.png" />
      <input v-model="nickname" placeholder="请输入昵称" />
    </div>
    <div class="cell">
      <img src="@/assets/image/icon/register-phone.png" />
      <input v-model="phone" placeholder="请输入账号" />
    </div>
    <!-- <div class="cell">
      <img src="@/assets/image/icon/register-code.png" />
      <input v-model="verify" placeholder="请输入验证码" />
      <div v-if="outType" class="cell_button" @click="sendOut">获取验证码</div>
      <div v-else class="cell_button">{{ number }}</div>
    </div> -->
    <div class="cell">
      <img src="@/assets/image/icon/register-pwd.png" />
      <input v-model="password" type="password" placeholder="请输入你的密码" />
    </div>
    <div class="cell">
      <img src="@/assets/image/icon/register-pwd.png" />
      <input v-model="confirmPwd" type="password" placeholder="请确定你输入的密码" />
    </div>
    <div class="tips">
      注册代表你已阅读并同意
      <span @click="open">《用户注册协议》</span>
    </div>
    <div class="button" @click="register">注册</div>
  </div>
</template>
<script>
import pubHeader from '@/components/header'
import { sendverify } from '@/api/public'
import { register } from '@/api/user'
export default {
  components: {
    pubHeader
  },
  data() {
    return {
      nickname: '',
      phone: '',
      verify: '',
      password: '',
      confirmPwd: '',
      outType: true, // 是否显示验证码按钮
      number: 5 // 验证码间隔,
    }
  },
  methods: {
    // 发送验证码
    sendOut() {
      if (!this.phone) {
        this.$toast.fail('请输入手机号')
        return
      }
      if (/^1[345789]\d{9}$/.test(this.phone)) {
        sendverify(this.phone, 2).then((res) => {
          if (res.code === 1) {
            this.times()
            this.$toast.success('发送成功')
          } else {
            this.$toast.fail(res.msg)
          }
        })
      } else {
        this.$toast.fail('手机格式不正确')
      }
    },
    // 验证码时间
    times() {
      this.outType = false
      var time = setInterval(() => {
        if (this.number !== 1) {
          this.number -= 1
        } else {
          clearInterval(time)
          this.outType = true
          this.number = 5
        }
      }, 1000)
    },
    register() {
      let tips = ''
      if (!this.nickname) {
        tips = '请输入昵称'
      } else if (!this.phone) {
        tips = '请输入账号'
      } 
      // else if (!this.verify) {
      //   tips = '请输入验证码'
      // } 
      else if (!this.password) {
        tips = '请输入密码'
      } else if (this.password !== this.confirmPwd) {
        tips = '两次密码不相同'
      } else {
        register({ Name: this.nickname, UserAccount: this.phone, Pwd: this.confirmPwd }).then((res) => {
          if (res.success) {
            this.$toast.success('注册成功')
            setTimeout(() => {
              return this.$router.push({ name: 'Login' });
            }, 300)
          } else {
            tips = res.msg
          }
        })
      }
      if (tips) {
        this.$toast.fail(tips)
      }
    },
    // 用户协议
    open() {
      this.$router.push({ name: 'LogonNotice', query: { type: 'single_page_article' } })
    }
  }
}
</script>
<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  font-size: $size-medium;
  margin: 0 0.53rem;
  padding: 0.4rem;
  border-bottom: 1px solid #eee;
  img {
    width: 0.5rem;
    height: auto;
    margin-right: 0.4rem;
  }
  input {
    border: 0;
    &::placeholder {
      color: #ccc;
    }
  }
  &_button {
    width: 2rem;
    text-align: center;
    padding: 0.1rem 0;
    border-radius: 0.2rem;
    color: #f95913;
    border: 1px solid #f95913;
    font-size: $size-small;
    margin-left: auto;
  }
}
.tips {
  margin-top: 0.8rem;
  text-align: center;
  font-size: $size-small;
  color: $color-pl;
  span {
    color: #F9DE4A;
  }
}
.button {
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 1rem;
  width: 70%;
  color: white;
  padding: 0.3rem 0;
  font-size: $size-large;
  background: #1989fa73;
}
</style>
