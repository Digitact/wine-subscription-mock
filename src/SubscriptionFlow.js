import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import FlowHeader from './FlowHeader';
import SubscriptionGroupsPicker from './SubscriptionSteps/SubscriptionGroupsPicker';
import SubscriptionTypePicker from './SubscriptionSteps/SubscriptionTypePicker';
import DeliveryFrequencyPicker from './SubscriptionSteps/DeliveryFrequencyPicker';
import CasePicker from './SubscriptionSteps/CasePicker';
import AddToCart from './SubscriptionSteps/AddToCart';

export default ({step}) => {
    const stepsFixed = {
        0: 
        {
            name: 'Choose Product',
            func: SubscriptionGroupsPicker,
            done: false
        },
        1:
        {
            name: 'Your Subscription',
            func: SubscriptionTypePicker,
            done: false
        },
        2:
        {
            name: 'Delivery Frequency',
            func: DeliveryFrequencyPicker,
            done: false
        }, 
        3:        
        {
            name: 'Finish!',
            func: AddToCart,
            done: false
        }
    };

    const stepsCustom = {
        0: 
        {
            name: 'Choose Product',
            func: SubscriptionGroupsPicker,
            done: false,
            customStep: false
        },
        1:
        {
            name: 'Your Subscription',
            func: SubscriptionTypePicker,
            done: false,
            customStep: false
        },
        2:
        {
            name: 'Delivery Frequency',
            func: DeliveryFrequencyPicker,
            done: false,
            customStep: false
        }, 
        3:
        {
            name: 'Wines',
            func: CasePicker,
            done: false,
            customStep: true
        }, 
        4:        
        {
            name: 'Finish!',
            func: AddToCart,
            done: false,
            customStep: false
        }
    };

    const [steps, setSteps] = useState(stepsCustom)
    const [stepIndex, setStepIndex] = useState(step)
    const [stepData, setStepData] = useState([])
    const [stepLabels, setStepLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [jsonData, setJsonData] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState("")
    const [selectedSellingPlan, setSelectedSellingPlan] = useState("")
    const [showCustom, setShowCustom] = useState(true)
    const [customRules, setCustomRules] = useState([])
    
    const clubsEndpoint = "https://howards-folly-wine.digitact.co.uk/app/api/wineclubs/"
    const prodsEndpoint = "https://howards-folly-wine.digitact.co.uk/app/api/wineclubproducts/"

    const currencyCode = "gbp"

    useEffect(() => {
        async function getSubscriptions() {
            const fullPath = prodsEndpoint+currencyCode

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

        if(stepIndex < Object.keys(steps).length) {
            setStepIndex(stepIndex+1)
        }
    }

    const goToStep = (i, done, style) => {
        if(done === false) return;

        if(stepIndex >= 0 && stepIndex < Object.keys(steps).length) {
            setStepIndex(i)
        }
    }

    const switchCustom = (custom) => {
        if(custom === false) setSteps(stepsFixed);
        else setSteps(stepsCustom);
    }


    let StepView = steps[stepIndex].func;

     if(loading) {
        return <p>Loading...</p>
    }

    return (
        <Container>
            <Row>
            <FlowHeader steps={steps} currentStep={stepIndex} goToStep={goToStep} showCustom={showCustom} />
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
                        setSelectedProduct={setSelectedProduct} 
                        selectedSellingPlan={selectedSellingPlan}
                        setSelectedSellingPlan={setSelectedSellingPlan}
                        setShowCustom={setShowCustom}
                        customRules={customRules}
                        setCustomRules={setCustomRules}
                    />
                </Col>
            </Row>
        </Container>
    )
}
