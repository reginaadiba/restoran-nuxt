export function useProducts() {
    const products = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const { token } = useAuth();

    interface Product {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
    }

    interface ProductResponse {
        data: Product[];
    }

    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;

        try {
            const res = await $fetch<ProductResponse>("http://restoran.test/api/item", {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });
            console.log(res);
            products.value = res.data ?? res;
        } catch (err: any) {
            error.value = err.message || "Gagal memuat produk";
        } finally {
            loading.value = false;
        }
    };

    return { products, loading, error, fetchProducts };
}