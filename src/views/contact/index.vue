<template>
  <div>
    <Header :name="data.title" leftType></Header>
    <div class="contents" v-html="data.content"></div>
  </div>
</template>
<script>
import Header from '@/components/header'
import { contact  } from '@/api/user'

export default {
  components: {
    Header
  },
  data() {
    return {
      id: this.$route.query.id,
      data: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      contact(this.id).then((res) => {
        this.data = res.value;
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
