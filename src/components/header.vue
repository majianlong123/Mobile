<template>
  <div>
    <div class="header" :class="{'header-no-shadow':noShadow}">
      <div class="header_left" @click="back" v-if="leftType">
        <van-icon name="arrow-left" size="0.53rem" color="#a1a1a1" />
      </div>
      <div class="header_left" v-else></div>
      <div class="header_text">{{name}}</div>
      <div class="header_right" @click="open" v-if="rightName">{{rightName}}</div>
      <div class="header_right" v-else></div>
    </div>
    <div class="height" />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    leftType: {
      type: Boolean,
      default: Boolean
    },
    rightName: {
      type: String,
      default: ''
    },
    noShadow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    open() {
      this.$emit('open')
    }
  }
}
</script>
<style lang='scss' scoped>
.header {
  z-index: 999;
  display: flex;
  position: fixed;
  width: calc(100% - 0.8rem);
  top: 0;
  height: 50px;
  background: white;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: $size-thirty-six;
  padding: 0 0.4rem;
  > div {
    display: flex;
    align-items: center;
    flex: 1;
    white-space: nowrap;
  }
  &_left {
    justify-content: start;
  }
  &_text {
    justify-content: center;
  }
  &_right {
    font-size: 0.4rem;
    justify-content: flex-end;
  }
}
.header-no-shadow {
  box-shadow: none;
}
.height {
  height: 50px;
}
.text {
  font-weight: bold;
}
</style>
