import { useEffect, useState } from 'react';
import { useStoreContext } from '@/store/context';
import { useAddToCartMutation } from '@/hooks/useAddToCartMutation';
import { FlowSelection } from '../FlowSelection';

export function AddToCart() {
    const { state } = useStoreContext();
    const [errorMessage, setErrorMessage] = useState('');
    const { mutate, isError, isLoading, data, isSuccess, error } = useAddToCartMutation();

    const selectedProduct = state.products.find((product) => product.shopify_id === state.selectedProductId);

    useEffect(() => {
        if (isError && error) {
            setErrorMessage(error.message);
        }
        if (isSuccess && data) {
            window.goCartInstance.addItemToCartHandler(data);
        }
    }, [isError]);

    const addToShopify = () => {
        setErrorMessage('');

        const properties = state.caseItems.reduce<Record<string, string>>((props, item, index) => {
            props[`Wine ${index + 1}`] = `${item.quantity} x ${item.title}`;
            return props;
        }, {});

        const formData = {
            items: [
                {
                    id: state.selectedProductId,
                    quantity: 1,
                    selling_plan: state.selectedSellingPlanId,
                    properties: properties,
                },
            ],
        };

        mutate(formData);
    };

    return (
        <div>
            <h3>Your subscription is ready.</h3>
            <FlowSelection />
            <div className="my-4">
                <div>
                    <div className="w-1/4">
                        <img src={selectedProduct?.image} className="w-full" alt={selectedProduct?.product_title} />
                    </div>
                    <div>
                        <button
                            className="w-full px-8 py-4 text-white bg-black"
                            disabled={isLoading}
                            onClick={addToShopify}
                        >
                            Add To Cart
                        </button>
                        {errorMessage !== '' ? <div className="mt-2 alert alert-danger">{errorMessage}</div> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}
