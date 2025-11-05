<template>
    <h1 class="text-center">Perfil de usuario: {{ userStore.userData.displayName }} <!-- {{ userStore.userData.photoURL }} --></h1>
    
    <div class="text-center mb-2">
        <a-avatar
            :size="150" 
            :src="userStore.userData.photoURL">
        </a-avatar>
    </div>
    
    <a-form 
                name="basicPerfil" 
                autocomplete="off"
                layout="vertical"
                :model="userStore.userData"
                @finish="onFinish">
            
                <a-form-item 
                    name="email" 
                    label="Su email('No se puede cambiar')" 
                    :rules="[
                        {required: true, message: 'Por favor ingresa un email valido'},
                        {type: 'email', message: 'El formato del Email no es correcto'},
                        {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Por favor corrige caracteres especiales'},
                        {whitespace: true, message: 'La contraseña no debe estar vacia'},
                        ]">

                    <a-input disabled v-model:value="formState.email" placeholder="ejemplo123@example.com">  </a-input>  

                </a-form-item>

                <a-form-item 
                    name="displayName" 
                    label="Ingresar NickName" 
                    :rules="[
                        {required: true, message: 'Por favor ingresa un email valido'},
                        {whitespace: true, message: 'El Display Name no debe estar vacio'},
                        ]">

                    <a-input v-model:value="formState.displayName" placeholder="ejemplo123@example.com">  </a-input>  
                </a-form-item>

                <a-upload
                v-model:file-list="filelist"
                list-type="picture"
                :before-upload="beforeUpload"
                :max-count="1"
                @change="handleChange"
                class="mb-1">
                <a-button
                class="mb-1">Subir foto perfil</a-button>
                </a-upload>

                <a-form-item>
                    <a-button
                    class="mt-1" 
                    type="primary" 
                    html-type="submit"
                    :disabled="userStore.loadingUser"
                    :loading="userStore.loadingUser"
                    >Actualizar Informacion</a-button>
                </a-form-item>
        
            </a-form>
</template>

<script setup>

// --- Imports --- //
    import { reactive, ref } from 'vue';
    import { useUserStore } from '../stores/user';
    import { message } from 'ant-design-vue';

    const userStore = useUserStore()

// --- Reactive State --- //
    const formState = reactive({
        email: userStore.userData?.email,
    })


// --- Upload File --- //
    const filelist = ref([])
    const beforeUpload = (file) => {
        filelist.value = [...filelist.value, file]
        return false
    }

const handleRemove = file => {
    const index = filelist.value.indexOf(file)
    const newFileList = filelist.value.slice()
    newFileList.splice(index,1)
    filelist.value = newFileList
}

    const handleChange = (info) => {
        if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
        console.log(info.file)

    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if( !isJpgOrPng) {
            message.error('Solo se permiten archivos JPG y PNG')
            handleRemove(info.file)
            return
    }
    const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('La imagen debe ser menos a 2MB')
            handleRemove(info.file)
            return   
    }
}
        let resFileList = [...info.fileList]
        resFileList = resFileList.slice(-1)
        resFileList = resFileList.map(file => {
            if(file.response) {
                file.url = file.response.url
            }
            return file
        })
        filelist.value = resFileList
    }
// --- Manejo de cambios en el Upload --- //
const onFinish = async () => {

const error = await userStore.updateUser(
    userStore.userData.displayName,
    filelist.value[0]
)

if (!error) {
    message.success('Perfil actualizado con éxito')
} else if (error === 'storage/unauthorized') {
    message.error('No tienes permiso para subir la imagen')
} else if (error === 'storage/canceled') {
    message.error('La subida fue cancelada')
} else {
    message.error('Ocurrió un error al actualizar el perfil')
}
}


    
const onFinishFailed = (errorInfo) => {
    console.log('Falied:',errorInfo)
}
</script>


<style>
.mb-2 {
    margin-bottom: 2rem;
}
.mb-1 {
    margin-bottom: 1rem;
}
.mt-1 {
    margin-top: 1rem;
}
.width-50 {
    width: 50%;
}
</style>