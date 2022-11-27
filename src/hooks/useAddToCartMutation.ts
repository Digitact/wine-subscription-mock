import { useMutation } from '@tanstack/react-query';
import { getError } from '@/utils/getError';
import { isErrorResponse } from '@/utils/typeGuards';
import { ShopifyErrorResponse } from '@/utils/types';

interface Product {
    id: string;
    quantity: number;
    selling_plan: string;
    properties: Record<string, string>;
}

interface CartBody {
    items: Product[];
}

const cartUrl = `//${window.permanent_domain}${window.Shopify?.routes?.root ?? '/'}cart/add.js`;

async function postAddProduct(body: CartBody) {
    const response = await fetch(cartUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await (response.json() as PromiseLike<CartBody | ShopifyErrorResponse>);

    if (!response.ok && isErrorResponse(data)) {
        throw new Error(getError(data.message));
    }
    return data;
}

export const useAddToCartMutation = () => {
    return useMutation<CartBody | ShopifyErrorResponse, Error, CartBody>(postAddProduct);
};
