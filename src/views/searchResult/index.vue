<template>
  <div class="body">
    <pubHeader leftType name="搜索结果"></pubHeader>
    <div class="wrap" @click="open" v-for="(item, index) in 6" :key="index">
      <!-- <img src="@/assets/image/back/timg.jpg" /> -->
      <div class="content">
        <div class="content_header">情深不寿，强极则辱；谦谦君子，温润如玉</div>
        <div class="content_number">
          <p>&yen;47.21</p>
          <span>2651人已购买</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pubHeader from '@/components/header'
export default {
  components: {
    pubHeader
  },
  methods: {
    open() {
      this.$router.push({ name: 'GoodsDetails' })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background: $bg-bar;
}
.wrap {
  background: white;
  margin: 0.4rem 0.53rem;
  padding: 0.4rem 0.3rem;
  display: flex;
  img {
    width: 2.13rem;
    height: 2.13rem;
    margin-right: 0.4rem;
    border-radius: 0.1rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    &_header {
      line-height: 0.37rem * 1.5;
      font-size: 0.37rem;
    }
    &_number {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $size-large;
        color: $color-money;
      }
      span {
        font-size: $size-small;
        color: $color-pl;
      }
    }
  }
}
</style>
