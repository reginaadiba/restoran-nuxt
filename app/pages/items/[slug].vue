<template>
  <div class="bg-white rounded-xl shadow p-6">
    <img :src="food.image" class="w-full h-64 object-cover rounded-lg" />

    <h1 class="text-3xl font-bold mt-4">{{ food.name }}</h1>
    <p class="text-2xl text-red-600 font-bold mb-4">
      Rp {{ food.price }}
    </p>

    <p class="text-gray-700 leading-relaxed">
      {{ food.description }}
    </p>
  </div>
</template>

<script setup>
import { useMenu } from "~/composables/useMenu"

const route = useRoute()
const { getFood } = useMenu()

const food = getFood(route.params.slug)
</script>