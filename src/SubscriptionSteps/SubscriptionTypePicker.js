import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels}) => {
    let cols = []
    const sellingPlanGroups = stepData[currentStep].selling_plan_groups
    
    const selectPlan = (e, o) => {
        e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your susbcription: ', name:o.name}
        setStepLabels(sl)

        incrementStep(o)
    }

    sellingPlanGroups.forEach((o) => {
        cols.push(
        <Col className='p-5'>
        <h4>{o.name}</h4>
        <Button onClick={(e) => selectPlan(e, o)}>
            Select
        </Button>
        </Col>
        )
    })

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

            <Row>
                {cols}
            </Row>
        </div>
    )
}