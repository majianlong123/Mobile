<template>
  <div class="body">
    <!-- <pubHeader name="千联同城"></pubHeader> -->
    <div class="wrapper"
      ref="wrapper">
      <div class="title">
        <div class="name">千联同城</div>
        <div class="top-search-bar"
          id="top-search"
          :class="{'have-box-shadow':haveBoxShadow}">
          <van-search class="search"
            shape="round"
            placeholder="搜索你感兴趣的~"
            @click="search" />
          <!-- <img src="@/assets/notice.png" alt="" @click="goNoticeRoute"> -->
        </div>
        <swipe></swipe>
      </div>
      <div class="grid">
        <van-grid :border="false"
          column-num="4"
          icon-size="50px">
          <van-grid-item v-for="(item, index) in classification"
            :key="index"
            :icon="item.hostThumb"
            :text="item.name"
            @click="fenlei(index)" />
        </van-grid>
      </div>
      <!-- <classAll></classAll> -->
      <nitoceBanner></nitoceBanner>
      <goodsList></goodsList>
    </div>
  </div>
</template>
<script>
import { MerchantType } from '@/api/home'

// import pubHeader from '@/components/header'
import swipe from './components/swipe'
// import classAll from './components/classAll'
import nitoceBanner from './components/nitoceBanner'

import goodsList from '@/components/goodsList'

export default {
  components: {
    swipe,
    // classAll,
    nitoceBanner,
    goodsList
  },
  data() {
    return {
      haveBoxShadow: false,
      classification: {}
    }
  },
  created() {
    this.getLocation()
    this.class()
  },
  mounted() {
    this.tabScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    search() {
      this.$router.push({ name: 'SearchHistory' })
    },
    goNoticeRoute() {
      this.$router.push('/noticeList')
    },
    tabScroll() {
      const wrapperTab = this.$refs.wrapper
      wrapperTab.addEventListener('scroll', this.handleScroll)
    },
    handleScroll(wrapperTab) {
      const tabTop = this.$refs.wrapper.scrollTop
      if (tabTop) {
        this.haveBoxShadow = true
      } else {
        this.haveBoxShadow = false
      }
    },
    getLocation() {
      const self = this
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete(data) {
          // data是具体的定位信息
          console.log('定位成功信息：', data)
          const position = data.position
          const coordinate = position.lng + ',' + position.lat
          self.$store.commit('user/SET_COORDINATE', coordinate)
          console.log(self.$store.getters.coordinate)
        }

        function onError(data) {
          // 定位出错
          console.log('定位失败错误：', data)
          // alert('您已拒绝授权，请重新打开权限获取位置信息')
          self.getLngLatLocation()
        }
      })
    },
    class() {
      MerchantType({}).then((res) => {
        this.classification = res.value
        console.log(this.classification)
      })
    },
    getLngLatLocation() {
      const self = this
      AMap.plugin('AMap.CitySearch', function() {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function(status, result) {
          console.log(status)
          console.log(result)
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result)
            //逆向地理编码

            AMap.plugin('AMap.Geocoder', function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(';')[0].split(',')
              // var aaa = ''

              geocoder.getAddress(lnglat, function(status, data) {
                if (status === 1 && data.info === 'SUCCESS') {
                  self.$store.commit('user/SET_COORDINATE', lnglat)
                  // result为对应的地理位置详细信息
                  console.log(data)
                } else {
                  // 如果失败传过去的坐标就是个空
                  self.$store.commit('user/SET_COORDINATE', null)
                  console.log('定位失败')
                }
              })
            })
          }
        })
      })
    },
    fenlei(index) {
      // console.log(index)
      this.$router.push({
        name: 'Category',
        query: {index: index}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  // border: 1px solid red;
  min-height: 100vh;
  margin-bottom: 1rem;
  // overflow: auto;
}
</style>
<style lang="scss" scoped>
.title {
  width: 100%;
  background: $color-orange;
  height: 5.125rem;
  border-radius: 0px 0px 30px 30px;
  display: inline-block;
  .grid {
    margin-top: 1rem;
  }
  .name {
    font-size: 0.4rem;
    text-align: center;
    padding-top: 0.40625rem;
    font-weight: 500;
  }
  .top-search-bar {
    padding: 0 0.34375rem;
    box-sizing: border-box;
    margin-top: 0.53125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100%);
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.1rem;
    }
    .search {
      flex: 1;
      border-radius: 0.4rem;
      // box-shadow: 0px 0px 10px -1px rgba(148, 148, 148, 0.75);
      // background-color: #fff;
      color: #9a9a9a;
      ::v-deep .van-search__content {
        padding: 0px 15px;
      }
    }
    transition: all 0.5s;
  }
}
::v-deep .van-grid-item__text {
  font-size: 15px !important;
}
.have-box-shadow {
  box-shadow: 0px 0px 6px -1px rgba(148, 148, 148, 0.5);
}
</style>
