  <template>
    <div id="app">
      <router-view v-if="!$route.meta.keepAlive" />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </div>
  </template>

  <script>
  export default {
    name: 'App'
  }
  </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

