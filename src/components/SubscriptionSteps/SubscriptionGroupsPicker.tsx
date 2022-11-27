import { useStoreContext } from '@/store/context';
import { Product } from '@/utils/types';
import { incrementStep, selectProduct } from '@/store/actions';
import { WineList } from './WineList';

export function SubscriptionGroupsPicker() {
    const { state, dispatch } = useStoreContext();

    const selectGroup = (product: Product) => {
        dispatch(selectProduct(product));
        dispatch(incrementStep());
    };

    const prodCols = state.products.map((product) => (
        <div
            className="inline-flex items-stretch flex-grow w-1/2 p-4 border border-gray-300 sm:w-1/3 lg:w-1/6"
            key={product.shopify_id}
        >
            <button className="flex flex-col items-start w-full" onClick={() => selectGroup(product)}>
                <div className="mb-6">
                    <img src={product.image} className="max-h-full" alt={product.product_title} />
                </div>
                <h4 className="text-2xl">{product.product_title}</h4>
                <p className="text-base">{product.product_description}</p>
                <WineList wines={product.product_case.product_case_wines} />
            </button>
        </div>
    ));

    return (
        <>
            <div className="flex flex-wrap">{prodCols}</div>
        </>
    );
}
