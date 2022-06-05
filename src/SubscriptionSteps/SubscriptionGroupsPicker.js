import React from "react";
import { Button, Row, Col } from "react-bootstrap";

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels}) => {
    let prodCols = []
    const products = stepData[currentStep]

    const selectGroup = (e, o) => {
        e.preventDefault()

        let sl = stepLabels
        sl.push({key:'Your product: ', name:o.variant_title})
        setStepLabels(sl)

        incrementStep(o)
    }

    products.forEach((o) => {
        prodCols.push(
        <Col className='p-5'>
            <h4>
                {o.variant_title}
            </h4>
            <p>
                {o.product_description}
            </p>
            <Button onClick={(e) => selectGroup(e, o)}>
                Select
            </Button>
        </Col>
    )})

    return (
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
           {prodCols} 
        </Row>
        </div>
    )
}