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

    return {
        orders,
        loading,
        error,
        success,
        token,
        createOrder,
    };
}
