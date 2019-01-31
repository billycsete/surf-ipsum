<template>
  <div class="login">
    <el-input
      type="text"
      v-model="email"
      placeholder="Email"
      class="input"
      required>
    </el-input>
    <el-input
      type="password"
      v-model="password"
      placeholder="Password"
      class="input"
      required>
    </el-input>
    <el-button v-on:click="login" class="button">Login</el-button>
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
