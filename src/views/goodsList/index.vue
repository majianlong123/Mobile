<template>
  <div class="container">
    <pubHeader :name="name" :leftType="leftType"></pubHeader>
    <!-- <div class="wrap">
      <div class="screen" @click="screenClick">
      地区筛选
      </div> -->
      <van-dropdown-menu >
        <van-dropdown-item v-model="value1" :options="option1" @change="areaChange" />
        <van-dropdown-item v-model="value2" :options="option2" @change="dropdownChange"  />
      </van-dropdown-menu>
    <!-- </div> -->

    <van-popup v-model="showPopup" position="bottom"  :style="{ height: '50%',width: '100%' }" >
      <van-area title="请选择地区" :area-list="areaList" />
    </van-popup>
    
    <goodsList ref="goodsList" />
  </div>
</template>
 
<script>
import pubHeader from '@/components/header'
import goodsList from '@/components/goodsList'

import {region} from '@/api/goodsList'

export default {
  components:{
    pubHeader,
    goodsList
  },
 
  data(){
    return {
      leftType: true,
      showPopup: false,
      name: '',
      merchantType: null,
      areaList: {},
      value1: '',
      value2: 'a',
      option1: [
        { text: '地区排列', value: '' },
      ],
      option2: [
        { text: '推荐排序', value: 'a' },
        { text: '距离最近', value: 'b' },
      ],
    }
  },
  created(){
    this.name = this.$route.query.name;
    // this.merchantType = this.$route.query.merchantType
    this.getRegion();
  },
  methods:{
    screenClick(){
      this.showPopup = true;
    },
    async getRegion(){
      const {value} = await region();
      value[0]['children'][0]['children'].forEach(item => {
        this.option1.push({
          text: item.fullName,
          value: item.code
        })
      })
    },
    dropdownChange(v){
      let key = this.$refs.goodsList.isDesc;
      this.$refs.goodsList.isDesc = !key;
      console.log(v);
    },
    areaChange(v){
      this.$refs.goodsList.areaCode = v;
      console.log(this.$refs.goodsList.areaCode);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

