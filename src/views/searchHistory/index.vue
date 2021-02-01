<template>
  <div>
    <div class="header">
      <van-icon name="arrow-left" class="icon" size="0.53rem" color="#9999" @click="back" />
      <van-search class="search" left-icon v-model="value" shape="round" @clear="searchType = false" show-action placeholder="请输入搜索关键词">
        <template #action>
          <div @click="onSearch" class="button">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="menu" v-if="!searchType">
      <div class="menu_title">
        <span>历史搜索：</span>
        <span class="small" v-if="historyList.length != 0" @click="cloes">清除历史</span>
      </div>
      <div v-if="historyList.length != 0">
        <div class="menu_item" v-for="(item, index) in historyList" :key="index" @click="open(item)">{{ item }}</div>
      </div>
      <div v-else class="whiteBg">暂无搜索记录</div>
    </div>
    <!-- <div class="menu" v-if="!searchType">
      <div class="menu_title">热门搜索：</div>
      <div class="menu_item" v-for="(item, index) in hotList" :key="index" @click="open(item)">{{ item }}</div>
    </div> -->
    <list v-if="searchType" :value="value"></list>
  </div>
</template>
<script>
// import { param } from '@/api/public'
import list from './components/list'
export default {
  components: {
    list
  },
  data() {
    return {
      value: '',
      historyList: [],
      hotList: [],
      searchType: false
    }
  },
  created() {
    // this.getData()
    const data = localStorage.getItem('historyList').toString()
    this.historyList = data.split(',').filter((item) => {
      return item !== ''
    });
    console.log(this.searchType);
  },
  methods: {
    getData() {
      param({ id: 200 }).then((res) => {
        this.hotList = res.data.info.value_str
      })
    },
    onSearch() {
      // 判断是否登录
      if (this.$store.state.user.loginType == true) {
        const list = this.historyList || []
        if (list.indexOf(this.value) === -1) {
          if (list.length < 10) {
            list.unshift(this.value)
          } else {
            list.splice(list.length - 1, 1)
            list.unshift(this.value)
          }
        }
        localStorage.setItem('historyList', list.join());
        this.open(this.value);
        this.searchType = true;
      } else {
        this.$router.push({ name: 'Login' })
      }
      // const list = this.historyList || []
      // if (list.indexOf(this.value) === -1) {
      //   if (list.length < 10) {
      //     list.unshift(this.value)
      //   } else {
      //     list.splice(list.length - 1, 1)
      //     list.unshift(this.value)
      //   }
      // }
      // localStorage.setItem('historyList', list.join());
      // this.open(this.value);
      // this.searchType = true;
    },
    cloes() {
      this.historyList = []
      localStorage.setItem('historyList', [])
    },
    back() {
      this.value = ''
      if (this.searchType) {
        this.searchType = false
      } else {
        this.$router.go(-1)
      }
    },
    open(item) {
      this.value = item
      this.searchType = true
      //   this.$router.push({ name: 'Commodity', query: { title: '搜索结果', searchVal: this.value } })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  margin: 0 0.53rem;
}
.header {
  display: flex;
  height: 1.33rem;
  align-items: center;
  background: white;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  padding: 0 0.4rem;
  .icon {
    margin-right: 0.5rem;
  }
  .search {
    flex: 1;
  }
  .button {
    margin-left: 0.5rem;
  }
}
.menu {
  margin: 0 0.53rem;
  margin-top: 0.53rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: $size-medium;
    margin-bottom: 0.53rem;
    .small {
      font-size: $size-small;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &_item {
    border-radius: 0.4rem;
    background: $bg-block;
    color: $color-deep;
    padding: 0.15rem 0.3rem;
    margin: 0.2rem;
    font-size: $size-small;
  }
}
</style>
<style lang="scss" scoped>
.search {
  ::v-deep .van-search__content {
    padding: 0px 15px;
  }
}
</style>
