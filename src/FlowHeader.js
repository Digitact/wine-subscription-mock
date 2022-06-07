import React from "react";
import { Row, Col } from "react-bootstrap";
import Tick from "./assets/tick.png"

export default({steps, currentStep, goToStep}) => {
    let rows = []

    for(let i = 0; i < Object.keys(steps).length; i++) {
        let done = steps[i].done
        let style = 'complete-step'

        if(done === false) {
            style='incomplete-step'
        }

        if(currentStep === i) {
            style = 'current-step'
        }

        rows.push(
        <Col className={style} onClick={(e) => { e.preventDefault(); goToStep(i, done, style); } }>
        <Row className='p-3'>
            <Col>
            <h3 className='text-light'>
            {i+1}
            </h3>
            </Col>
            {style === 'complete-step' ? <Col xs={4}><img className='float-right' src={Tick} width={40} height={40}/></Col> : null}
        </Row>
        <p className='text-light'>{steps[i].name}</p>
        </Col>)
    }

    return (
        <Row>
            {rows}
        </Row>
    )
}