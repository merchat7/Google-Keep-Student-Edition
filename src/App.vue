<template>
  <div id="app">
    <notifications group="reminder"
                   position="bottom left"
                   :duration = -1
                   :reverse=true>
    </notifications>
    <notifications group="info"
                     position="top center"
                     :duration = 1000
                     width="300"/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html {
    background: #ededed;
  }
  #keep main .container {
    height: 660px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .text {
    font-weight: 400;
  }

</style>
