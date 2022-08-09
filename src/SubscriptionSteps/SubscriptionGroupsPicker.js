import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import WineList from './WineList'
import SelectButton from '../assets/SelectButton.svg';

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, selectedProduct, setSelectedProduct, showCustomiseStep, setCustomRules, setSelectedProductImage, setCaseItems}) => {
    let prodCols = []
    const products = stepData[currentStep]

    const selectGroup = (e, o) => {
        if (e !== null) e.preventDefault()

        let sl = stepLabels
        sl[currentStep] = {key:'Your product: ', name:o.product_title} //+', '+o.variant_title        
        setStepLabels(sl)
        if (selectedProduct!=o.shopify_id) {
            //reset case if changing product
            setCaseItems([]);
        }
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
/*
    if (products.length===1) {
        selectGroup(null,products[0]);
    }
*/
    products.forEach((o) => {
        var imageUrl = o.image;
        var backgroundUrl = "url('"+imageUrl+"')";
        //'background-image':backgroundUrl,
        prodCols.push(
        <Col className='m-2 d-flex align-items-stretch product-button'>
            <Button className='p-3 d-flex flex-column align-items-start' onClick={(e) => selectGroup(e, o)}>
            <div class="w-100" style={{ 'justify-content': 'center', 'align-items': 'center', 'display': 'flex', 'height':'300px' }}>
                <img src={o.image} style={{ 'max-width':'100%', 'max-height':'100%', 'height': 'auto' }} />
            </div>
            <h4>
            {o.product_title}
            </h4>
            <p class="case_description">
                {o.product_description}
            </p>
            <WineList wines={o.custom_case} />
            <WineList wines={o.fixed_case} />
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
