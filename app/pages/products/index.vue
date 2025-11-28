<script setup>
    const url = "http://restoran.test/storage/items/";
    const { data: items, pending, error } = await useFetch(
    "http://restoran.test/api/items"
    )
</script>
<template>
    <div class="container">
        <h2 class="my-5">Product List</h2>

        <NuxtLink href="/product/add" class="btn btn-success mb-3">Add Product</NuxtLink>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>Rp {{ item.price }}</td>
                    <td>
                        <img v-if="item.image" :src="url + item.image" style="width: 100px; height: 100px;"
                            class="object-fit-cover">
                        <img v-else src="/img/nopict.png" class="w-full h-48 object-cover" />
                    </td>
                    <td>
                        <RouterLink :to="{ name: 'productUpdate', params: { productId: item.id } }">Edit</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
        <div></div>
    </div>
</template>