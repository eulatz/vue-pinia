
<template>                       
    <a-row>
        
        <a-col :xs="{span: 24}" :sm="{ span:12 ,offset:6 }" >
        <div>
            <h1 class="text-center">Registrar</h1>

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

             <a-form-item 
                name="repassword" 
                label="Repite tu Contraseña" 
                :rules="[{ validator: validatePass }]">
                
                <a-input-password 
                    v-model:value="formState.repassword" 
                    placeholder="Repite tu contraseña" />  
            </a-form-item>
                
            <a-form-item>
                    <a-button 
                    type="primary" 
                    html-type="submit"
                    :disabled ="userStore.loadingUser"
                    :loading="userStore.loadingUser">Registrar</a-button>
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

    const handleSubmit = async() => {    
    await userStore.registerUser(formState.email, formState.password)}
    
const onFinish = async(values) => {
    console.log('Success:',values)
    
    const error =await userStore.registerUser(formState.email,formState.password)
    if (!error) {
        return message.success("usuario registrado con exito")
    }
    switch (error) {
        case 'auth/email-already-in-use':
            alert('El correo ya esta en uso')
            break;
        case 'auth/invalid-email':
            alert('El correo no es valido')
            break;
        case 'auth/weak-password':
            alert('La contraseña es muy debil')
            break;
        default:
            alert('Hubo un error, intenta de nuevo mas tarde')
            break;
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Falied:',errorInfo)
}

const formState = reactive({
        email: 'laliosmp@gmail.com',
        password: '123123123',
        repassword: ''
    })

const validatePass = async (_rule, value) => {
    if (!value) {
        return Promise.reject('Por favor introduce nuevamente tu contraseña')
    }
    if (value !== formState.password) {
        return Promise.reject('Las contraseñas no coinciden')
    }
    return Promise.resolve()
}

</script>
