<template>
<a-layout>
  <a-layout-header v-if="!userStore.loadingSession">
    <a-menu theme="dark" mode="horizontal" :style="{lineHeight: '64px'}"
      v-model:selectedKeys="selectedKeys">

      <a-menu-item v-if="userStore.userData" key="home">
        <RouterLink to="/">Home</RouterLink>
      </a-menu-item>

        <a-menu-item v-if="userStore.userData" key="perfil">
        <RouterLink to="/perfil" >Perfil</RouterLink>
      </a-menu-item>
      
      <a-menu-item v-if="!userStore.userData" key="login">
        <RouterLink to="/login" >Login</RouterLink>
      </a-menu-item>

      <a-menu-item v-if="!userStore.userData" key="register">
        <RouterLink to="/Register" >Register</RouterLink>
      </a-menu-item>

      <a-menu-item 
      @click="userStore.logOutUser" 
      v-if="userStore.userData" key="logout"> LogOut
      </a-menu-item>

    </a-menu>
  </a-layout-header>
  
  <a-layout-content style="padding: 0 50px 10px">
    <div class="container">
        <div v-if="userStore.loadingSession">loading user...</div>
        <RouterView></RouterView>
    </div>


  </a-layout-content>
  
</a-layout>


</template>


<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from './stores/user';
import { Layout } from 'ant-design-vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const userStore = useUserStore()

//console.log(router.name)
const selectedKeys =ref([])

watch(
  
  ()=> route.name, 
  ()=> {
    selectedKeys.value = [route.name]
  })

</script>

<style>
.container  {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 74px);
}

.text-center {
  text-align: center;
}

</style>