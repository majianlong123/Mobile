<template>
  <div>
    <pubHeader leftType name="平台公告"></pubHeader>

    <div class="list" v-for="(item, index) in artList" :key="index">
      <div @click="open(item.id)">
        <div>
          <!-- <img :src="item.picurl" /> -->
          <div>
            <p>{{ item.title }}</p>
            <p>{{ item.create_time }}</p>
          </div>
        </div>
        <van-icon name="arrow" size="0.5rem" color="#c9c9c9" />
      </div>
    </div>
    <infinite-loading @infinite="getData" :identifier="infiniteId" direction="bottom">
      <div slot="spinner" class="whiteBg">读取中...</div>
      <div slot="no-more" class="whiteBg">已加载全部</div>
      <div slot="no-results" class="gonggao">
        暂无公告
        <!-- <div class="whiteBg">暂无记录</div> -->
      </div>
    </infinite-loading>
  </div>
</template>
<script>
import pubHeader from '@/components/header'
import { list } from '@/api/article'
export default {
  components: {
    pubHeader
  },
  data() {
    return {
      artList: [],
      page: 1,
      infiniteId: +new Date(),
      type: 'platform_info'
    }
  },
  methods: {
    getData($state) {
      const infinite = this.infiniteId
      if (infinite === this.infiniteId) {
        list({page: this.page, pageSize: 10, type: this.type}).then((res) => {
          if (res.value.data.length) {
            this.page += 1
            this.artList.push(...res.value.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
      }
    },
    open(id) {
      this.$router.push({ name: 'Notice', query: { id: id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin: 0.1rem;
  padding: 0.1rem;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    // box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.05);
    // border-bottom: 1px solid #e6e6ee;
    padding: 0.3rem 0;
    > div {
      display: flex;
      align-items: center;
      font-size: 0.43rem;
      color: #333;
      img{
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.2rem;
      }
      p:last-child {
        margin-top: 0.2rem;
        font-size: 0.35rem;
        color: rgb(201, 201, 201);
      }
    }
  }
}
</style>
