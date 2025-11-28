export default defineNuxtRouteMiddleware((to) => {
  const token = useState("token");

  // Jika tidak punya token → redirect ke login
  if (!token.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Jika sudah login → jangan masuk ke /login
  if (token.value && to.path === "/login") {
    return navigateTo("/");
  }
});
