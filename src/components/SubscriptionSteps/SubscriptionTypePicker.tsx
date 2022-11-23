import { useEffect } from 'react';
import { useStoreContext } from '@/store/context';
import { SellingPlanGroup } from '@/utils/types';
import { selectSellingPlan } from '@/store/actions';

export function SubscriptionTypePicker() {
    const { state, dispatch } = useStoreContext();
    const sellingPlanGroups =
        state.products.find((product) => product.shopify_id === state.selectedProductId)?.selling_plan_groups ?? [];

    const selectPlan = (plan: SellingPlanGroup) => {
        dispatch(selectSellingPlan(plan.shopify_id));
    };

    useEffect(() => {
        if (sellingPlanGroups.length === 1) {
            dispatch(selectSellingPlan(sellingPlanGroups[0].shopify_id));
        }
    }, [sellingPlanGroups, dispatch]);

    const cols = sellingPlanGroups.map((plan) => (
        <div key={plan.id} className="m-2 d-flex align-items-stretch product-button align-self-center">
            <button className="flex-col p-3 d-flex align-items-start w-100" onClick={() => selectPlan(plan)}>
                <h4>{plan.name}</h4>
                <p dangerouslySetInnerHTML={{ __html: plan.description }}></p>
            </button>
        </div>
    ));

    const selectedPlan = state.products
        .find((product) => product.shopify_id === state.selectedProductId)
        ?.selling_plan_groups.find((plan) => plan.id === state.selectedSellingPlanId);

    return (
        <div>
            <div>
                <p>
                    <b>Your susbcription: </b>
                    {selectedPlan?.name}
                </p>
            </div>
            <div className="flex justify-center">{cols}</div>
        </div>
    );
}
