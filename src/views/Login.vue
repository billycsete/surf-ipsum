<template>
  <div class="login">
    <input
      type="text"
      v-model="email"
      placeholder="Email"
      class="input"
      required>
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      class="input"
      required>
      <button v-on:click="login" class="button">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase';
// import 'firebase/auth';

export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('/')
      }).catch((err) => {
        alert(err.message)
      })
    }
  }
}
</script>


<style scoped lang="scss">

</style>
