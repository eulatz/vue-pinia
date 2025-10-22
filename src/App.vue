<template>
  <nav class="contenedor">
    <h1> App Base </h1>
    
      <nav class="a" v-if="!userStore.loadingSession">
      <RouterLink class="home" to="/" v-if="userStore.userData">Home</RouterLink>
      <RouterLink class="home" to="/login" v-if="!userStore.userData">Login</RouterLink>
      <RouterLink class="home" to="/Register" v-if="!userStore.userData">Register</RouterLink>
      <button @click="userStore.logOutUser" v-if="userStore.userData" class="home color-green padding-q">LogOut</button>
  
    </nav>
    
    <div v-else>
      loading user...
    </div>
    </nav>
    
    <RouterView></RouterView>

</template>

<script setup>
import { useUserStore } from './stores/user';
const userStore = useUserStore()
</script>

<style>
.contenedor{
  border: 1px solid gray;
  border-radius: 10px;
  background-color: beige;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  padding-left: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  .home {
    border: 1px solid gray;
    border-radius: 7px;
    margin-left: 10px;
    padding: 10px;
    background-color: aquamarine;
}
.color-green {
  background-color: green;
  color: white;
}
.padding-q {
  padding: 20px;
}
button:disabled {
  background-color: gray;
  color: white;
  cursor: not-allowed;
  opacity: 0.7;
}

</style>
