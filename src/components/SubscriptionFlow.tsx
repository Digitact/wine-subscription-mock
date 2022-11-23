import { ComponentType, useEffect } from 'react';
import { SubscriptionGroupsPicker } from '@/components/SubscriptionSteps/SubscriptionGroupsPicker';
import { FlowHeader } from '@/components/FlowHeader';
import { SubscriptionTypePicker } from '@/components/SubscriptionSteps/SubscriptionTypePicker';
import { DeliveryFrequencyPicker } from '@/components/SubscriptionSteps/DeliveryFrequencyPicker';
import { CasePicker } from '@/components/SubscriptionSteps/CasePicker';
import { AddToCart } from '@/components/SubscriptionSteps/AddToCart';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { useSubscriptionsProducts } from '@/hooks/useSubscriptionsProducts';
import { StepPosition } from '@/utils/types';
import { useStoreContext } from '@/store/context';
import { addProducts } from '@/store/actions';

const SubscriptionComponentMap: Record<string, ComponentType<any>> = {
    [StepPosition.Step1]: SubscriptionGroupsPicker,
    [StepPosition.Step2]: SubscriptionTypePicker,
    [StepPosition.Step3]: DeliveryFrequencyPicker,
    [StepPosition.Step4]: CasePicker,
    [StepPosition.Step5]: AddToCart,
};

export const SubscriptionFlow = () => {
    const { products, isLoading, isError, isSuccess } = useSubscriptionsProducts();
    const { state, dispatch } = useStoreContext();

    useEffect(() => {
        if (isSuccess && products) {
            dispatch(addProducts(products));
        }
        if (isError) {
            console.error('Error fetching products');
        }
    }, [isSuccess, isError, products, dispatch]);

    const StepView = SubscriptionComponentMap[state.currentStep];

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <div className="container px-4 mx-auto">
            <FlowHeader />
            <StepView />
        </div>
    );
};
