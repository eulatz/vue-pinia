<template>                       
    <a-row>
        
        <a-col :xs="{span: 24}" :sm="{ span:12 ,offset:6 }" >
        <div>
            <h1 class="text-center">Login</h1>

            <a-form 
                name="basicLogin" 
                autocomplete="off"
                layout="vertical"
                :model="formState"
                @finish="onFinish"
                @finishFailed="onFinishFailed">
            
                <a-form-item 
                    name="email" 
                    label="Ingresa tu email" 
                    :rules="[
                        {required: true, message: 'Por favor ingresa un email valido'},
                        {type: 'email', message: 'El formato del Email no es correcto'},
                        {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Por favor corrige caracteres especiales'},
                        {whitespace: true, message: 'La contraseña no debe estar vacia'},
                        ]">

                    <a-input v-model:value="formState.email" placeholder="ejemplo123@example.com">  </a-input>  

                </a-form-item>

                <a-form-item 
                    name="password" 
                    label="Ingresa tu Contraseña" 
                    :rules="[
                        { required: true, message: 'Por favor ingresa una Contraseña' },
                        { min:6, message: 'Por favor ingresa una Contraseña con 6 caracteres'}, 
                        { whitespace: true, message: 'La contraseña no puede estar en blanco' },
                        ]">
                    <a-input-password v-model:value="formState.password" placeholder="aA/123/[,.+-/!?]">  </a-input-password>  
                
                </a-form-item>
                <a-form-item>
                    <a-button 
                    type="primary" 
                    html-type="submit"
                    :disabled="userStore.loadingUser"
                    :loading="userStore.loadingUser"
                    >Ingresar</a-button>
                </a-form-item>
        
            </a-form>

        </div>
        </a-col>
        
    </a-row>

</template>


<script setup>
    import { reactive, ref } from 'vue';
    import { useUserStore } from '../stores/user';
    import { message } from 'ant-design-vue';

    const userStore = useUserStore()

    const formState = reactive({
        email: 'laliosmp@gmail.com',
        password: '123123123'
    })

    const onFinish = async (values) => {
    console.log('Success:',values)
    
    const error =await userStore.loginUser(
        formState.email,
        formState.password
    );
    if (!error) {
        return
    }
    switch (error) {
        case "auth/user-not-found":
            message.error("Usuario no encontrado")
            break;
        case "auth/wrong-password":
            message.error("Contraseña incorrecta")
            break;
        default:
            message.error("Error al iniciar sesión")
            break;
    }

}

    const handleSubmit = async() => {    
    await userStore.loginUser(formState.email, formState.password)}
    

const onFinishFailed = (errorInfo) => {
    console.log('Falied:',errorInfo)
}



</script>


        <!-- <a-row>
            <a-col span="12">12</a-col>
            <a-col span="12">12</a-col>
        </a-row>
        <a-row>
            <a-col span="6">12</a-col>
            <a-col span="6">12</a-col>
            <a-col span="6">12</a-col>
            <a-col span="6">12</a-col>
        
        </a-row>
        -->

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