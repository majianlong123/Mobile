<template>
  <div class="container">
    <pubHeader leftType name="修改昵称" />
    <van-field v-model="Name" label="昵称" placeholder="请输入昵称" clearable input-align="right" />

    <div class="button mar-top" @click="submit">确认修改</div>

  </div>
</template>
<script>
import {info} from '@/api/user'
import pubHeader from '@/components/header'
import noList from '@/components/noList'
import {changeName} from '@/api/user'
export default {
  components: {
    pubHeader,
    noList
  },
  data() {
    return {
      Name: '',
      infoName: {}
    }
  },
  created(){
    this.getInfo()
  },
  methods: {
    async submit(){
      if(this.Name == '') return this.$toast.fail('请输入昵称');
      const {success} = await changeName({Name: this.Name});
      if(!success) return;
      this.$toast.success('修改成功');
      this.$router.go(-1);
    },
    getInfo() {
      info().then(res => {
        this.infoName = res.values.baseInfo.name
        this.Name = this.infoName
      })
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
    padding: .3rem ;
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
