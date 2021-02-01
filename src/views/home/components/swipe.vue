
<template>
  <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item class="bck" v-for="(item,index) in list" :key="index" @click="jumpToDeatail(item.module, item.refId, item.refId, item.title)">
      <img :src="item.hostPic" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import { advert } from '@/api/home'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      advert().then((res) => {
        this.list = res.value;
      })
    },
    jumpToDeatail(type, merchantId, merchantType, title) {
      let name;
      if(type == 'Type'){
        name = 'Category'
      }else{
        name = type == 'List' ? 'GoodsList' : 'GoodsDetails'
      }
      this.$router.push({ name, query: { merchantId, merchantType, name: title } });
    }
  }
}
</script>
<style lang='scss' scoped>
.swipe {
  // padding: 0 .71875rem;
  // width: 10.21875rem;
  // box-sizing: border-box;
  margin-top: .28125rem;
  height: 3.65625rem;
  border-radius: 0.2rem;
}
.bck {
  padding: 0 .3rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
