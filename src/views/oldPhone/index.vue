<template>
  <div class="body">
    <pubHeader leftType name="手机验证" />
    <div class="cell">
      <span>原手机号：</span>
      <input v-model="phone" placeholder="你的旧手机号" readonly />
    </div>
    <div class="cell">
      <span>验证码：</span>
      <input v-model="verify" placeholder="请输入验证码" />
      <div v-if="outType" class="cell_button" @click="sendOut">获取验证码</div>
      <div v-else class="cell_button">{{ number }}</div>
    </div>
    <div class="button" @click="open">确认验证</div>
  </div>
</template>
<script>
import pubHeader from '@/components/header'
import { sendverify } from '@/api/public'
import { chkPhone } from '@/api/user'

export default {
  components: {
    pubHeader
  },
  data() {
    return {
      phone: this.$route.query.val,
      verify: '',
      outType: true,
      number: 60
    }
  },
  methods: {
    // 发送验证码
    sendOut() {
      if (/^1[345789]\d{9}$/.test(this.phone)) {
        sendverify(this.phone, 1).then((res) => {
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
          this.number = 60
        }
      }, 1000)
    },
    open() {
      if (this.verify) {
        chkPhone({
          verify: this.verify
        }).then((res) => {
          if (res.code === 1) {
            this.$router.push({ name: 'NewPhone' })
          } else {
            this.$toast.fail(res.message)
          }
        })
      } else {
        this.$toast.fail('请输入验证码')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  height: 100vh;
  .cell {
    display: flex;
    align-items: center;
    font-size: $size-large;
    margin: 0 0.53rem;
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
    span {
      width: 2rem;
    }
    input {
      width: 4rem;
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
  .button {
    position: absolute;
    bottom: 0.4rem;
    left: 15%;
    text-align: center;
    margin-top: 1rem;
    border-radius: 1rem;
    width: 70%;
    color: white;
    padding: 0.3rem 0;
    font-size: $size-large;
    background: linear-gradient(245deg, #f95913 0%, #f9b218 100%), linear-gradient(#d30000, #d30000);
  }
}
</style>
