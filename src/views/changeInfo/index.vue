<template>
  <div class="container">
    <pubHeader leftType name="修改信息" />
    <van-cell title="昵称" is-link to="changeName" />
    <van-cell title="修改密码" is-link to="changePwd" />

    <div class="button mar-top" @click="loginOut">退出登录</div>

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
    async loginOut(){
      const confirm = await this.$dialog.confirm({
        title: '提示',
        message: '是否退出登录'
      }).catch(()=>{});
      if(!confirm) return;
      this.$store.dispatch('user/loginOut');
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  min-height: 100vh;
  background: $bg-bar;
  overflow: hidden;
  .van-cell{
    padding: .35rem .3rem;
  }
  .mar-top {
    margin-top: 0.4rem;
  }
  .button {
    background: white;
    font-size: $size-large;
    text-align: center;
    padding: 0.4rem 0;
    color: #666;
  }
}

</style>
