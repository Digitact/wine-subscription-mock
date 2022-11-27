import { useQuery } from '@tanstack/react-query';
import { Product } from '@/utils/types';

interface ProductResponse {
    products: Product[];
}

const SUBSCRIPTION_URL = `${window.asset_url}/app/api/subscriptionoptions/${window.permanent_domain}`;

export function useSubscriptionsProducts() {
    const { data, error, isLoading, isSuccess, isError } = useQuery<ProductResponse>(['products'], async () => {
        const response = await fetch(SUBSCRIPTION_URL);
        if (!response.ok) throw new Error('Could not get products.');
        return response.json();
    });

    return {
        products: data?.products ?? [],
        isLoading,
        isSuccess,
        isError,
        error,
    };
}
