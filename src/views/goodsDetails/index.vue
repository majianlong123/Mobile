<template>
  <div class="container">
    <pubHeader :name="info.name" :leftType="leftType"></pubHeader>
    <div class="wrap">
      <div class="banner">
        <img :src="info.icon" alt="">
      </div>
      <div class="info">
        <div class="title">
          <h2>{{info.name}}</h2>
          <div class="collection" @click="collectionClick">
            <img v-if="info.isCollections" src="@/assets/image/icon/sc.png" alt="">
            <img v-else src="@/assets/image/icon/sc-a.png" alt="">
          </div>
        </div>
        <div class="place" v-if="distanceStr !== '0m'">
          <P>{{info.address}}</P>
          <div @click.stop="openMap">
            <img src="@/assets/image/icon/gps.png" alt=""><span>{{distanceStr}}</span>
          </div>
        </div>
        <div class="tel">
          电话：{{info.mobile}}
        </div>
      </div>
      <div class="biaoti">
        <p>店铺详情</p>
      </div>
      <div class="content" v-html="info.description">
      </div>

      <div class="map">
        
      </div>

      <div class="contact" @click="tel">
        联系电话<span>{{info.mobile}}</span>
      </div>
    </div>

    
  </div>
</template>

<script>
import {details, collection} from '@/api/goodsDetails'

import pubHeader from '@/components/header'

export default {
  components:{
    pubHeader,
  },
  data(){
    return {
      leftType: true,
      isShowAC: false,
      info: {},
      name: '',
      merchantId: '',
      distanceStr: '',
      mobile: ''
    }
  },
  created(){
    console.log(this.$route.query); 
    const {merchantId, distanceStr, name} = this.$route.query; 
    this.name = name;
    this.merchantId = merchantId;
    this.distanceStr = distanceStr;
    this.getDetails(merchantId, distanceStr);
  },
  methods: {
    async getDetails(merchantId){
      const res = await details({merchantId});
      this.info = res.value;
      // 电话
      this.mobile = res.value.mobile
      console.log(this.info);
    },
    openMap(){
      this.$router.push({name: 'Map', query:{
        position: this.info.latLog.split(','), name: this.info.name
        },params: {
          detail: [`电话：${this.info.mobile}`, `地址：${this.info.address}`]
        }});
    },
    async collectionClick(){
      // 判断是否登录
      if (this.$store.state.user.loginType == true) {
        if(this.info.isCollections){
          const confirm = await this.$dialog.confirm({
            title: '提示',
            message: '是否取消收藏'
          }).catch(()=>{});
          if(!confirm) return;
        }
        await collection({merchantId: this.info.id});
        this.getDetails(this.merchantId , this.distanceStr);
      } else {
        this.$router.push({ name: 'Login' })
      }
      // await collection({merchantId: this.info.id});
      // this.getDetails(this.merchantId , this.distanceStr);
      // this.isShowAC = !this.isShowAC;
    },
    tel() {
      window.location.href = 'tel:'+ this.mobile
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  overflow-x: hidden;
  .wrap{
    .banner{
      // height:8.1875rem;
      img{
        width: 100%;
      }
    }

    .info{
      margin-top: .3125rem;
      padding: 0 .3975rem;
      .title{
        display: flex;
        justify-content: space-between;
        h2{
          font-size: $size-thirty-six;
          color: #333;
        }
        img{
          width: .578438rem;
          height: .578438rem;
        }
      }
    }
    .biaoti {
      text-align: center;
      font-size: 24px;
      float: left;
      width: 100%;
      padding-top: 20px;
    }
    .place{
      display: flex;
      justify-content: space-between;
      font-size: $size-small;
      margin: .1rem 0;
      p{
        color: #9A9A9A;
      }
      div{
        display: flex;
        align-items: center;
        // justify-content: space-between;
        img{
          width: .336875rem;
          height: .403438rem;
          margin-right: .16875rem;
        }
        span{
          color: #333;
        }
      }
    }

    .tel{
      font-size: $size-small;
      color: #9A9A9A;
      margin-bottom: .3125rem;
    }

    .content{
      width: 100%;
      border-top: .34375rem solid #F1F1F1;
      // padding:  .3125rem;
      ::v-deep img{
        width: 100% ;
        height: 100% ;
      }
     ::v-deep p:first-child {
        text-align: center;
        padding-top: 30px;
        
      }
      ::v-deep p{
        font-size: 15px;
      }
    }
    .contact{
      position:fixed;
      width: 6rem;
      left:18%; 
      bottom:0px;
      margin: .40625rem;
      border-radius:.5625rem;
      height:1.125rem;
      font-size: $size-large;
      background: #f9de4a;
      text-align: center;
      line-height: 1.125rem;
      span{
        margin-left: .1rem;
      }
    }
  }

  
}
</style>
