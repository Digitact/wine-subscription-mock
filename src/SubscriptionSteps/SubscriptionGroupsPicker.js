import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import WineList from './WineList'

const SubscriptionGroupsPicker = ({currentStep, stepData, incrementStep, stepLabels, setStepLabels, selectedProduct, setSelectedProduct, showCustomiseStep, setCustomRules, setSelectedProductImage, setCaseItems, caseSize, setCaseSize}) => {
    let prodCols = []
    const products = stepData[currentStep]

    const selectGroup = (e, o) => {
        if (e !== null) e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your product: ', name:o.product_title} //+', '+o.variant_title        
        setStepLabels(sl)
        if (selectedProduct!==o.shopify_id) {
            //reset case if changing product
            setCaseItems([]);
        }
        setSelectedProduct(o.shopify_id)
        setSelectedProductImage(o.image)
        if (typeof(o.product_case) !== 'undefined' && o.product_case != null) {
            if (typeof(o.product_case.case_type) !== 'undefined' && o.product_case.case_type != null) {
                if (o.product_case.case_type === 'Custom' && (typeof(o.product_case.product_case_wines) !== 'undefined' && o.product_case.product_case_wines !== null)) {
                    showCustomiseStep(true);
                    setCustomRules(o.product_case.product_case_wines);
                } else {
                    showCustomiseStep(false);
                }
            }
            if (typeof(o.product_case.case_size) !== 'undefined' && o.product_case.case_size != null) {
                setCaseSize(o.product_case.case_size);
            }
        }
        else {
            showCustomiseStep(false)
            setCustomRules([])
        }
        //alert(o)

        incrementStep(o)
    }
/*
    if (products.length===1) {
        selectGroup(null,products[0]);
    }
*/
    products.forEach((o) => {
        prodCols.push(
        <Col className='m-2 d-flex align-items-stretch product-button'>
            <Button className='p-3 d-flex flex-column align-items-start w-100' onClick={(e) => selectGroup(e, o)}>
            <div class="w-100" style={{ 'justify-content': 'center', 'align-items': 'center', 'display': 'flex', 'height':'300px' }}>
                <img src={o.image} style={{ 'max-width':'100%', 'max-height':'100%', 'height': 'auto' }} alt="" />
            </div>
            <h4>
            {o.product_title}
            </h4>
            <p class="case_description">
                {o.product_description}
            </p>
            <WineList wines={o.product_case.product_case_wines} />
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

export default SubscriptionGroupsPicker;