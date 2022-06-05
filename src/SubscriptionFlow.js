import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import FlowHeader from './FlowHeader';
import SubscriptionGroupsPicker from './SubscriptionSteps/SubscriptionGroupsPicker';
import SubscriptionTypePicker from './SubscriptionSteps/SubscriptionTypePicker';
import DeliveryFrequencyPicker from './SubscriptionSteps/DeliveryFrequencyPicker';
import CasePicker from './SubscriptionSteps/CasePicker';
import AddToCart from './SubscriptionSteps/AddToCart';

export default ({step}) => {
    const [stepIndex, setStepIndex] = useState(step)
    const [stepData, setStepData] = useState(null)
    const [stepLabels, setStepLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [jsonData, setJsonData] = useState(null)
    
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

    const steps = {
        0: 
        {
            name: 'Choose Product',
            func: SubscriptionGroupsPicker,
        },
        1:
        {
            name: 'Your Subscription',
            func: SubscriptionTypePicker
        },
        2:
        {
            name: 'Delivery Frequency',
            func: DeliveryFrequencyPicker
        }, 
        3:
        {
            name: 'Choose Wines',
            func: CasePicker
        },
        4:
        {
            name: 'Finish!',
            func: AddToCart
        }
    };

    const incrementStep = (o) => {
        if(o) {
            let sd = stepData
            sd.push(o)
            setStepData(sd)
        }

        if(stepIndex < Object.keys(steps).length) {
            setStepIndex(stepIndex+1)
        }
    }

    let StepView = steps[stepIndex].func;

     if(loading) {
        return <p>Loading...</p>
    }

    return (
        <Container>
            <Row>
            <FlowHeader steps={steps} currentStep={stepIndex}/>
            </Row>
            <Row>
            
                <Col>
                    <StepView currentStep={stepIndex} stepData={stepData} incrementStep={incrementStep} stepLabels={stepLabels} setStepLabels={setStepLabels}/>
                </Col>
            </Row>
        </Container>
    )
}