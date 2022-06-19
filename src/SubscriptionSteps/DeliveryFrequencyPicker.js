import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, setSelectedSellingPlan}) => {
    let cols = []
    let deliveryDetails = stepData[currentStep].selling_plans

    const selectDelivery = (e, o) => {
        e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Delivery frequency: ', name:o.name}
        setStepLabels(sl)
        setSelectedSellingPlan(o.shopify_id)
        //alert(o)

        incrementStep(o)
    }

    deliveryDetails.forEach((o) => {
        cols.push(
            <Col className='p-5'>
                <h4>
                    {o.name}
                </h4>
                <p>
                    {o.description}
                </p>
                <Button onClick={(e) => selectDelivery(e, o)}>
                    Select
                </Button>
            </Col>
        )
    })

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
              {cols}
          </Row>
      </div>  
    )
}
