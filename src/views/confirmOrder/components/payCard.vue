<template>
  <div class="pay">
    <van-radio-group v-model="radio" @change="onChange">
      <!-- <div class="item">
        <img src="@/assets/image/icon/zfb.png" />
        <span class="color-zfb">支付宝</span>
        <van-radio name="zfb" class="right" checked-color="#f95913"></van-radio>
      </div>-->
      <div class="item">
        <img src="@/assets/image/icon/wx.png" />
        <span class="color-wx">微信</span>
        <van-radio name="wx" class="right" checked-color="#f95913"></van-radio>
      </div>
    </van-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 'wx'
    }
  },
  methods: {
    onChange(val) {
      this.$emit('switchPay', val)
    }
  }
}
</script>
<style lang='scss' scoped>
.pay {
  margin: 0.2rem;
  background: white;
  border-radius: 0.2rem;
  // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);
  .item {
    display: flex;
    align-items: center;
    padding: 0.4rem 0.27rem;
    border-bottom: 1px solid #e6e6e6;
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
}
</style>
