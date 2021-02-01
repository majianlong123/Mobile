<template>
  <div class="container">
    <pubHeader leftType name="修改密码" />
    <van-field v-model="OldPwd" label="旧密码" placeholder="请输入旧密码" clearable input-align="right" />
    <van-field v-model="NewPwd" label="新密码" placeholder="请输入新密码"  clearable input-align="right"/>
    <van-field v-model="NewPwda" label="确认密码" placeholder="请确认密码"  clearable input-align="right"/>

    <div class="button mar-top" @click="submit">确认修改</div>

  </div>
</template>
<script>
import pubHeader from '@/components/header'
import noList from '@/components/noList'
import {changePwd} from '@/api/user'
export default {
  components: {
    pubHeader,
    noList
  },
  data() {
    return {
      OldPwd: '',
      NewPwd: '',
      NewPwda: '',
    }
  },
  created(){
  },
  methods: {
    async submit(){
      if(this.OldPwd == '') {
        this.$toast.fail('请输入旧密码')
      }else if(this.NewPwd == '' || this.NewPwda == '') {
        this.$toast.fail('请输入新密码')
        this.$toast.fail('请确认密码')
      }else{
        const {success} = await changePwd({OldPwd: this.OldPwd, NewPwd: this.NewPwd});
        if(!success) return;
        this.$toast.success('修改成功');
        this.$store.dispatch('user/loginOut');
      };
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
    padding: .3rem .2rem;
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
