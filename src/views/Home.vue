

<template>
    <div class="container">
        <h1>Home</h1>
        <p>Bienvenido: {{ userStore.userData?.email }}</p>
        
        <form class="formulario" @submit.prevent="handdleSubmit">
            <input class="imp" type="text" placeholder="Ingresar Url" v-model="url">
            <button class="btn" type="submit">Agregar Url</button>
        </form>

        <p v-if="databaseStore.loadingDoc">Cargando Documentos...</p>
        <ul v-else>
        
            <ol class="lista" v-for="item in databaseStore.documents" :key="item.id">
            Id :  {{item.id}} 
            <br>
            Url: {{ item.name }}  
            <br>
            Nombre Item:{{ item.short }}  
            <br> 
                <button class="btn danger" @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button class="btn edit" @click="router.push(`/editar/${item.id}`)">Editar</button>
            <br>     
            </ol>
        </ul>
   </div>
</template>


<script setup>
import {useUserStore} from '../stores/user.js'
import { useDatabaseStore } from '../stores/database.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getUrls()

const url = ref('')
const handdleSubmit =() => {
    databaseStore.addUrl(url.value)
}
</script>


<style>
.container {
    padding: 1%;
    margin: 1%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.formulario {
    margin: 1%;
    border: 1px solid rgb(141, 179, 201);
    border-radius: 120px;
    padding: 1%;
    width: 70%;
    background-color: rgb(190, 225, 226);
}
.imp {
    width: 75%;
    margin-right: 5% ;
    border-radius: 10px;
    border: 1px solid rgb(129, 166, 187);
    text-align: center;}
.btn {
    border: 1px solid rgb(141, 179, 201);
    border-radius: 120px;
    width: 19%;
}
.danger {
    color: red;
    margin-left: 23% ;
    margin-right: 15%;
    margin-top: 2%;
    padding: 1%;
}

.edit{
    color: rgb(122, 80, 199);
    padding: 1%;
}


.lista{
    border: 1px solid black;
    border-radius: 5px;
    padding: 2%;
    justify-content: center;
    margin: 1%;
    width: 100%;
    align-items: center;

}

</style>
