

<template>
    <div class="container">
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
   </div>
</template>


<script setup>
import {useUserStore} from '../stores/user.js'
const userStore = useUserStore();

</script>

