<template>
  <div></div>
</template>

<script>
import rsWxApi from '@/utils/wxapi'

export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  beforeCreate() {},
  created() {
    rsWxApi.wxCode()
  }
}
</script>
