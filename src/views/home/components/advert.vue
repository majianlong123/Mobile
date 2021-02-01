<template>
  <div class="block">
    <div class="block_left" @click="jumpToDetail(list.target_id0)">
      <img :src="list.picurl0" v-if="list.picurl0" />
    </div>
    <div class="block_right" v-if="list.picurl1 || list.picurl1">
      <div class="item" v-if="list.picurl1" :style="`background:url(${list.picurl1})`" @click="jumpToDetail(list.target_id1)"></div>
      <div class="item" v-if="list.picurl2" :style="`background:url(${list.picurl2})`" @click="jumpToDetail(list.target_id2)"></div>
    </div>
  </div>
</template>
<script>
import { advert } from '@/api/home'
export default {
  data() {
    return {
      list: {
        picurl0: '',
        target_id0: null,
        picurl1: '',
        target_id1: null,
        picurl2: '',
        target_id2: null
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      advert(3, 'advert').then((res) => {
        console.log(res.data.list)
        for (let index = 0; index < res.data.list.length; index++) {
          this.list['picurl' + index] = res.data.list[index].picurl
          this.list['target_id' + index] = res.data.list[index].target_id
        }
        console.log(this.list.picurl0)
      })
    },
    jumpToDetail(id) {
      this.$router.push({ name: 'GoodsDetails', query: { goodsId: id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.block {
  display: flex;
  height: 3.87rem;
  align-items: center;
  &_left {
    margin-right: 0.2rem;
    flex: 1;
    height: 100%;
    img {
      border-radius: 0.2rem;
      width: 100%;
      height: 100%;
    }
  }
  &_right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item {
      flex: 1;
      background-size: 100% 100% !important;
      &:first-child {
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
