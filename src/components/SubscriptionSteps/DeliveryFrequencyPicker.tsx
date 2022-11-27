import { useStoreContext } from '@/store/context';
import { SellingPlan } from '@/utils/types';
import { incrementStep, selectSellingPlan } from '@/store/actions';
import { FlowSelection } from '../FlowSelection';

export function DeliveryFrequencyPicker() {
    const { state, dispatch } = useStoreContext();

    const deliveryDetails = state.sellingPlans;

    const selectDelivery = (plan: SellingPlan) => {
        dispatch(selectSellingPlan(plan));
        dispatch(incrementStep());
    };

    const cols = deliveryDetails.map((plan) => (
        <div key={plan.shopify_id} className="flex items-stretch self-center p-2 product-button">
            <button className="flex flex-col items-start w-full p-3" onClick={() => selectDelivery(plan)}>
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

export default DeliveryFrequencyPicker;
