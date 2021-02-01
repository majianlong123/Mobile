<template>
  <div class="list">
    <div :class="['list-item',{'margin-bottom': index == lists.length - 1}]"
      v-for="(item, index) in lists"
      @click="itemClick(item.baseInfo.id, item.distanceStr, item.baseInfo.name)">
      <div class="left">
        <img :src="item.baseInfo.icon"
          alt="">
      </div>
      <div class="right-box">
        <p class="top">{{item.baseInfo.name}}</p>
        <div class="bottom">
          <p>{{item.baseInfo.merchantTypeName}}&nbsp;{{item.baseInfo.areaName}}</p>
          <div v-if="item.distanceStr !== '0m'">
            <img src="@/assets/image/icon/gps.png"
              alt="">
            <span>{{item.distanceStr}}</span>
          </div>
        </div>
      </div>
    </div>

    <infinite-loading ref="infiniteLoading"
      @infinite="getData"
      :identifier="infiniteId"
      infinite-scroll-distance="10"
      direction="bottom">
      <div slot="spinner"
        class="whiteBg">读取中...</div>
      <div slot="no-more"
        class="whiteBg">已加载全部</div>
      <div slot="no-results"
        class="whiteBg">暂无商家</div>
    </infinite-loading>
  </div>
</template>

<script>
import { list } from '@/api/home'
import { mapGetters } from 'vuex'

import noList from '@/components/noList'

export default {
  components: {
    noList
  },
  data() {
    return {
      infiniteId: +new Date(),
      page: 1,
      lists: [],
      searchKey: this.value,
      merchantType: '',
      isRecommend: '',
      areaCode: '',
      isDesc: true
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['coordinate'])
  },
  watch: {
    coordinate() {
      this.resetData()
    },
    isDesc() {
      this.resetData()
    },
    areaCode() {
      this.resetData()
    }
  },
  created() {
    this.merchantType = this.$route.query.merchantType
    console.log(this.merchantType)
  },
  methods: {
    itemClick(merchantId, distanceStr, name) {
      this.$router.push({ name: 'GoodsDetails', query: { merchantId, distanceStr, name } })
    },
    resetData() {
      this.page = 1
      this.lists = []
      this.infiniteId += 1
    },
    getData($state) {
      if (this.coordinate == '') {

      }else {
        list({
          page: this.page,
          pageSize: 6,
          searchKey: null,
          merchantType: this.merchantType,
          memberId: this.memberId,
          latitudeLongitude: this.$store.getters.coordinate || null,
          recommend: this.recommend,
          areaCode: this.areaCode,
          isDesc: this.isDesc
        }).then((res) => {
          if (res.value.data.length) {
            this.page += 1
            this.lists.push(...res.value.data)
            $state.loaded()
          } else {
            console.log($state)
            $state.complete()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0.15625rem 0.3125rem;
  padding-top: 0.15625rem;
  .margin-bottom {
    margin-bottom: 1rem;
  }
  &-item {
    background: #fff;
    padding-left: 0.15625rem;
    margin-bottom: 0.15625rem;
    box-shadow: 0px 3px 6px rgba(198, 198, 198, 0.16);
    display: flex;
    border-radius: 10px;
    padding: 0.203125rem;
    .left {
      width: 5rem;
      height: 2.03125rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .right-box {
      margin-left: 0.1875rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        font-size: $size-large;
        font-weight: bold;
      }
      .bottom {
        font-size: $size-small;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(154, 154, 154, 1);
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #333;
          img {
            width: 0.336875rem;
            height: 0.413438rem;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
.no-results {
  color: #666;
  font-size: $size-large;
  font-weight: bold;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


