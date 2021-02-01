<template>
  <div>
    <pubHeader leftType :name="title"></pubHeader>
    <div class="head">
      <van-search class="search" v-if="!cate_id" shape="round" v-model="value" show-action placeholder="请输入搜索关键词"
        @clear="switchTab">
        <template #action>
          <div @click="switchTab">搜索</div>
        </template>
      </van-search>

      <div class="tab">
        <!-- <div v-for="(item, index) in tab" :key="index" :class="['tab_item', selIndex == index ? 'tab_item-sel' : '']" @click="selItem(index, item.value)"> -->
        <div v-for="(item, index) in tab" :key="index" :class="['tab_item', selIndex == index ? 'tab_item-sel' : '']"
          @click="selItem(index, item)">
          <span>{{ item.label }}</span>
          <!-- <van-icon :name="selIndex == index ? 'arrow-up' : 'arrow-down'" /> -->
          <van-icon :name="item.isReverseFlag ? 'arrow-down' : 'arrow-up'" />
        </div>
        <div v-if="cate_id" class="tab_item tab_item-right" @click="show = true">
          <span>筛选</span>
          <van-icon name="filter-o" />
        </div>
      </div>
    </div>

    <list :lists="lists" class="list-wrapper"></list>

    <infinite-loading class="infinite" @infinite="getData" :identifier="infiniteId" direction="bottom">
      <div slot="spinner" class="whiteBg">读取中...</div>
      <div slot="no-more" class="whiteBg">已加载全部</div>
      <div slot="no-results" class="whiteBg">
        <noList text="这些商品还没有上架哦，逛逛其他的吧"></noList>
      </div>
    </infinite-loading>

    <van-popup v-model="show" position="right" :style="{ height: '100%', width: '70%' }">
      <div class="category">
        <div :class="['category_item', categoryIndex == index ? 'category_item-sel' : '']"
          v-for="(item, index) in categoryList" :key="index" @click="onCategory(index, item.cate_id)">
          {{ item.name }}
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import pubHeader from '@/components/header'
import list from './components/list'
import noList from '@/components/noList'
// import { goodsList, category } from '@/api/goods'
export default {
  components: {
    pubHeader,
    list,
    noList
  },
  data() {
    return {
      title: this.$route.query.title || '商品列表',
      value: this.$route.query.searchVal || '',
      page: 1,
      sort: 'def_esc',
      id: this.$route.query.id || '',
      cate_id: this.$route.query.id,
      tab: [
        { label: '综合', isReverseFlag: true, reverseFlag: 'def_desc', positiveFlag: 'def_esc' },
        { label: '价格', isReverseFlag: true, reverseFlag: 'price_desc', positiveFlag: 'price_esc' },
        { label: '销量', isReverseFlag: true, reverseFlag: 'xiao_desc', positiveFlag: 'xiao_esc' }
      ],
      selIndex: 0, // 条件筛选
      categoryIndex: null, // 二级分类选择
      // 商品列表
      lists: [],
      // 二级分类列表
      categoryList: [],
      infiniteId: +new Date(),
      show: false
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    // 条件筛选
    selItem(index, item) {
      // 判断点击的是否同一个标签
      if (this.selIndex === index) {
        // 若是同一个标签则改变排列方式
        item.isReverseFlag = !item.isReverseFlag
      } else {
        this.selIndex = index
      }
      // 正序或倒序排列
      if (item.isReverseFlag) {
        this.sort = item.reverseFlag
      } else {
        this.sort = item.positiveFlag
      }
      // 触发排列接口
      this.switchTab()
    },
    switchTab() {
      this.page = 1
      this.lists = []
      this.infiniteId += 1
    },
    // 二级分类筛选
    onCategory(index, value) {
      this.switchTab()
      this.categoryIndex = index
      this.cate_id = value
      this.show = false
    },
    getData($state) {
      const infinite = this.infiniteId
      if (infinite === this.infiniteId) {
        goodsList({
          page: this.page,
          rows: 6,
          sort: this.sort,
          keywords: this.value,
          cate_id: this.cate_id
        }).then((res) => {
          if (res.data.list.length) {
            this.page += 1
            this.lists.push(...res.data.list)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
      }
    },
    // 二级分类
    getCategory() {
      if (this.id) {
        category(this.id).then((res) => {
          this.categoryList = res.data.list
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.head {
  box-sizing: border-box;
  padding: 0.2rem 0.3rem;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
  // border: 1px solid red;
  position: fixed;
  width: 100%;
  top: 50px;
  background-color: #fff;
}
.tab {
  display: flex;
  align-items: center;
  font-size: $size-large;
  padding: .1rem;
  //   background: white;
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
.list-wrapper{
  margin-top: 36px;
}
.category {
  display: flex;
  margin: 0.4rem;
  flex-wrap: wrap;
  &_item {
    margin: 0.2rem;
    background: #eee;
    font-size: $size-medium;
    padding: 0.1rem 0.4rem;
    color: $color-deep;
    border-radius: 0.4rem;
    &-sel {
      background: $color-stay;
      color: white;
    }
  }
}
</style>
<style lang="scss" scoped>
.head {
  .search {
    margin-bottom: 0.5rem;
  }
  .search ::v-deep .van-search__content {
    // padding-left: 15px;
    margin-right: 15px;
    padding: 0px 15px;
  }
}
.whiteBg{
  line-height: 0
}
</style>
