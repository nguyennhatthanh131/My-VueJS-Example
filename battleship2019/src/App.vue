<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/battleship">Battle Ship 2019</router-link> |
      <router-link to="/todolist">Todo List</router-link> 
    </div>
    <router-view/>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import TodoList from '@/views/TodoList.vue'

@Component({
  components: {
    TodoList,
  },
})

export default class App extends Vue {
  
}

</script>

<style lang="scss">

  @import url("./styles/BattleShip.scss");

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
