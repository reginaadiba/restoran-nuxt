export function useAuth() {
    // const user = useUser();
    const user = useState<any | null>("user", () => null);
    const token = useState<string | null>("token", () => null);
    const role = useState<string | null>("role", () => null);

    interface LoginResponse {
         data: {
            id: number;
            name: string;
            email: string;
            role_id: number;
            token: string;
        };
    }

    // login
    const login = async (email: string, password: string) => {
        try {
            const res = await $fetch<LoginResponse>("http://restoran.test/api/auth/login", {
                method: "POST",
                body: {
                    email,
                    password,
                    device_name: "browser"
                }
            });
            // console.log(res);
            if (res.data?.token) {
                // login berhasil
                
                user.value = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role_id.toString() // jika butuh string
                };
                token.value = res.data.token;
                role.value = res.data.role_id.toString();
                return { success: true, message: "Login Sukses"};
            } else {
                return { success: false, message: "Login gagal" };
            }
        } catch (error: any) {
            return { success: false, message: error?.message ?? "Login gagal" };
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        role.value = null;

        return navigateTo("/login");
    };

    return { user, token, role, login, logout };
}
