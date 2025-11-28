<script setup>
    const { user, role, logout } = useAuth()
</script>

<template>
    <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-red-600">
              RestoranKu
            </NuxtLink>

            <div class="hidden md:flex gap-6 text-lg">
                <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
                <NuxtLink v-if="role === '4' || role === '1'" to="/order" class="hover:text-blue-600">Order</NuxtLink>
                <NuxtLink v-if="role === '4' || role === '2' || role === '3'" to="/order-list" class="hover:text-blue-600">Order List</NuxtLink>
                <NuxtLink v-if="role === '4'" to="/order-report" class="hover:text-blue-600">Order Report</NuxtLink>
                <NuxtLink v-if="role === '4'" to="/products" class="hover:text-blue-600">Products</NuxtLink>

                <!-- Logout -->
                <button @click="logout" class="text-red-600 font-semibold">
                  <span v-if="user">({{ user.email }})</span>
                  Logout
                </button>
            </div>
        </div>
    </nav>
</template>