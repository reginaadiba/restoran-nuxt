<script lang="ts" setup>
import { ref } from "vue";
import { useProducts } from "~/composables/useProducts";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const name = ref("");
const category = ref("");
const price = ref<number | null>(null);
const image = ref<File | null>(null);

const categories = ["Food", "Drink", "Snacks"];

const { createProduct, loading, error, success } = useProducts();

const handleFileChange = (e: any) => {
    image.value = e.target.files[0];
};

const submitProduct = async () => {
    if (!name.value || !category.value || !price.value) {
        toast.error("Semua field wajib diisi!", { autoClose: 2000 });
        return;
    }

    const form = new FormData();
    form.append('name', name.value);
    form.append('price', price.value.toString());
    form.append('category', category.value);

    if (image.value) {
        form.append('image_file', image.value);
    }

    const res = await createProduct(form);

    if (success.value) {
        toast.success(success.value);
        //reset
        name.value = "";
        category.value = "";
        price.value = null;
        image.value = null;
    }

    if (error.value) {
        toast.error(error.value);
    }
}

</script>
<template>
    <div class="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
        <h1 class="text-2xl font-bold mb-4">Add New Product</h1>

        <!-- Name -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Product Name</label>
            <input type="text" v-model="name" class="w-full border px-3 py-2 rounded" placeholder="e.g. Nasi Goreng" />
        </div>

        <!-- Category -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Category</label>
            <select v-model="category" class="w-full border px-3 py-2 rounded">
                <option value="" disabled>Pilih kategori</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
        </div>

        <!-- Price -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Price</label>
            <input type="number" v-model="price" class="w-full border px-3 py-2 rounded" placeholder="e.g. 15000" />
        </div>

        <!-- Image -->
        <div class="mb-4">
            <label class="block mb-1 font-medium">Product Image</label>
            <input type="file" name="image_file" accept="image/*" @change="handleFileChange" class="w-full" />
        </div>

        <!-- Submit Button -->
        <button @click="submitProduct" :disabled="loading"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-40">
            {{ loading ? "Saving..." : "Add Product" }}
        </button>
    </div>
</template>