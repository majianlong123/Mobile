<template>
  <div class="wrapper_notice_Banner">
    <div class="nitoceBanner">
      <div class="nifirst">
        <img src="@/assets/image/icon/gg.png" alt="">
      </div>
      <div class="nitoceTitle">
        <van-swipe style="height: .6rem;"
          :touchable="false"
          vertical
          :autoplay="3000"
          :show-indicators="false">
          <van-swipe-item v-for="(item,index) in theArticleList"
            :key="index">
            <div class="titleNt">{{item.title}}</div>
            <!-- <div class="spantitle" >{{initialTime(item.create_time)}}</div> -->
            </van-swipe-item>
        </van-swipe>
        
      </div>
    </div>
  </div>
</template>

<script>
import { article } from '@/api/home'

export default {
  data() {
    return {
      theArticleList: [],
      page: 1
    }
  },
  watch: {},
  computed: {
    // initialTime(){
    //   return function(time){
    //     return time.substring(5, time.length - 3)
    //   }
    // }
  },
  methods: {
    openPage(page, id) {
      this.$router.push({
        name: page,
        query: {id: id}
      })
    },
    async getData(){
      const res = await article();
      this.theArticleList = res.value.data;
    }
  },
  created() {
    this.getData()
  },
}
</script>
<style lang="scss" scoped>
.nitoceBanner {
  margin-top: .34375rem;
  border-top: 1px solid #F5F5F5;
  border-bottom: 1px solid #F5F5F5;
  box-shadow: 0 1px .5px .5px rgba(0, 0, 0, .05);
  padding: .21875rem 0rem;
  padding-left: 0.3rem;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: .346667rem;
  color: #333;
  background: #fff;
  .nifirst {
    display: flex;
    margin-right: .2rem;
    img {
      width: .514062rem;
      height: .4975rem;
    margin-right: .2rem;
    }
    span{
      color: $color-red;
    }
  }
  .nitoceTitle {
    flex: 1;
    // vertical-align: middle;
    .van-swipe-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .titleNt {
      width: 8rem;
      // line-height: .6rem;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span{
        color: $color-red;
      }
    }
    .spantitle {
      padding-right: 0;
      color: #ccc;
      text-align: right;
      span{
        vertical-align: middle;
      }
      i {
        vertical-align: middle;
      }
    }
  }
  
}
</style>