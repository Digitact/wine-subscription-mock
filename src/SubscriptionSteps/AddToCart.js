import React from "react";
import { Button, Image, Row, Col} from "react-bootstrap";
import FinishButton from '../assets/FinishButton.svg';

export default({selectedProduct, selectedSellingPlan, stepLabels, selectedProductImage, caseItems}) => {

    var properties = {};
    var totals = {};
    let c = [...caseItems];    
    for(let i = 0; i < c.length; i++) {
        if(totals[c[i].title]===undefined) totals[c[i].title] = 1;
        else totals[c[i].title] = totals[c[i].title]+1;
    }
    console.log(totals);
    var counter = 1;
    Object.keys(totals).forEach(key => {
        properties["Wine "+counter] = totals[key]+" x "+key;
        counter++; 
    });
    console.log(properties);
    console.log(caseItems);

    const addToShopify = (e) => {
        e.preventDefault()
       
        let formData = {
            'items': [{
                'id': selectedProduct,
                'quantity': 1,
                'selling_plan': selectedSellingPlan,
                'properties': properties
            }]
        };
        //alert(formData)
        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        //.then(response => {
        //    return response.json();
        //})
        .then((response) => response.json())
        .then((response) => {
            if (response.status) {
                this.handleErrorMessage(response.description);
                return;
            }
        
            console.log("goCartInstance:", window.goCartInstance);
            if (window.goCartInstance) {
                window.goCartInstance.addItemToCartHandler(response);
            } else {
                this.cartNotification.renderContents(response);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    //<p>Product: {selectedProduct}</p>
    //<p>Selling Plan: {selectedSellingPlan}</p>
  
    return (
        <div>
            <h3>
                Your subscription is ready.
            </h3>
            <div class="my-4">
                <Row>
                    <Col sm={3} md={3} lg={3}>
                    <img src={selectedProductImage} class="w-100" />
                    </Col>
                    <Col>
                    {stepLabels && stepLabels.map((o) => {
                        return(
                            <p><b>{o.key}</b>{o.name}</p>
                        )
                    })
                    } 
                    {Object.values(properties).map((value, index) => {
                        return (
                        <p>{value}</p>
                        );
                    })}              
                    <Button variant="dark" className='black-button' onClick={(e) => addToShopify(e)}>
                        Add To Cart
                    </Button>
                    </Col>
                </Row>
            </div>        
        </div>
    )
}
