<template>
  <div class="container">
    <div class="title">
      <div class="info">
        <div class="img" @click="open">
          <img src="@/assets/image/my/cate.png" alt="">
          <p>{{user.name}}</p>
        </div>
      </div>
    </div>

    <div class="notice" @click="noticeClick">
      <img src="@/assets/image/icon/gg.png" alt="">
      <p>平台公告~好消息好消息~</p>
    </div>
 
    <list/>
  </div>    
</template>
<script>
import { info,} from '@/api/user'

import list from './components/list'

export default {
  components: {
    list,
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    // 判断token有没有过期也就是判断有没有登录
    // if (this.$store.getters.loginType == true) {
    //   this.getData()
    // } else {
    //   this.$router.push({
    //     path:'/login'
    //   })
    // }
    // this.getData()
  },
  computed: {

    loginType() {
      return this.$store.getters.loginType
    },
  },
  mounted() {
    // 判断token有没有过期也就是判断有没有登录
    // if (this.$store.getters.loginType == true) {
    //   this.getData()
    // } else {
    //   this.$router.push({
    //     path:'/login'
    //   })
    // }
    this.getData()
  },
  methods: {
    getData() {
      info()
        .then((res) => {
          this.user = res.values.baseInfo;
        })
        .catch(() => {
          this.user = {}
        })
    },
    open() {
      this.$router.push({name: 'ChangeInfo'})
    },
    noticeClick(){
      this.$router.push({name: 'NoticeList'})
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  .title{
    margin:auto;
    padding: .5625rem;
    box-sizing: border-box;
    box-shadow:0px 2px 12px rgba(0, 0, 0, 0.1);
    height: 5.34375rem;
    text-align: center;
    background: $color-orange;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-top: .5625rem;
   .info{
     display: flex;
     justify-content: center;
     align-items: center;
     .img{
        padding: .1rem;
        border-radius: 50%;
        width: 2.125rem;
        height: 2.125rem;
        margin-left: 3.5rem;
        margin-bottom: 1rem;
      }
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      p{
        // color: #fff;
        font-size: $size-large;
        // margin-left: .5rem;
      }
    }
    .icon{
      font-size: $size-small;
      // color: #fff;
    }
  }

  .notice{
    background: #fff;
    box-shadow:0px 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: .375rem;
    height: 1.84375rem;
    display: flex;
    // justify-content: center;
    align-items: center;
    transform: translate(0, -50%);
    position: relative;
    margin: 0 .36875rem;
    font-size: $size-large;
    // color: $color-red;
    img{
      width: .84375rem;
      height: .84375rem;
      margin: 0 .3125rem 0 .46875rem;
    }
  }
}
</style>
