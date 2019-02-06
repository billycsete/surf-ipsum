<template>
  <div class="uplodaer">
    <h1>Upload Word</h1>
    <el-input
      type="word"
      v-model="word"
      placeholder="upload word"
      class="input"
      required>
    </el-input>
    <el-button v-on:click="submitWord" class="button">Add Word</el-button>
  </div>
</template>


<script>
import { wordsRef } from '../firebase';

// best firebase tut:
// https://www.youtube.com/watch?v=831zOI02Q_0&t=312s

export default {
  name: 'Uploader',
  data() {
    return {
      editMode: false,
      word: null
    }
  },
  firebase: {
    words: wordsRef.orderByValue()
  },
  methods: {
    submitWord() {
      if (!this.word) return; // empty input
      // TODO: // test for duplicate input, case insensitive

      wordsRef.push(this.word);
      this.word = null;
    }
  }
}
</script>


<style scoped lang="scss">

</style>
