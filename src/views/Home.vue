
<template>
        <h1>Home</h1>
        <p>Bienvenido: {{ userStore.userData?.email }}</p>
        
        <add-form>
        </add-form>

        <p v-if="databaseStore.loadingDoc">Cargando Documentos...</p>


    <a-space 
        direction="vertical"
        v-if="!databaseStore.loadingDoc"
        style="width: 100%">
        
        <a-card
        v-for="item in databaseStore.documents" 
        :key="item.id" 
        :title="item.short" 
        style="width:100%;">
            <template #extra> 
                <a-space direction="horizontal" style="width:100%" v-if="!databaseStore.loadingDoc">
                    
                    <a-popconfirm
                        title="Estas seguro con la eliminacion de esta URL?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="confirm(item.id)"
                        @cancel="cancel">
                            <a-button danger
                            :disabled="databaseStore.loading"
                            :loading ="databaseStore.loading"
                            >
                                Eliminar
                            </a-button>
                    </a-popconfirm>
                
                    <a-button type="primary" @click="router.push(`/editar/${item.id}`)">
                        Editar
                    </a-button>
                </a-space>
            </template>
            <p>Url Extensa: {{ item.name }} </p>
        </a-card>
    </a-space>
</template>


<script setup>
// ---Imports --- //
import {useUserStore} from '../stores/user.js'
import { useDatabaseStore } from '../stores/database.js';
import { useRouter } from 'vue-router';
import AddForm from '../components/AddForm.vue';
import { message } from 'ant-design-vue';

// --- Stores --- //
const userStore = useUserStore();
const databaseStore = useDatabaseStore()
const router = useRouter()
databaseStore.getUrls()

// ---Logicas --- //
const confirm =async(id) => { 
    const error =  await databaseStore.deleteUrl(id)
    if(!error) return message.success('Url eliminada con exito')
        return message.error(error)
}
const cancel =() => { message.error('Url no eliminada')}

</script>


