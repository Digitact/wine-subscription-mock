import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import WineList from './WineList'
import SelectButton from '../assets/SelectButton.svg';

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, setSelectedProduct, showCustomiseStep, setCustomRules, setSelectedProductImage}) => {
    let prodCols = []
    const products = stepData[currentStep]

    const selectGroup = (e, o) => {
        if (e !== null) e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your product: ', name:o.product_title} //+', '+o.variant_title
        setStepLabels(sl)
        setSelectedProduct(o.shopify_id)
        setSelectedProductImage(o.image)
        if (typeof(o.custom_case) !== 'undefined' && o.custom_case != null) {
            showCustomiseStep(true)
            setCustomRules(o.custom_case)
        }
        else {
            showCustomiseStep(false)
            setCustomRules([])
        }
        //alert(o)

        incrementStep(o)
    }

    if (products.length===1) {
        selectGroup(null,products[0]);
    }

    products.forEach((o) => {
        prodCols.push(
        <Col className='p-5'>
            <img src={o.image} class="w-100" />
            <h4>
            {o.product_title}
            </h4>
            <p class="case_description">
                {o.product_description}
            </p>
            <WineList wines={o.custom_case} />
            <Button variant="light" onClick={(e) => selectGroup(e, o)}>
                <Image src={"https://howards-folly-wine.digitact.co.uk" + SelectButton} width="100" />
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
