<template>
  <div>
    <Header :name="data.title" leftType></Header>
    <div class="contents" v-html="data.content"></div>
  </div>
</template>
<script>
import Header from '@/components/header'
import { info } from '@/api/logonNotice'

export default {
  components: {
    Header
  },
  data() {
    return {
      type: this.$route.query.type,
      data: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      info({type: this.type}).then((res) => {
        this.data = res.value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contents {
  overflow: auto;
  font-size: 0.4rem;
  line-height: 0.4rem * 1.5;
  padding: 0 0.2rem;
  letter-spacing: 1px;
  text-indent: 2em;
  ::v-deep img {
    width: 100%;
    height: auto;
  }
}
</style>
