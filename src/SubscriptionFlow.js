import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import FlowHeader from './FlowHeader';
import SubscriptionGroupsPicker from './SubscriptionSteps/SubscriptionGroupsPicker';
import SubscriptionTypePicker from './SubscriptionSteps/SubscriptionTypePicker';
import DeliveryFrequencyPicker from './SubscriptionSteps/DeliveryFrequencyPicker';
import CasePicker from './SubscriptionSteps/CasePicker';
import AddToCart from './SubscriptionSteps/AddToCart';

export default ({step}) => {

    const stepsList = {
        0: 
        {
            name: 'Subscription',
            func: SubscriptionGroupsPicker,
            done: false,
            visible: true
        },
        1:
        {
            name: 'What\'s Included',
            func: SubscriptionTypePicker,
            done: false,
            visible: true
        },
        2:
        {
            name: 'Delivery Frequency',
            func: DeliveryFrequencyPicker,
            done: false,
            visible: true
        }, 
        3:
        {
            name: 'Wines',
            func: CasePicker,
            done: false,
            visible: true
        }, 
        4:        
        {
            name: 'Confirmation',
            func: AddToCart,
            done: false,
            visible: true
        }
    };

    const [steps, setSteps] = useState(stepsList)
    const [stepIndex, setStepIndex] = useState(step)
    const [stepData, setStepData] = useState([])
    const [stepLabels, setStepLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [jsonData, setJsonData] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState("")
    const [selectedProductImage, setSelectedProductImage] = useState("")
    const [selectedSellingPlan, setSelectedSellingPlan] = useState("")
    const [customRules, setCustomRules] = useState([])
    const [caseItems, setCaseItems] = useState([])
    
    const clubsEndpoint = "https://wineclub-demo.digitact.co.uk/app/api/wineclubs/"
    const prodsEndpoint = "https://wineclub-demo.digitact.co.uk/app/api/wineclubproducts/"
    const subEndpoint = "https://wineclub-demo.digitact.co.uk/app/api/subscriptionoptions/"

    const currencyCode = "gbp"
    
    useEffect(() => {
        async function getSubscriptions() {
            const fullPath = subEndpoint+window.permanent_domain

            fetch(fullPath)
            .then((response) => {
                if(response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then((data) => {
                setJsonData(data)
                let sd = []
                sd.push(data.products)
                setStepData(sd)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
        }

        getSubscriptions();
    }, [])

    if(stepLabels.length === 0) {
        for(let i = 0; i < Object.keys(steps).length; i++) {
            stepData.push(null)
            stepLabels.push({key:'', name:''})
        }
    }

    const incrementStep = (o) => {
        if(o) {
            let sd = stepData
            sd[stepIndex+1] = o
            setStepData(sd)
        }

        let s = steps
        s[stepIndex].done = true
        setSteps(s)

        let nextStep = stepIndex+1;
        //alert("nextStep:"+nextStep);
        //alert("s[nextStep].visible:"+s[nextStep].visible);
        //alert("s[nextStep+1].visible:"+s[nextStep+1].visible);
        while (s[nextStep].visible===false && nextStep < Object.keys(steps).length) {
            //alert("inside While:"+nextStep);
            nextStep++
        }

        if(nextStep <= Object.keys(steps).length) {
            setStepIndex(nextStep)
        }
    }

    const goToStep = (i, done, style) => {
        if(done === false) return;

        if(stepIndex >= 0 && stepIndex < Object.keys(steps).length) {
            setStepIndex(i)
        }
    }

    const showCustomiseStep = (custom) => {
        let s = steps        
        s[3].visible = custom
        setSteps(s);
    }


    let StepView = steps[stepIndex].func;

     if(loading) {
        return <div class="loading-center m-4 p-4"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    }

    return (
        <Container>
            <Row>
            <FlowHeader steps={steps} currentStep={stepIndex} goToStep={goToStep} />
            </Row>
            <Row>
            
                <Col>
                    <StepView 
                        currentStep={stepIndex} 
                        stepData={stepData} 
                        incrementStep={incrementStep} 
                        stepLabels={stepLabels} 
                        setStepLabels={setStepLabels} 
                        selectedProduct={selectedProduct} 
                        selectedProductImage={selectedProductImage} 
                        setSelectedProduct={setSelectedProduct}
                        setSelectedProductImage={setSelectedProductImage} 
                        selectedSellingPlan={selectedSellingPlan}
                        setSelectedSellingPlan={setSelectedSellingPlan}
                        showCustomiseStep={showCustomiseStep}
                        customRules={customRules}
                        setCustomRules={setCustomRules}
                        caseItems={caseItems}
                        setCaseItems={setCaseItems}
                    />
                </Col>
            </Row>
        </Container>
    )
}
