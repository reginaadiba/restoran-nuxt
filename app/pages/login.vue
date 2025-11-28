<script setup>
definePageMeta({
    layout: "login"
})

const email = ref("")
const password = ref("")

const { login } = useAuth()
const errorMessage = ref("")

async function submit() {
    const { success, message } = await login(email.value, password.value);

    if (success) {
        return navigateTo("/");
    } else {
        errorMessage.value = message;
    }
}
</script>

<template>
    <div class="w-full max-w-md p-6 bg-white shadow rounded-xl">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

        <form @submit.prevent="submit">
            <div class="mb-4">
                <label class="block mb-1 font-semibold">Email</label>
                <input type="email" v-model="email" class="w-full px-4 py-2 border rounded-lg" required>
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold">Password</label>
                <input type="password" v-model="password" class="w-full px-4 py-2 border rounded-lg" required>
            </div>

            <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                Login
            </button>
        </form>

        <p v-if="errorMessage" class="text-red-500 text-center mt-4">
            {{ errorMessage }}
        </p>
    </div>
</template>
