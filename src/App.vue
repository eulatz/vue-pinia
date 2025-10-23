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
  border: 1px solid rgb(141, 179, 201);
  border-radius: 20px;
  background-color: rgb(208, 237, 238);
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
    background-color: rgb(237, 244, 245);
    color: rgb(57, 104, 112);

}
.color-green {
    background-color: rgb(237, 244, 245);
    color: rgb(57, 104, 112);
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
