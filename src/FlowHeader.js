import React from "react";
import { Row, Col } from "react-bootstrap";
import Tick from "./assets/tick.png"

export default({steps, currentStep, goToStep}) => {
    let rows = []

    let stepnum = 1;

    for(let i = 0; i < Object.keys(steps).length; i++) {
        let done = steps[i].done
        let style = 'complete-step'

        //if(done === false) {
        if(currentStep < i) {
            style='incomplete-step'
        }

        if(currentStep === i) {
            style = 'current-step'
        }

        if (steps[i].visible) {
            rows.push(
                <Col className={style} onClick={(e) => { e.preventDefault(); goToStep(i, done, style); } }>
                    <h3 style={{'height':'36px', 'font-size': '36px'}} className='text-dark'>
                    {stepnum}
                    {style === 'complete-step' ? <><img className="mx-2"  style={{'vertical-align':'baseline'}}  src={'https://wineclub-demo.digitact.co.uk/' + Tick} width={26} height={26}/></> : null}
                    </h3>
                <p className='text-dark'>{steps[i].name}</p>
                </Col>)    
            stepnum++;   
        }
    }

    return (
        <Row>
            {rows}
        </Row>
    )
}
