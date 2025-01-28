<script setup>
import { jwtDecode } from 'jwt-decode';

definePageMeta({
    middleware: ['auth'], 
});
const router = useRoute();

const data = ref(null);


onMounted(async () => {
    const token = useCookie('token').value;

    if (!token) {
        throw new Error('Token não encontrado.');
    }

    const decodedToken = jwtDecode(token);
    navigateTo(`/dashboard/${decodedToken.username}`);


    try {
        const response = await fetch(`http://localhost:8000/user/${router.params.user}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${useCookie('token').value}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }

        
        
        data.value = await response.json();
    } catch (error) {
        console.error(error);
        data.value = { error: 'Erro ao carregar os dados' }; 
    }
});
</script>
<template>

<div class="bg-blue-100 h-full">
   
    <button class="bg-white text-black font-bold shadow-md shadow-gray-500 rounded-sm p-1 my-1.5 mx-2" @click="useCookie('token').value = null; navigateTo('/');" >Logout</button>

    <div v-if="data" class="flex flex-col gap-y-5 md:flex-row items-center  h-[90%] [&>div]:bg-white justify-around md:[&>div]:w-[48%]  
       [&>div]:w-[75%]  [&>div]:h-[60%]  [&>div]:rounded-lg [&>div]:items-center [&>div]:flex [&>div]:flex-col
        [&>div]:p-5 [&>div]:shadow-lg [&>div]:shadow-gray-500"> 
        
        <div>
            <h1 class="font-bold text-2xl">Informações da conta</h1>
            <NuxtImg src="/usuario.png" format="png" sizes="100" class="rounded-full my-2"/>
            <div class=" flex flex-col justify-around w-full h-full">
                <div>
                    <span class="font-bold">Nome de usuário:</span> <span> {{ data[0].username }}</span>
                </div>
                <div>
                    <span class="font-bold">Tag: </span><span>{{ data[0].tag }}</span>
                </div>

                <div>
                    <span class="font-bold">ID de usuário:</span><span> {{ data[0].id }}</span>
                </div>

                <div>
                    <span class="font-bold">Email: </span><span>{{ data[0].email }}</span>
                </div>

            </div>
        </div>

        <div > 
            <h1 class="font-bold text-2xl">Informações pessoais</h1>
            <NuxtImg :src="`/${data[0].country}.svg`" format="png" sizes="150" class="rounded-md my-2"/>
            <div class=" flex flex-col justify-around  w-full h-full">
                <div>
                    <span class="font-bold">Pais:</span> <span>{{ data[0].country }}</span>
                </div>
                <div>
                    <span class="font-bold">Bairro:</span> <span> {{ data[0].avenue }}</span>
                </div>
                <div>
                    <span class="font-bold">Rua:</span> <span> {{ data[0].street }}</span>
                </div>
                <div>
                    <span class="font-bold">Numero: </span><span>{{ data[0].number }}</span>
                </div>
                
                
            </div>       
        </div>
    </div>
    <div v-else>
      Carregando...
    </div>

</div>    

   
</template>