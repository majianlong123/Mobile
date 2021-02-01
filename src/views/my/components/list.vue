<template>
  <div class="list">
    <div class="list-item" v-for="item in list" :key="item.id" @click="itemClick(item.name, item.type)">
      <img :src="item.icon" alt="">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [{
        icon: require('@/assets/image/icon/sc.png'),
        id: 1,
        title: '我的收藏',
        name: 'Collection'
      },
      {
        icon: require('@/assets/image/icon/lx.png'),
        id: 2,
        title: '联系平台',
        name: 'LogonNotice',
        type: 'contact_us'
      },
      {
        icon: require('@/assets/image/icon/ll.png'),
        id: 3,
        title: '浏览记录',
        name: 'Browse'
      }]
    }
  },
  methods: {
    itemClick(name, type){
      this.$router.push({name, query: {type}});
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  display: flex;
  justify-content: space-around;
  margin: 0 .46875rem;
  box-shadow:0px 2px 12px rgba(0,0,0,0.1);
  border-radius:12px;
  // color: $color-red;
  &-item{
    text-align: center;
    img{
      width: 0.8rem;
      height: 0.8rem;
      margin: .3125rem 0;
    }
    p{
      font-size: 0.4rem;
      margin: .125rem 0 .3125rem .2rem;
    }
  }
}
</style>


