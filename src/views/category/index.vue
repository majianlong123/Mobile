<template>
  <div class="container">
    <pubHeader name="分类"></pubHeader>
    <div class="wrap">
      <div class="side">
        <div :class="['side-item', {'active': index == curIndex}]"
          v-for="(item, index) in sideList"
          :key="item.id"
          @click="sidebarClick(index)">
          {{item.name}}
        </div>
      </div>
      <!-- <template v-for="item in sideList" > -->
      <div class="content">
        <div class="content-item"
          v-for="child in sideList[curIndex].children"
          :key="child.id"
          @click="itemClick(child)">
          <img :src="child.hostThumb"
            alt="" />
          <p>{{child.name}}</p>
        </div>
      </div>
      <!-- </template> -->

    </div>
  </div>
</template>

<script>
import { list } from '@/api/category'

import pubHeader from '@/components/header'

export default {
  components: {
    pubHeader
  },
  data() {
    return {
      curIndex: 0,
      sideList: [
        {
          title: '餐饮小吃',
          id: 1
        },
        {
          title: '丽人美发',
          id: 2
        },
        {
          title: '甜品蛋糕',
          id: 3
        },
        {
          title: '汽修美容',
          id: 4
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await list()
      this.sideList = res.value
      this.curIndex = this.$route.query.index || 0
      console.log(this.sideList)
    },
    sidebarClick(index) {
      this.curIndex = index
    },
    itemClick(item) {
      this.$router.push({ name: 'GoodsList', query: { name: item.name, merchantType: item.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .wrap {
    display: flex;
    height: 100%;
    position: relative;
    .side {
      position: fixed;
      // overflow-y: scroll;
      width: 2.8125rem;
      height: 100%;
      background: #f1f1f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $size-large;
      text-align: center;
      overflow-y: scroll;
      &-item {
        width: 100%;
        height: 1.59375rem;
        line-height: 1.59375rem;
      }
      .active {
        border-left: 0.09375rem solid $color-orange;
        box-sizing: border-box;
        background: #fff;
      }
    }
    .content {
      height: calc(100vh - 1.5625rem - 1.5625rem);
      flex: 1;
      margin-top: 0.5rem;
      position: absolute;
      left: 2.8125rem;
      font-size: $size-medium;
      text-align: center;
      overflow: auto;
      &-item {
        float: left;
        margin-left: 0.335rem;
        width: 1.9625rem;
        height: 2.7875rem;
        img {
          width: 1.9625rem;
          height: 1.9625rem;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>

