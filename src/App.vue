<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局css样式 */
@import url("./styles/main.scss");
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
