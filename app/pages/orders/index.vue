<script lang="ts" setup>
import { onMounted } from "vue";
import { useOrders } from "~/composables/useOrders";

const { orders, loading, error, fetchOrders } = useOrders();
const keyword = ref(""); // input pencarian

onMounted(() => {
    fetchOrders();
});

// computed untuk filter customer_name sesuai keyword
const filteredOrders = computed(() => {
    if (!keyword.value) return orders.value;
    return orders.value.filter((p) =>
        p.customer_name.toLowerCase().includes(keyword.value.toLowerCase())
    );
});
</script>
<template>
    <div class="container">
        <h2 class="text-4xl font-bold my-5">Order List</h2>

        <div v-if="loading" class="py-5">Loading...</div>

        <div v-else-if="error" class="py-5">{{ error }}</div>
        <div v-else class="py-5">
            <div class="mb-3 flex justify-between items-center">
                <input type="text" v-model="keyword" placeholder="Search Customer Name..." class="border p-2 rounded" />
            </div>
            <table class="table-auto w-full border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border px-4 py-2">#</th>
                        <th class="border px-4 py-2">Customer Name</th>
                        <th class="border px-4 py-2">Table No.</th>
                        <th class="border px-4 py-2">Order Date</th>
                        <th class="border px-4 py-2">Time</th>
                        <th class="border px-4 py-2">Total</th>
                        <th class="border px-4 py-2">Status</th>
                        <th class="border px-4 py-2">Waitress</th>
                        <th class="border px-4 py-2">Cashier</th>
                        <th class="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in filteredOrders" :key="index" class="hover:bg-gray-50">
                        <td class="border px-4 py-2">{{ index + 1 }}</td>
                        <td class="border px-4 py-2">{{ order.customer_name }}</td>
                        <td class="border px-4 py-2">{{ order.table_no }}</td>
                        <td class="border px-4 py-2">{{ order.order_date }}</td>
                        <td class="border px-4 py-2">{{ order.order_time }}</td>
                        <td class="border px-4 py-2">{{ order.total }}</td>
                        <td class="border px-4 py-2">{{ order.status }}</td>
                        <td class="border px-4 py-2">{{ order.waitress?.name}}</td>
                        <td class="border px-4 py-2">{{ order.cashier?.name }}</td>
                        <td class="border px-4 py-2">
                            <NuxtLink :to="`/order/update/${order.id}`"
                                class="bg-blue-500 text-white px-2 py-1 rounded">
                                Update
                            </NuxtLink>
                        </td>
                    </tr>
                    <tr v-if="filteredOrders.length === 0">
                        <td class="border px-4 py-2 text-center" colspan="6">No order found</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div></div>
    </div>
</template>