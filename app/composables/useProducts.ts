import axios from "axios";

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

export function useProducts() {
    const products = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref<string | null>(null);
    const { token } = useAuth();

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

    const createProduct = async (formData: FormData) => {
        loading.value = true;
        error.value = null;
        success.value = null;

        try {
            const res = await axios.post(
                "http://restoran.test/api/item",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            success.value = "Product berhasil ditambahkan!";
            return res.data;

        } catch (err: any) {
            error.value = err?.message || "Gagal menambah product";
        } finally {
            loading.value = false;
        }
    }

    

    const updateProduct = async (formData: FormData) => {
        loading.value = true;
        error.value = null;
        success.value = null;

        try {
            // const res = await axios.post
            
        } catch (err: any) {
            error.value = err?.message || "Gagal mengubah product";
        } finally {
            loading.value = false;
        }
    }

    return { products, loading, error, success, fetchProducts, createProduct };
}