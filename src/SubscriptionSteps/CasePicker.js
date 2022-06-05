import React, {useState} from "react";
import { Row, Col, Button } from "react-bootstrap";
import SideBySideDisplay from "../SideBySidePicker/SideBySideDisplay";

export default({currentStep, stepData, incrementStep, stepLabels, setStepLabels}) => {
    const [caseCount, setCaseCount] = useState(0)
    
    let caseSize = 6

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
                        <Button onClick={(e) => finishCase(e)} disabled={caseCount!=caseSize} className='m-auto'>
                            Complete order
                        </Button>
                    </Row>
                </Col>
                <Col/>
            </Row>

          <Row>
              <SideBySideDisplay caseSize={caseSize} caseCount={caseCount} setCaseCount={setCaseCount}/>
          </Row>
      </div>  
    )
}