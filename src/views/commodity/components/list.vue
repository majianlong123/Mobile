<template>
  <div class="list">
    <div class="table">
      <div v-for="(item, index) in lists" :key="index" @click="open(item.goods_id)">
        <img :src="item.picurl" />
        <div class="content">
          <p class="content_title">{{ item.name }}</p>
          <div class="content_moeny">
            <span class="red">&yen;{{ item.price }}</span>
            <span>销量：{{ item.sales_volume }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lists: Array,
    default: () => []
  },
  methods: {
    open(id) {
      this.$router.push({ name: 'GoodsDetails', query: { goodsId: id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin: 0.53rem 0 0.33rem 0;
}
.table {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    width: 49%;
    margin: 0.2rem 0;
    border-radius: 0.2rem;
    height: 7rem;
    img {
      width: 100%;
      height: 4.8rem;
    }
    .content {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.3rem;
      &_title {
        font-size: 0.4rem;
        line-height: 0.5rem;
        color: $color-dark;
        margin-bottom: 0.2rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &_moeny {
        // font-size: $size-large;
        font-size: 0.45rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .red {
          font-weight: 600;
          color: $color-money;
        }
        span:last-child {
          font-size: 0.3rem;
          color: $color-pl;
        }
      }
    }
  }
}
</style>
