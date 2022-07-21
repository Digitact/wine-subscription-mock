import React, {useState} from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import SideBySideDisplay from "../SideBySidePicker/SideBySideDisplay";
import CompleteOrderButton from '../assets/CompleteOrderButton.svg';

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels, customRules, caseItems, setCaseItems}) => {
    const [caseCount, setCaseCount] = useState(0)
    
    let caseSize = 12

    const finishCase = (e) => {
        e.preventDefault()

        //TODO: pass what in here?
        incrementStep( null )
    }

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
                <Col/>
                <Col md={3} xxs={6}>
                    <Row >
                        {caseCount != caseSize ? <p className='text-center'>Please finalise your selection before continuing</p> 
                        : <p className='text-center'>You may now complete your order</p>}
                    </Row>
                    <Row className='d-flex align-items-center'>
                        <Button variant="light" onClick={(e) => finishCase(e)} disabled={caseCount!=caseSize} className='m-auto'>
                            <Image src={"https://wineclub-demo.digitact.co.uk" + CompleteOrderButton} width="100" />
                        </Button>
                    </Row>
                </Col>
                <Col/>
            </Row>

          <Row>
              <SideBySideDisplay caseSize={caseSize} caseCount={caseCount} setCaseCount={setCaseCount} customRules={customRules} caseItems={caseItems} setCaseItems={setCaseItems} />
          </Row>
      </div>  
    )
}
