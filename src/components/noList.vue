<template>
  <div class="nolist">
    <img src="@/assets/nolist.png" />
    <div>{{text}}</div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无信息'
    }
  }
}
</script>
<style lang='scss' scoped>
.nolist {
  width: 100%;
  text-align: center;
  margin: 1.5rem auto;
  img {
    width: 5rem;
    height: auto;
  }
  div {
    margin-top: 0.2rem;
    font-size: $size-small;
    color: $color-cc;
  }
}
</style>
