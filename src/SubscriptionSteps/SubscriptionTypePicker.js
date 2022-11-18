import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const SubscriptionTypePicker = ({currentStep, stepData, incrementStep, stepLabels, setStepLabels, setSelectedSellingPlan}) => {
    let cols = []
    const sellingPlanGroups = stepData[currentStep].selling_plan_groups
    
    const selectPlan = (e, o) => {
        if (e !== null) e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your susbcription: ', name:o.name}
        setStepLabels(sl)
        incrementStep(o)
    }
    if (sellingPlanGroups.length===1) cols.push(<Col className='m-2 d-flex align-items-stretch product-button align-self-center'></Col>);
    sellingPlanGroups.forEach((o) => {
        cols.push(
        <Col md={4} className='m-2 d-flex align-items-stretch product-button align-self-center'>
            <Button className='p-3 d-flex flex-column align-items-start w-100' onClick={(e) => selectPlan(e, o)}>
            <h4>{o.name}</h4>
            <p>{o.description}</p>
            </Button>
        </Col>
        )
    })
    if (sellingPlanGroups.length===1) cols.push(<Col className='m-2 d-flex align-items-stretch product-button align-self-center'></Col>);

    return(
        <div>
            <Row>
            {stepLabels && stepLabels.map((o) => {
                return(
                    <Col><p><b>{o.key}</b>{o.name}</p></Col>
                )
            })
            }
            </Row>

            <Row className='justify-content-center'>
                {cols}
            </Row>
        </div>
    )
}

export default SubscriptionTypePicker;