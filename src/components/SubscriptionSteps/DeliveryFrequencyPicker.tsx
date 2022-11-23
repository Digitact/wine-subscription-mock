import { Row, Col, Button } from 'react-bootstrap';

export const DeliveryFrequencyPicker = ({
    currentStep,
    stepData,
    incrementStep,
    stepLabels,
    setStepLabels,
    setSelectedSellingPlan,
}) => {
    const cols = [];
    const deliveryDetails = stepData[currentStep].selling_plans;

    const selectDelivery = (e, o) => {
        if (e !== null) e.preventDefault();

        const sl = stepLabels;
        sl[currentStep] = { key: 'Delivery frequency: ', name: o.name };
        setStepLabels(sl);
        setSelectedSellingPlan(o.shopify_id);
        //alert(o)

        incrementStep(o);
    };

    if (deliveryDetails.length === 1) {
        //skip if only 1 option
        selectDelivery(null, deliveryDetails[0]);
    }

    if (deliveryDetails.length === 1)
        cols.push(<Col className="m-2 d-flex align-items-stretch product-button align-self-center"></Col>);
    deliveryDetails.forEach((o) => {
        cols.push(
            <Col className="m-2 d-flex align-items-stretch product-button align-self-center">
                <Button className="flex-col p-3 d-flex align-items-start w-100" onClick={(e) => selectDelivery(e, o)}>
                    <h4>{o.name}</h4>
                    <p>{o.description}</p>
                </Button>
            </Col>,
        );
    });
    if (deliveryDetails.length === 1)
        cols.push(<Col className="m-2 d-flex align-items-stretch product-button align-self-center"></Col>);

    return (
        <div>
            <Row>
                {stepLabels &&
                    stepLabels.map((o) => {
                        return (
                            <Col>
                                <p>
                                    <b>{o.key}</b>
                                    {o.name}
                                </p>
                            </Col>
                        );
                    })}
            </Row>
            <Row className="justify-content-center">{cols}</Row>
        </div>
    );
};

export default DeliveryFrequencyPicker;
