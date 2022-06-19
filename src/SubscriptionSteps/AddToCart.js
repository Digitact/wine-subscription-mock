import React from "react";
import { Button} from "react-bootstrap";

export default({selectedProduct, selectedSellingPlan}) => {

    const addToShopify = (e) => {
        e.preventDefault()

        let formData = {
            'items': [{
                'id': selectedProduct,
                'quantity': 1,
                'selling_plan': selectedSellingPlan,
            }]
        };
        alert(formData)
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
  
    return (
        <div>
        <h3>
            Your subscription is ready.
        </h3>
        <p>Product: {selectedProduct}</p>
        <p>Selling Plan: {selectedSellingPlan}</p>
        <Button onClick={(e) => addToShopify(e)}>
            Add To Cart
        </Button>
        </div>
    )
}
