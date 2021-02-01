<template>
  <div>
    <pubHeader leftType name="浏览记录" />
    <div class="card" v-for="(item, index) in lists" :key="index" @click="open(item.merchantId, item.name)">
      <img :src="item.icon" />
      <div class="content">
        <div class="content_header">
          <p>{{ item.name }}</p>
          <!-- <van-icon name="close" size=".5rem" color="#ccc" @click.stop="onCollection(item.merchantId)" /> -->
        </div>
        <div class="content_number">
          <p>
            {{ item.mapAddress }}
          </p>
          <span>{{item.createDate}}</span>
        </div>
      </div>
    </div>
    <infinite-loading @infinite="getData" :identifier="infiniteId" direction="bottom">
      <div slot="spinner" class="whiteBg">读取中...</div>
      <div slot="no-more" class="whiteBg">已加载全部</div>
      <div slot="no-results" class="whiteBg">
        <noList text="你还没有浏览记录哦，快去逛一逛吧"></noList>
      </div>
    </infinite-loading>
  </div>
</template>
<script>
import pubHeader from '@/components/header'
import noList from '@/components/noList'
import {browse} from '@/api/user'
export default {
  components: {
    pubHeader,
    noList
  },
  data() {
    return {
      page: 1,
      infiniteId: +new Date(),
      lists: []
    }
  },
  created(){
  },
  methods: {
    getData($state) {
      const infinite = this.infiniteId
      if (infinite === this.infiniteId) {
        browse({page: this.page, pageSize: 10}).then((res) => {
          if (res.value.data.length) {
            this.page += 1
            this.lists.push(...res.value.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
      }
    },
    async onCollection(id) {
      const confirm = await this.$dialog.confirm({
          title: '提示',
          message: '是否取消收藏'
        }).catch(()=>{});
        if(!confirm) return;
        await cancel({ merchantId: id });
        this.page = 1;
        this.lists = [];
        this.infiniteId += 1;
    },
    open(merchantId, name) {
      this.$router.push({ name: 'GoodsDetails', query: { merchantId, name } })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  border-radius: 0.2rem;
  display: flex;
  background: white;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);
  padding: 0.1rem;
  margin: 0.2rem;
  img {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.4rem;
    border-radius: 0.1rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    &_header {
      display: flex;
      justify-content: space-between;
      p {
        line-height: $size-large * 1.5;
        font-size: $size-large;
        margin-right: 0.2rem;
      }
    }
    &_number {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $size-large;
        color: $color-money;
      }
      span{
        font-size: $size-small;
        color: #999
      }
    }
  }
}
</style>
