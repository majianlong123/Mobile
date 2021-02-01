<template>
  <div class="wrap">
    <div class="list">
      <div class="list-item" v-for="item in list" :key="item.cate_id" @click="itemClick">
        <img :src="item.thumb" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {cate} from '@/api/home'
export default {
  data(){
    return{
      list: [],
    }
  },
  created(){
    this.getData();
  },
  methods:{
    async getData(){
      const {data: res} = await cate(4);
      this.list = res.list;
      console.log(res);
    },
    itemClick(){
      this.$router.push({name: 'Category', query: {}})
    }
  }
}
</script>


<style lang="scss" scoped>
.wrap{
  margin-top: .3125rem;
  width: 100%;
  padding: 0 .875rem;
  box-sizing: border-box;
  .list{
    display: flex;
    font-size: $size-medium;
    justify-content: space-between;
    align-items: center;
    &-item{
      width: 1.84375rem;
      text-align: center;
      img{
        width: 1.84375rem;
        height: 1.84375rem;
      }
    }
  }
}
</style>

