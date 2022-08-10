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
    if (deliveryDetails.length==1) cols.push(<Col className='m-2 d-flex align-items-stretch product-button align-self-center'></Col>);
    deliveryDetails.forEach((o) => {
        cols.push(
        <Col className='m-2 d-flex align-items-stretch product-button align-self-center'>
            <Button className='p-3 d-flex flex-column align-items-start w-100' onClick={(e) => selectDelivery(e, o)}>
            <h4>{o.name}</h4>
            <p>{o.description}</p>
            </Button>
        </Col>
        )
    })
    if (deliveryDetails.length==1) cols.push(<Col className='m-2 d-flex align-items-stretch product-button align-self-center'></Col>);

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

          <Row className="justify-content-center">
              {cols}
          </Row>
      </div>  
    )
}
