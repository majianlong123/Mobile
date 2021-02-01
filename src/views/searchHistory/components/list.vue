<template>
  <div class="list">
    <van-dropdown-menu >
        <van-dropdown-item v-model="value1" :options="option1" @change="areaChange" />
        <van-dropdown-item v-model="value2" :options="option2" @change="dropdownChange"  />
      </van-dropdown-menu>
    
    <goodsList ref="goodsList" :value="value"/>

  </div>
</template>
<script>
import {region} from '@/api/goodsList'

import noList from '@/components/noList'
import goodsList from '@/components/goodsList'


export default {
  components: {
    noList,
    goodsList
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      infiniteId: +new Date(),
      list: [],
      searchKey: '',
      value1: '',
      value2: 'a',
      option1: [
        { text: '地区排列', value: '' },
        // { text: '新款商品', value: 1 },
        // { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '推荐排序', value: 'a' },
        { text: '距离最近', value: 'b' },
      ],
    }
  },
  created(){
    this.getRegion();
  },
  methods: {
    async getRegion(){
      const {value} = await region();
      value[0]['children'][0]['children'].forEach(item => {
        this.option1.push({
          text: item.fullName,
          value: item.code
        })
      })
    },
    itemClick(merchantId, distanceStr, name){
      this.$router.push({name: 'GoodsDetails', query: {merchantId, distanceStr, name}});
    },
    selItem(index, value) {
      this.selIndex = index
      this.sort = value
      this.page = 1
      this.list = []
      this.infiniteId += 1
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
.title {
  margin: 0.53rem 0 0.33rem 0;
  font-size: $size-thirty-six;
}
.tab {
  padding: 0.4rem 0.53rem;
  background: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  font-size: $size-medium;
  &_item {
    margin-right: 0.73rem;
    display: flex;
    align-items: center;
    span {
      margin-right: 0.2rem;
    }
    &-sel {
      color: $color-stay;
    }
    &-right {
      margin-left: auto;
      margin-right: 0;
    }
  }
}
.list {
  &-item{
    background: #fff;
    padding-left: .15625rem;
    margin-bottom: .15625rem;
    box-shadow:0px 3px 6px rgba(198,198,198,0.16);
    display: flex;
    border-radius:10px;
    padding: .203125rem ;
    .left{
      width: 2.9375rem;
      height: 2.03125rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .right-box{
      margin-left: .1875rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top{
        font-size:$size-large;
        font-weight:bold;
      }
      .bottom{
        font-size: $size-small;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:rgba(154,154,154,1);
        div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #333;
          img{
            width: .336875rem;
            height: .413438rem;
            margin-right: .1rem;
          }
        }
      }
    }
  }
}
</style>
