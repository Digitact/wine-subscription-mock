import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import WineList from './WineList'

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, setSelectedProduct, setShowCustom, setCustomRules}) => {
    let prodCols = []
    const products = stepData[currentStep]

    const selectGroup = (e, o) => {
        e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your product: ', name:o.product_title+', '+o.variant_title}
        setStepLabels(sl)
        setSelectedProduct(o.shopify_id)
        if (typeof(o.custom_case) !== 'undefined' && o.custom_case != null) {
            setShowCustom(true)
            setCustomRules(o.custom_case)
        }
        else {
            setShowCustom(false)
            setCustomRules([])
        }
        //alert(o)

        incrementStep(o)
    }

    products.forEach((o) => {
        prodCols.push(
        <Col className='p-5'>
            <h4>
            {o.product_title}, {o.variant_title}
            </h4>
            <p>
                {o.product_description}
            </p>
            <WineList wines={o.custom_case} />
            <Button variant="light" onClick={(e) => selectGroup(e, o)}>
                <Image src="https://howards-folly-wine.digitact.co.uk/wine-subscription-mock/select_button.svg" width="100" />
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
