<script lang="ts" setup>
import { onMounted } from "vue";
import { useOrders } from "~/composables/useOrders";

const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
];
const month = ref("");

interface OrderItem {
  id: number;
  customer_name: string;
  table_no: string;
  order_date: string;
  order_time: string;
  total: number;
  status: string;
  waitress: { name: string } | null;
  cashier: { name: string } | null;
}

interface OrderReport {
  orderCount: number;
  minPayment: number;
  maxPayment: number;
  orders: OrderItem[];
}

const data = ref<OrderReport>({
    orderCount: 0,
    minPayment: 0,
    maxPayment: 0,
    orders: [],
});

const { orders, loading, error, fetchOrderReport } = useOrders();

const getReport = async () => {
  const res = await fetchOrderReport({ month: month.value });

  if (res?.data) {
    data.value = res.data;
  }
};

onMounted(() => {
    getReport();
});


</script>
<template>
    <div class="max-w-6xl mx-auto py-8 px-4">

        <h2 class="text-3xl font-bold text-center mb-6">Order Report</h2>

        <!-- Month Selector -->
        <div class="w-full sm:w-64 mb-6">
            <label class="block mb-1 font-medium">Month</label>
            <select v-model="month" @change="getReport" class="w-full border rounded px-3 py-2">
                <option value="">Choose Month Period</option>
                <option v-for="m in months" :key="m.value" :value="m.value">
                    {{ m.name }}
                </option>
            </select>
        </div>

        <!-- Summary Boxes -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="border rounded p-6 text-center shadow bg-white">
                <p class="font-medium text-lg">Order Count</p>
                <p class="text-2xl font-bold mt-2">{{ data.orderCount }}</p>
            </div>
            <div class="border rounded p-6 text-center shadow bg-white">
                <p class="font-medium text-lg">Min Payment</p>
                <p class="text-2xl font-bold mt-2">Rp. {{ data.minPayment }}</p>
            </div>
            <div class="border rounded p-6 text-center shadow bg-white">
                <p class="font-medium text-lg">Max Payment</p>
                <p class="text-2xl font-bold mt-2">Rp. {{ data.maxPayment }}</p>
            </div>
        </div>

        <hr class="my-10">

        <!-- Order Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded shadow">
                <thead class="bg-gray-100 border-b">
                    <tr>
                        <th class="px-4 py-2 text-left">#</th>
                        <th class="px-4 py-2 text-left">Customer</th>
                        <th class="px-4 py-2 text-left">Table No.</th>
                        <th class="px-4 py-2 text-left">Order Date</th>
                        <th class="px-4 py-2 text-left">Time</th>
                        <th class="px-4 py-2 text-left">Total</th>
                        <th class="px-4 py-2 text-left">Status</th>
                        <th class="px-4 py-2 text-left">Waitress</th>
                        <th class="px-4 py-2 text-left">Cashier</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in data.orders" :key="order.id" 
                     class="border-b odd:bg-white even:bg-amber-300 hover:bg-gray-100">
                        <td class="px-4 py-2">{{ index + 1 }}</td>
                        <td class="px-4 py-2">{{ order.customer_name }}</td>
                        <td class="px-4 py-2">{{ order.table_no }}</td>
                        <td class="px-4 py-2">{{ order.order_date }}</td>
                        <td class="px-4 py-2">{{ order.order_time }}</td>
                        <td class="px-4 py-2">{{ order.total }}</td>
                        <td class="px-4 py-2">{{ order.status }}</td>
                        <td class="px-4 py-2">{{ order.waitress?.name }}</td>
                        <td class="px-4 py-2">{{ order.cashier?.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>