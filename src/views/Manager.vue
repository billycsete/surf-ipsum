<template>
  <div class="manager">
    <h1>Word Manager</h1>
    <button v-model="editMode" v-on:click="toggleEditMode">
      <span v-if="!editMode">Enable Edit Mode</span>
      <span v-if="editMode">Disable Edit Mode</span>
    </button>
    <ul class="word-list">
      <li v-for="word in words" class="word">
        <button v-on:click="setEditWord(word['.key'])">edit</button>
        <span>{{ word['.value'] }}</span>
        <button v-on:click="removeWord(word['.key'])">x</button>
      </li>
    </ul>
  </div>
</template>


<script>
import { wordsRef } from '../firebase';

export default {
  name: 'Manager',
  data() {
    return {
      editMode: false
    }
  },
  firebase: {
    words: wordsRef.orderByValue()
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    removeWord(key) {
      wordsRef.child(key).remove();
    },
    setEditWord(key) {
      words.Ref.child(key).update();
    }
  }
}
</script>


<style scoped lang="scss">
  .word-list {
    text-align: left;
  }
  .word {
    display: inline-block;
    padding: 5px 10px;
    background: #08c;
    color: white;
    margin: 5px;

    span {
      font-weight: bold;
      margin-right: 5px;
      margin-left: 5px;
    }
  }
</style>
