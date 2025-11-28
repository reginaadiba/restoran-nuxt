interface OrderItem {
    id: string | number;
    qty: number;
}

interface Order {
    id: string;
    customer_name: string;
    table_no: string;
    items: OrderItem[];
}

export interface OrderForm {
    customer_name: string;
    table_no: string | number;
    items: OrderItem[];
}

interface OrderResponse {
    data: Order[];
}

export function useOrders() {
    const orders = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref<string | null>(null);
    const { token } = useAuth();

    const createOrder = async (payload: OrderForm) => {
        loading.value = true;
        error.value = null;
        success.value = null;

        try {
            const res = await $fetch("http://restoran.test/api/order", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
                body: payload,
            });

            success.value = "Order berhasil dibuat!";

            return res;
        } catch (err: any) {
            error.value = err?.data?.message || err.message || "Gagal membuat order";
            return null;
        } finally {
            loading.value = false;
        }
    };

    const fetchOrders = async () => {
        loading.value = true;
        error.value = null;

        try {
            const res = await $fetch<OrderResponse>("http://restoran.test/api/order", {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            console.log(res);
            orders.value = res.data ?? res;
        } catch (err: any) {
            error.value = err.message || "Gagal memuat Order List";
        } finally {
            loading.value = false;
        }
    };

    const fetchOrderReport = async (query: any = {}): Promise<any> => {
        loading.value = true;
        error.value = null;

        try {
            const res = await $fetch("http://restoran.test/api/order-report", {
                method: "GET",
                query: query,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            return res;
        } catch (err: any) {
            error.value = err?.data?.message || err.message || "Gagal memuat Order Report";
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        orders,
        loading,
        error,
        success,
        token,
        createOrder,
        fetchOrders,
        fetchOrderReport
    };
}
