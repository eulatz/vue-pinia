<template>
    <div>
        <h1>Register</h1>
        <div>
            <form @submit.prevent="handleSubmit">
                <input type="email" placeholder="IngresarEmail" v-model.trim="email">
                <input type="password" placeholder="IngresarContraseña" v-model.trim="password">
                <button type="submit" :disabled="userStore.loadingUser" >Crear Usuario</button> 
            </form>

        </div>

    </div>

</template>


<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../stores/user';
    //import { useRouter } from 'vue-router';

    const userStore = useUserStore()
    //const router =useRouter()
    
    const email =ref('')
    const password = ref('')

    const handleSubmit = async() => {
        if (!email.value || password.value.length < 6) {
            return alert("Campos incompletos")
        }    
        
        await userStore.registerUser(email.value, password.value)
        //router.push('/')
        
    }
</script>
