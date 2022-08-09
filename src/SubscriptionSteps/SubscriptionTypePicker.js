import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import SelectButton from '../assets/SelectButton.svg';

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, setSelectedSellingPlan}) => {
    let cols = []
    const sellingPlanGroups = stepData[currentStep].selling_plan_groups
    
    const selectPlan = (e, o) => {
        if (e !== null) e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your susbcription: ', name:o.name}
        setStepLabels(sl)
        //setSelectedSellingPlan(o.shopify_id)
        //alert(o)

        incrementStep(o)
    }
/*
    if (sellingPlanGroups.length===1) {
        selectPlan(null,sellingPlanGroups[0]);
    }
*/
    sellingPlanGroups.forEach((o) => {
        cols.push(
        <Col className='p-5'>
        <h4>{o.name}</h4>
        <Button variant="light" onClick={(e) => selectPlan(e, o)}>
            <Image src={"https://wineclub-demo.digitact.co.uk" + SelectButton} width="100" />
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
