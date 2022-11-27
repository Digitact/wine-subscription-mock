import { useStoreContext } from '@/store/context';
import { SellingPlanGroup } from '@/utils/types';
import { incrementStep, selectSellingPlanGroup } from '@/store/actions';
import { FlowSelection } from '../FlowSelection';

export function SubscriptionTypePicker() {
    const { state, dispatch } = useStoreContext();
    const sellingPlanGroups = state.sellingPlanGroups;

    const selectPlan = (plan: SellingPlanGroup) => {
        dispatch(selectSellingPlanGroup(plan));
        dispatch(incrementStep());
    };

    const cols = sellingPlanGroups.map((plan) => (
        <div key={plan.shopify_id} className="p-2 d-flex align-items-stretch product-button align-self-center">
            <button className="flex-col p-3 d-flex align-items-start w-100" onClick={() => selectPlan(plan)}>
                <h4>{plan.name}</h4>
                <p dangerouslySetInnerHTML={{ __html: plan.description }}></p>
            </button>
        </div>
    ));

    return (
        <div>
            <FlowSelection />
            <div className="flex justify-center">{cols}</div>
        </div>
    );
}
