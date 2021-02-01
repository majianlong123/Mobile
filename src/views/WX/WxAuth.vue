<template>
  <div></div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'WxAuth',
  components: {},
  data() {
    return {
      pageParams: {}
    }
  },
  computed: {},
  mounted() {
    // this.getData()
  },
  methods: {
    goJump() {
      this.$router.push({ name: 'Home' })
    },
    // getData() {
    //   Toast.loading({
    //     mask: false,
    //     message: '加载中...'
    //   })
    //   const jscode = this.$route.query.code

    //   if (jscode) {
    //     this.$store.dispatch('user/getOpenId', jscode).then(() => {
    //       this.goJump() // 成功,跳转回去
    //     })
    //   } else {
    //     Toast.fail('微信授权失败')
    //   }
    // }
  }
}
</script>

<!-- 添加 "scoped" 属性, 只作用于当前文件内的样式 -->
<style lang="less" scoped>
</style>
