<template>
    <div>

        <h1>Editar id :  {{route.params.id}} </h1>
        
        <form @submit.prevent="handdleSubmit">
            <input type="text" placeholder="Modifica aqui el Url" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';

const databaseStore = useDatabaseStore()
const route = useRoute()

const handdleSubmit =() => {
databaseStore.updateUrl(route.params.id, url.value)    }
    const url= ref('')

    onMounted(async()=> {
       url.value = await databaseStore.leerUrl(route.params.id)
    })

//console.log(route.params)

</script>