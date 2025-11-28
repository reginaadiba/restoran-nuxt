<template>
  <div>
    <HeroBanner />

    <section class="mt-12">
      <h2 class="text-2xl font-bold mb-6">Menu Populer</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FoodCard
          v-for="(m, i) in popular"
          :key="i"
          :item="m"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useHead ({
  title: 'RestoranKu'
});

import FoodCard from "~/components/card/FoodCard.vue"
import HeroBanner from "~/components/hero/HeroBanner.vue"

const popular = [
  {
    name: "Nasi Goreng Spesial",
    slug: "nasi-goreng-spesial",
    price: 25000,
    image: "/img/nasigoreng.jpg",
  },
  {
    name: "Ayam Bakar",
    slug: "ayam-bakar",
    price: 30000,
    image: "/img/ayambakar.jpg",
  },
]
</script>