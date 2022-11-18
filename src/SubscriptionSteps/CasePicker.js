import React, {useState} from "react";
import { Row, Col, Button } from "react-bootstrap";
import SideBySideDisplay from "../SideBySidePicker/SideBySideDisplay";

const CasePicker = ({currentStep, stepData, incrementStep, stepLabels, setStepLabels, customRules, caseItems, setCaseItems, caseSize, setCaseSize}) => {
    const [caseCount, setCaseCount] = useState(0)
    
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
                <Col>
                    {caseCount !== caseSize ? <p className='text-center'>Please finalise your selection before continuing</p> 
                    : <p className='text-center'>You may now complete your order</p>}
                </Col>
                <Col className='d-flex align-items-right'>
                    <Button variant="dark" onClick={(e) => finishCase(e)} disabled={caseCount!==caseSize} className='product-form__submit button button--primary m-auto w-100 black-button'>
                    Continue
                    </Button>
                </Col>
            </Row>

          <Row>
              <SideBySideDisplay caseSize={caseSize} setCaseSize={setCaseSize} caseCount={caseCount} setCaseCount={setCaseCount} customRules={customRules} caseItems={caseItems} setCaseItems={setCaseItems} />
          </Row>
      </div>  
    )
}

export default CasePicker;