<template>
    <h1>Editar id :  {{route.params.id}} </h1>
        <a-form
            name="editform"
            autocomplete="off"
            layout="vertical"
            :model="formState"
            @finish="onFinish">

                <a-form-item
                    name ='url'
                    label="ingresa Url"
                    :rules="[{
                        required:true,
                        whitespace: true,
                        pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                        message: 'ingresa URL valida'
                    }]">

                    <a-input v-model:value="formState.url"></a-input>

                </a-form-item>
            
                <a-form-item>
                    <a-space>
                        <a-button type="primary" html-type="submit" :disabled="databaseStore.loading" :loading="databaseStore.loading">Editar URL</a-button>
                        
                         <a-popconfirm
                            title="Estas seguro con la eliminacion de esta URL?"
                            ok-text="Yes"
                            cancel-text="No"
                                @confirm="() => confirm(route.params.id)"   
                                @cancel="() => cancel()">
                                <a-button danger
                                    :disabled="databaseStore.loading"
                                    :loading ="databaseStore.loading"
                                >
                                    Eliminar Url
                                </a-button>
                    </a-popconfirm>

                        <a-button type="primary" html-type="submit" :disabled="databaseStore.loading" :loading="databaseStore.loading">
                            <RouterLink to="/">Home</RouterLink>
                        </a-button>
                        
                    </a-space>
                </a-form-item>
        </a-form>
</template>


<script setup>
// --- Imports --- //
import { onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.js';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore()
const userStore = useUserStore();
const route = useRoute()
const router = useRouter()
// ---Logicas --- //
const confirm =async(id) => { 
    const error =  await databaseStore.deleteUrl(id)
    if(!error) {
        message.success('Url eliminada con exito')
        router.push('/')
        return 
    } 
const cancel =() => { message.error('Url no eliminada')}    
}


// --- Reactive State --- //
const formState = reactive({url: ''})
const onFinish=async (value)=> {
    console.log("todo correcto" + value);
    const error = await databaseStore.updateUrl(route.params.id, formState.url)
    if (!error) {
        formState.url = ""
        return message.success("URL Editada con exito")
    }
        switch (error) {
            default:
                message.error("Error al editar Url")
            break;
        }
    }

// --- Lifecicle Hooks --- //
onMounted(async()=> {
    formState.url = await databaseStore.leerUrl(route.params.id)
    })
</script>