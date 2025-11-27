<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Semua Menu</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FoodCard
        v-for="(m, i) in menu"
        :key="i"
        :item="m"
      />
    </div>
  </div>
</template>

<script setup>
import FoodCard from "~/components/card/FoodCard.vue"
import { useMenu } from "~/composables/useMenu"

const { menu } = useMenu()
</script>