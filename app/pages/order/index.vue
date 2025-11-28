<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useProducts } from "~/composables/useProducts";
import { toast } from "vue3-toastify";

const { products, loading: loadingProducts, error: errorProducts, fetchProducts } = useProducts();
const url = "http://restoran.test/storage/items/";
onMounted(() => {
    fetchProducts();
});

interface OrderItem {
    id: number | string;
    name: string;
    qty: number;
    eachPrice: number;
    price: number;
}

const orders = ref<OrderItem[]>([]);
const orderItem = (id: string) => {
    const item = products.value.find(p => p.id === id);
    if (!item) return;

    const existing = orders.value.find(o => o.id === id);

    if (existing) {
        existing.qty++;
        existing.price = existing.qty * item.price;
    } else {
        orders.value.push({
            id: item.id,
            name: item.name,
            qty: 1,
            eachPrice: item.price,
            price: item.price
        });
    }
};

const increaseItemQty = (order: OrderItem) => {
    order.qty++;
    order.price = order.qty * order.eachPrice;
};

const decreaseItemQty = (order: OrderItem) => {
    if (order.qty > 1) {
        order.qty--;
        order.price = order.qty * order.eachPrice;
    } else {
        deleteItem(order);
    }
};

const deleteItem = (order: OrderItem) => {
    orders.value = orders.value.filter(o => o.id !== order.id);
};

const total = computed(() =>
    orders.value.reduce((sum, i) => sum + i.price, 0)
);

const customerName = ref("");
const tableNo = ref("");
const processing = ref(false);
const { createOrder, loading: loadingOrder, error: errorOrder, success: successOrder} = useOrders();

const submitOrder = async () => {
    if (!customerName.value || !tableNo.value) {
        alert("Customer name & table no wajib diisi!");
        return;
    }

    if (orders.value.length === 0) {
        alert("Order masih kosong!");
        return;
    }

    processing.value = true;

    const payload = {
        customer_name: customerName.value,
        table_no: tableNo.value,
        items: orders.value.map(o => ({
            id: o.id,
            qty: o.qty
        }))
    };

    try {
        const res = await createOrder(payload);
        if (res) {
            console.log("Order berhasil dibuat!", res);

            // reset
            customerName.value = "";
            tableNo.value = "";
            orders.value = [];
        }

        if (successOrder.value) {
            toast.success(successOrder.value, { autoClose: 2000 });
        }

        if (errorOrder.value) {
            toast.error(errorOrder.value, { autoClose: 2000 });
        }
    } finally {
        processing.value = false;
    }
};

const keyword = ref(""); // input pencarian
const filteredItems = computed(() => {
    if (!keyword.value) return products.value;
    return products.value.filter((p) =>
        p.name.toLowerCase().includes(keyword.value.toLowerCase())
    );
});
</script>

<template>
    <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold py-5">Order here</h1>
        <div class="flex flex-col md:flex-row gap-5">

            <!-- LEFT SIDE -->
            <div class="w-full md:w-2/3">

                <!-- Search -->
                <div class="mb-4">
                    <input type="text" v-model="keyword" placeholder="Search..." class="border p-2 rounded" />
                </div>

                <hr class="my-4" />

                <!-- Product Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="item in filteredItems" :key="item.id" class="bg-white rounded shadow border">
                        <img v-if="item.image" :src="url + item.image" class="w-full h-40 object-cover rounded-t" />
                        <img v-else src="/img/nopict.png" class="w-full h-40 object-cover rounded-t" />

                        <div class="p-4 text-center">
                            <h5 class="font-semibold text-lg">{{ item.name }}</h5>
                            <p class="text-gray-600">Rp. {{ item.price }}</p>

                            <button class="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                                @click="orderItem(item.id)">
                                Order
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- RIGHT SIDE ORDER BOX -->
            <div class="w-full md:w-1/3 bg-white p-4 rounded shadow">
                <h2 class="text-xl font-bold mb-4">Order List</h2>

                <!-- Customer Info -->
                <div class="mb-5">
                    <label class="block mb-1 font-medium">Customer Name</label>
                    <input type="text" v-model="customerName" class="w-full border rounded px-3 py-2 mb-3" />

                    <label class="block mb-1 font-medium">Table No.</label>
                    <input type="text" v-model="tableNo" class="w-full border rounded px-3 py-2" />
                </div>

                <hr class="my-4" />

                <!-- Items Ordered -->
                <div class="space-y-3 max-h-64 overflow-y-auto pr-2">

                    <div v-for="order in orders" :key="order.id" class="border-b pb-2">
                        <div class="flex justify-between font-medium">
                            <span>{{ order.name }} (x{{ order.qty }})</span>
                            <span>Rp. {{ order.price }}</span>
                        </div>

                        <div class="text-sm text-gray-600">
                            {{ order.eachPrice }}
                        </div>

                        <div class="mt-2 flex gap-2">
                            <button class="px-3 py-1 border rounded text-blue-600"
                                @click="decreaseItemQty(order)">-</button>

                            <button class="px-3 py-1 border rounded text-green-600"
                                @click="increaseItemQty(order)">+</button>

                            <button class="px-3 py-1 border rounded text-red-600"
                                @click="deleteItem(order)">Delete</button>
                        </div>
                    </div>
                </div>

                <hr class="my-4" />

                <!-- Total -->
                <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>Rp. {{ total }}</span>
                </div>

                <!-- Submit -->
                <button :disabled="processing" @click="submitOrder()"
                    class="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50">
                    {{ processing ? 'Processing Order...' : 'Submit' }}
                </button>
            </div>
        </div>
    </div>

</template>