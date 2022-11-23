import { useStoreContext } from '@/store/context';
import { Product } from '@/utils/types';
import { selectProduct } from '@/store/actions';
import { WineList } from './WineList';

export function SubscriptionGroupsPicker() {
    const { state, dispatch } = useStoreContext();

    const selectGroup = (product: Product) => {
        dispatch(selectProduct(product));
    };

    const prodCols = state.products.map((product) => (
        <div className="inline-flex items-stretch flex-grow w-1/5 p-4 border border-gray-300" key={product.shopify_id}>
            <button className="flex flex-col items-start w-full p-3" onClick={() => selectGroup(product)}>
                <div className="mb-6">
                    <img src={product.image} className="max-h-full" alt={product.product_title} />
                </div>
                <h4 className="text-2xl">{product.product_title}</h4>
                <p className="text-base">{product.product_description}</p>
                <WineList wines={product.product_case.product_case_wines} />
            </button>
        </div>
    ));

    const selectedProduct = state.products.find((product) => product.shopify_id === state.selectedProductId);

    return (
        <>
            {selectedProduct && (
                <p>
                    <b>Your product</b>
                    {selectedProduct?.product_title}
                </p>
            )}

            <div className="flex">{prodCols}</div>
        </>
    );
}
