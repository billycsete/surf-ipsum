<template>
  <div id="app">
    <!-- <h1>{{ appTitle }}</h1> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/uploader">About</router-link>
    </div> -->
    <!-- <word-list></word-list> -->
    <router-view/>
  </div>
</template>


<script>
import WordList from './components/WordList'

export default {
  name: 'App',
  components: {
    'word-list': WordList
  },
  computed: {
    appTitle () {
      // return this.$store.state.appTitle
      return 'Surf Ipsum'
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
