<template>
  <div>
    <van-popup v-model="show" position="bottom" @close="$emit('close')">
      <div class="money">{{money}}</div>
      <div class="pay">
        <van-radio-group v-model="radio">
          <!-- <div class="item">
            <img src="@/assets/image/icon/zfb.png" />
            <span class="color-zfb">支付宝</span>
            <van-radio name="ali" class="right" checked-color="#f95913"></van-radio>
          </div>-->
          <div class="item">
            <img src="@/assets/image/icon/wx.png" />
            <span class="color-wx">微信</span>
            <van-radio name="wx" class="right" checked-color="#f95913"></van-radio>
          </div>
        </van-radio-group>
      </div>
      <div class="button" @click="pay">立即支付</div>
    </van-popup>
  </div>
</template>
<script>
// import { pay } from '@/api/public'
import payClass from '@/utils/pay'

export default {
  props: {
    money: {
      type: String,
      default: ''
    },
    id: [String, Number]
  },
  data() {
    return {
      radio: 'wx',
      show: true
    }
  },
  methods: {
    pay() {
      payClass.switchPay(this.id, this.radio).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.money {
  text-align: center;
  padding-top: 0.4rem;
  font-size: 0.64rem;
  font-weight: 600;
  color: $color-money;
}
.pay {
  margin: 0.53rem;
  //   padding: 0.4rem;
  //   background: white;
  //   border-radius: 0.2rem;
  //   box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  .item {
    display: flex;
    align-items: center;
    padding: 0.4rem 0.27rem;
    // border-bottom: 1px solid #e6e6e6;
    font-size: $size-medium;
    img {
      width: 0.53rem;
      height: auto;
      margin-right: 0.4rem;
    }
    .right {
      margin-left: auto;
    }
  }
  .item:first-child {
    border-bottom: 1px solid #e6e6e6;
  }
}
.button {
  margin: 0.53rem auto;
  border-radius: 1rem;
  width: 90%;
  text-align: center;
  color: white;
  padding: 0.3rem 0;
  font-size: $size-large;
  background: linear-gradient(245deg, #f95913 0%, #f9b218 100%), linear-gradient(#d30000, #d30000);
}
</style>
