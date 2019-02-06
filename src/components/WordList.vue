<template>
  <div id="word-list">
    <h2>All the words</h2>
    <ul>
      <li v-for="word in surfStrings">
        {{ word }}
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'WordList',
    computed: {
      surfStrings() {
        // return this.$store.getters.surfStrings
      }
    },
    created: ()=> {
      console.log(this)
      // this.$store.dispatch('getFirebaseData')
    }
  }
</script>
