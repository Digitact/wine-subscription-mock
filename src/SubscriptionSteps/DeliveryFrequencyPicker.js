import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import SelectButton from '../assets/SelectButton.svg';

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, setSelectedSellingPlan}) => {
    let cols = []
    let deliveryDetails = stepData[currentStep].selling_plans

    const selectDelivery = (e, o) => {
        if (e !== null) e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Delivery frequency: ', name:o.name}
        setStepLabels(sl)
        setSelectedSellingPlan(o.shopify_id)
        //alert(o)

        incrementStep(o)
    }
/*
    if (deliveryDetails.length===1) {
        selectDelivery(null,deliveryDetails[0]);
    }
*/
    deliveryDetails.forEach((o) => {
        cols.push(
            <Col className='p-5'>
                <h4>
                    {o.name}
                </h4>
                <p>
                    {o.description}
                </p>
                <Button variant="light" onClick={(e) => selectDelivery(e, o)}>
                    <Image src={"https://wineclub-demo.digitact.co.uk" + SelectButton} width="100" />
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
