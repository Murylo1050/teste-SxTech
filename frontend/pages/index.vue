<script setup>
import { jwtDecode } from 'jwt-decode';
import { Toaster, toast } from 'vue-sonner';
import { ref } from 'vue';
import { useCookie, navigateTo } from '#app';

const form = ref({
  username: '',
  password: '',
});

const submitForm = async () => {
  try {
    const response = await $fetch('http://localhost:8000/login', {
      method: 'POST',
      body: { username: form.value.username, password: form.value.password },
      credentials: 'include',
    });

    toast.success('Login realizado com sucesso!');

    setTimeout(() => {
      navigateTo(`/dashboard/${form.value.username}`);
    }, 1000);
  } catch (error) {
    const errorMessage = error.response?._data?.message || 'Ocorreu um erro inesperado!';
    toast.error(errorMessage, {
      duration: 5000,
      closeButton: true,
    });
  }
};

onMounted(() => {
  const token = useCookie('token').value;

  if (token) {
    const decodedToken = jwtDecode(token);
  console.log(decodedToken.username);
  navigateTo(`/dashboard/${decodedToken.username}`);
  }

  
});
</script>

<template>
  <div class="flex h-full justify-center items-center bg-blue-100">
    <div class="flex flex-col items-center gap-y-8 bg-white p-10 rounded-2xl shadow-lg shadow-gray-500">
      <h1 class="font-bold text-2xl">LOG-IN</h1>
      <form @submit.prevent="submitForm" class="flex flex-col gap-y-5 items-center">
        <div class="flex flex-col gap-y-3">
          <label for="username" class="font-medium">Usuario:</label>
          <input
            v-model="form.username"
            class="shadow-lg shadow-gray-300 h-10 px-5 placeholder:text-gray-700 rounded-md"
            type="text"
            name="username"
            placeholder="Nome de usuário"
            required
          />
        </div>
        <div class="flex flex-col gap-y-3">
          <label for="password" class="font-medium">Senha:</label>
          <input
            v-model="form.password"
            class="shadow-lg shadow-gray-300 h-10 px-5 placeholder:text-gray-700 rounded-md"
            type="password"
            name="password"
            placeholder="Senha"
            required
          />
        </div>
        <div class="flex flex-col w-fit gap-y-2">
          <button type="submit" class="bg-blue-600 text-white rounded-md w-full px-8 py-1">Enviar</button>
          <button class="bg-blue-500 text-white rounded-md w-full px-8 py-1" @click="navigateTo('/register')">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  </div>
  <Toaster :expand="true" richColors />
</template>
