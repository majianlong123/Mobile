<template>
  <div class="wrapper" @click="open">
    <img src="@/assets/image/icon/gps.png" />
    <div class="title" v-if="JSON.stringify(address) != '{}'">
      <p>{{ address.linkman }}&nbsp;{{address.contact}}</p>
      <p>{{ address.address }}{{ address.address_detail }}</p>
    </div>
    <div class="title" v-else>
      <p>你还没有设置收货地址</p>
    </div>
    <van-icon name="arrow" class="icon" />
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    console.log(this.address)
  },
  methods: {
    open() {
      this.$router.push({ name: 'Address', query: { type: true } })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  margin: 0.2rem;
  padding: 0.4rem;
  background: white;
  border-radius: 0.2rem;
  // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);
  .title {
    p:first-child {
      font-size: $size-medium;
      color: #000;
    }
    p {
      color: $color-pl;
      font-size: $size-small;
      margin: 0.2rem 0;
    }
  }
  img {
    width: 0.5rem;
    height: auto;
    // border-radius: 50%;
    margin-right: 0.4rem;
  }
  .icon {
    margin-left: auto;
    color: $color-pl;
    font-size: $size-king;
  }
}
</style>
