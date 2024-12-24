import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthApi from "@/api/AuthApi";
import { logout } from "@/utils/utils";

const useTokenValidation = () => {
    const router = useRouter();

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const res = await AuthApi.validateToken();

                if (!res?.data?.isValid) {
                    logout();
                }
            } catch (error) {
                logout();
            }
        };

        checkTokenValidity();
    }, [router]);
};

export default useTokenValidation;
