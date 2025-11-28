<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useProducts } from "~/composables/useProducts";

const { products, loading, error, fetchProducts } = useProducts();
const url = "http://restoran.test/storage/items/";
const search = ref(""); // input pencarian

onMounted(() => {
    fetchProducts();
});

const router = useRouter();

const goToAddProduct = () => {
    router.push('/products/add');
};

// computed untuk filter produk sesuai search
const filteredProducts = computed(() => {
    if (!search.value) return products.value;
    return products.value.filter((p) =>
        p.name.toLowerCase().includes(search.value.toLowerCase())
    );
});
</script>
<template>
    <div class="container">
        <h2 class="my-5">Product List</h2>

        <button @click="goToAddProduct" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Product
        </button>

        <div v-if="loading" class="py-5">Loading...</div>

        <div v-else-if="error" class="py-5">{{ error }}</div>
        <div v-else class="py-5">
            <div class="mb-3 flex justify-between items-center">
                <input type="text" v-model="search" placeholder="Search products..." class="border p-2 rounded" />
            </div>
            <table class="table-auto w-full border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border px-4 py-2">ID</th>
                        <th class="border px-4 py-2">Category</th>
                        <th class="border px-4 py-2">Name</th>
                        <th class="border px-4 py-2">Price</th>
                        <th class="border px-4 py-2">Image</th>
                        <th class="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredProducts" :key="item.id" class="hover:bg-gray-50">
                        <td class="border px-4 py-2">{{ item.id }}</td>
                        <td class="border px-4 py-2">{{ item.category }}</td>
                        <td class="border px-4 py-2">{{ item.name }}</td>
                        <td class="border px-4 py-2">{{ item.price }}</td>
                        <td class="border px-4 py-2">
                            <img v-if="item.image" :src="url + item.image" style="width: 100px; height: 100px;"
                                class="object-fit-cover">
                            <img v-else src="/img/nopict.png" style="width: 100px; height: 100px;"
                                class="object-fit-cover" />
                        </td>
                        <td class="border px-4 py-2">
                            <NuxtLink :to="`/products/update/${item.id}`"
                                class="bg-blue-500 text-white px-2 py-1 rounded">
                                Update
                            </NuxtLink>
                        </td>
                    </tr>
                    <tr v-if="filteredProducts.length === 0">
                        <td class="border px-4 py-2 text-center" colspan="6">No products found</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div></div>
    </div>
</template>