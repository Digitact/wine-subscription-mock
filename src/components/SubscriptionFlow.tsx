import { ComponentType, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SubscriptionGroupsPicker } from '@/components/SubscriptionSteps/SubscriptionGroupsPicker';
import { FlowHeader } from '@/components/FlowHeader';
import { SubscriptionTypePicker } from '@/components/SubscriptionSteps/SubscriptionTypePicker';
import { DeliveryFrequencyPicker } from '@/components/SubscriptionSteps/DeliveryFrequencyPicker';
import { CasePicker } from '@/components/SubscriptionSteps/CasePicker';
import { AddToCart } from '@/components/SubscriptionSteps/AddToCart';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { useSubscriptionsProducts } from '@/hooks/useSubscriptionsProducts';
import { StepType } from '@/utils/types';
import { useStoreContext } from '@/store/context';

const SubscriptionComponentMap: Record<string, ComponentType<any>> = {
    [StepType.Step1]: SubscriptionGroupsPicker,
    [StepType.Step2]: SubscriptionTypePicker,
    [StepType.Step3]: DeliveryFrequencyPicker,
    [StepType.Step4]: CasePicker,
    [StepType.Step5]: AddToCart,
};

export const SubscriptionFlow = () => {
    const { products, isLoading } = useSubscriptionsProducts();
    const { state } = useStoreContext();

    const [steps, setSteps] = useState(stepsList);
    const [stepIndex, setStepIndex] = useState(step);
    const [stepData, setStepData] = useState([]);
    const [stepLabels, setStepLabels] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProductImage, setSelectedProductImage] = useState('');
    const [selectedSellingPlan, setSelectedSellingPlan] = useState('');
    const [customRules, setCustomRules] = useState([]);
    const [caseItems, setCaseItems] = useState([]);
    const [caseSize, setCaseSize] = useState(12);

    if (stepLabels.length === 0) {
        for (let i = 0; i < Object.keys(steps).length; i++) {
            stepData.push(null);
            stepLabels.push({ key: '', name: '' });
        }
    }

    const incrementStep = (o) => {
        if (o) {
            const sd = stepData;
            sd[stepIndex + 1] = o;
            setStepData(sd);
        }

        const s = steps;
        s[stepIndex].done = true;
        setSteps(s);

        let nextStep = stepIndex + 1;
        while (s[nextStep].visible === false && nextStep < Object.keys(steps).length) {
            nextStep++;
        }

        if (nextStep <= Object.keys(steps).length) {
            setStepIndex(nextStep);
        }
    };

    const showCustomiseStep = (custom) => {
        const s = steps;
        s[3].visible = custom;
        setSteps(s);
    };

    const StepView = SubscriptionComponentMap[state.currentStep];

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <Container>
            <Row>
                <FlowHeader />
            </Row>
            <Row>
                <Col>
                    <StepView
                        currentStep={stepIndex}
                        stepData={stepData}
                        incrementStep={incrementStep}
                        stepLabels={stepLabels}
                        setStepLabels={setStepLabels}
                        selectedProduct={selectedProduct}
                        selectedProductImage={selectedProductImage}
                        setSelectedProduct={setSelectedProduct}
                        setSelectedProductImage={setSelectedProductImage}
                        selectedSellingPlan={selectedSellingPlan}
                        setSelectedSellingPlan={setSelectedSellingPlan}
                        showCustomiseStep={showCustomiseStep}
                        customRules={customRules}
                        setCustomRules={setCustomRules}
                        caseItems={caseItems}
                        setCaseItems={setCaseItems}
                        caseSize={caseSize}
                        setCaseSize={setCaseSize}
                    />
                </Col>
            </Row>
        </Container>
    );
};
