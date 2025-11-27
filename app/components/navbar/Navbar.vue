<template>
  <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-red-600">
        RestoranKu
      </NuxtLink>

      <div class="hidden md:flex gap-6 text-lg">
        <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
        <NuxtLink to="/order" class="hover:text-red-600">Order</NuxtLink>
        <NuxtLink to="/order-list" class="hover:text-red-600">Order List</NuxtLink>
        <NuxtLink to="/order-report" class="hover:text-red-600">Order Report</NuxtLink>
        <NuxtLink to="/products" class="hover:text-red-600">Products</NuxtLink>
        <NuxtLink to="/logout" class="hover:text-red-600">Logout</NuxtLink>
      </div>
    </div>
  </nav>
</template>