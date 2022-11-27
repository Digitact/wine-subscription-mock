import clsx from 'clsx';
import { useStoreContext } from '@/store/context';

export function FlowSelection({ className }: { className?: string }) {
    const { state } = useStoreContext();

    const selectedProduct = state.products.find((product) => product.shopify_id === state.selectedProductId);

    const selectedPlanGroup = state.sellingPlanGroups.find(
        (plan) => plan.shopify_id === state.selectedSellingGroupPlanId,
    );
    const selectedPlan = state.sellingPlans.find((plan) => plan.shopify_id === state.selectedSellingPlanId);

    return (
        <div className={clsx(className, 'flex mb-4 w-full -mx-3')}>
            {selectedProduct && (
                <div className="w-1/4 px-3">
                    <strong>Your Product:</strong> {selectedProduct?.product_title}
                </div>
            )}
            {selectedPlanGroup && (
                <div className="w-1/4 px-3">
                    <strong>Your Subscription:</strong> {selectedPlanGroup?.name}
                </div>
            )}
            {selectedPlan && (
                <div className="w-1/4 px-3">
                    <strong>Your Delivery frequency:</strong> {selectedPlan?.name}
                </div>
            )}
            {state.caseItems.length > 0 && (
                <div className="w-1/4 px-3">
                    <p>
                        <strong>Selected Wines:</strong>
                    </p>
                    {state.caseItems.map((item, index) => (
                        <p key={item.title} className="my-2">
                            {item.quantity} x {item.title}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
