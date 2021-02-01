<template>
  <div>
    <div class="pad">
      <router-view></router-view>
    </div>
    <div class="menu-bottom">
      <div :class="['menu-bottom_item',selIndex==index?'sel':'']" v-for="(item,index) in navList" :key="index" @click="sel(item,index)">
        <img :src="selIndex==index?item.iconS:item.icon" />
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: this.$store.getters.navList.list
    }
  },
  watch: {},
  computed: {
    selIndex() {
      for (let i = 0; i < this.navList.length; i++) {
        if (this.navList[i].name === this.$route.name) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    sel(item, index) {
      // 判断是否登录
      if (item.name == 'My') {
        console.log(this.$store.state.user.loginType)
        if (this.$store.state.user.loginType == true) {
          this.$router.push({ name: item.name })
        } else {
          this.$router.push({ name: 'Login' })
        }
      } else {
        this.$router.push({ name: item.name })
      }
      // this.$router.push({ name: item.name })
    }
  }
}
</script>
<style lang='scss' scoped>
.pad {
  height: calc(100vh - 1.33rem);
  overflow-y: scroll;
}
.menu-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  box-shadow: 0px 0px 5px 0px rgba(222,222,222,0.5);
  justify-content: space-around;
  align-items: center;
  background: white;
  //   padding: 0.2rem 0;
  height: 1.33rem;
  &_item {
    width: 25%;
    text-align: center;
    font-size: $size-small;
    color: $color-pl;
    img {
      width: auto;
      height: 0.56rem;
    }
  }
  .sel {
    color: #ccc;
  }
}
</style>
