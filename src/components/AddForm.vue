<script setup>
import { reactive } from 'vue';
import { useUserStore } from '../stores/user.js';
import { useDatabaseStore } from '../stores/database.js';
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore()
const userStore = useUserStore();

const formState = reactive({
    url: ''
})

const onFinish=async (value)=> {
    console.log("todo correcto" + value);
    const error = await databaseStore.addUrl(formState.url)
    if (!error) {
        formState.url = ""
        return message.success("URL agregada con exito")
    }
    switch (error) {
        
        default:
            message.error("Error al iniciar sesión")
            break;
    }

    
}
</script>



<template>
    <a-form
        name="addform"
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
            <a-button type="primary" html-type="submit" :disabled="databaseStore.loading" :loading="databaseStore.loading">Agregar URL</a-button>
        </a-form-item>
    </a-form>
</template>