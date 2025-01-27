

export default defineNuxtRouteMiddleware(() => {
    // Tenta buscar o token nos cookies
    const token = useCookie('token').value;

    if (!token) {
        // Redireciona o usuário para a página de login se o token não estiver presente
        return navigateTo('/');
    }

});
