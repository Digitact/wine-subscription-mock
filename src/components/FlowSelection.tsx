import { useStoreContext } from '@/store/context';

export function FlowSelection() {
    const { state } = useStoreContext();

    const selectedProduct = state.products.find((product) => product.shopify_id === state.selectedProductId);

    const selectedPlanGroup = state.sellingPlanGroups.find(
        (plan) => plan.shopify_id === state.selectedSellingGroupPlanId,
    );
    const selectedPlan = state.sellingPlans.find((plan) => plan.shopify_id === state.selectedSellingPlanId);

    return (
        <div className="flex mb-4">
            {selectedProduct && (
                <div className="w-1/5">
                    <strong>Your Product:</strong> {selectedProduct?.product_title}
                </div>
            )}
            {selectedPlanGroup && (
                <div className="w-1/5">
                    <strong>Your Subscription:</strong> {selectedPlanGroup?.name}
                </div>
            )}
            {selectedPlan && (
                <div className="w-1/5">
                    <strong>Your Delivery frequency:</strong> {selectedPlan?.name}
                </div>
            )}
            {state.caseItems.length > 0 && (
                <div className="w-1/5">
                    <p>
                        <strong>Selected Wines:</strong>
                    </p>
                    {state.caseItems.map((item, index) => (
                        <p key={item.title} className="my-2">
                            Wine {index + 1}: {item.quantity} {item.title}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
