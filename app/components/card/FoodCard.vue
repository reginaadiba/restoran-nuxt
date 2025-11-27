<template>
  <NuxtLink
    :to="`/items/${item.slug}`"
    class="block bg-white shadow rounded-xl overflow-hidden hover:scale-[1.02] transition"
  >
    <img :src="item.image" class="w-full h-48 object-cover" />

    <div class="p-4">
      <h3 class="text-xl font-semibold">{{ item.name }}</h3>
      <p class="text-red-600 font-bold text-lg">Rp {{ item.price }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  item: Object
})
</script>