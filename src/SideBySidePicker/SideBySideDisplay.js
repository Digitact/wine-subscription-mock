import React, {useState, useEffect} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import GlobalPicker from './GlobalPicker';
import CaseDiagram from './CaseDiagram';

import SixFrame from '../assets/SixFrame.png'

export default ({caseSize = 12, showSizeSwitch = false, beginActive = false, caseCount, setCaseCount, customRules}) => {
    const [caseItems, setCaseItems] = useState([])
    const [selectedCaseSize, setSelectedCaseSize] = useState(caseSize)
    const [isActive, setIsActive] = useState(beginActive)

    const sixStyle = selectedCaseSize === 6 ? 'selector-left-enabled' : 'selector-left-disabled'
    const twelveStyle = selectedCaseSize === 12 ? 'selector-right-enabled' : 'selector-right-disabled'
    const activeStyle = isActive ? 'display-active' : 'display-inactive'
    const inactiveStyle = isActive ? 'display-inactive' : 'display-active'

    function switchCaseSize(size) {
        if(selectedCaseSize !== size) {
            setSelectedCaseSize(size)
        }
    }

    function activatePicker(state) {
        setIsActive(state)
    }

    return (
        <div className='mx-xl-5 mb-5 px-xl-5 pb-5'>
            <Row className='my-5 side-by-side'>
            {isActive && showSizeSwitch &&
                <Row>
                    <Col xs={6} className='p-0'>
                        <Button className={sixStyle} onClick={(e) => {e.preventDefault(); switchCaseSize(6);}}>6</Button>
                    </Col>
                    <Col className='p-0'>
                        <Button className={twelveStyle} onClick={(e) => {e.preventDefault(); switchCaseSize(12);}}>12</Button>
                    </Col>
                </Row>
                }

                <Row>
                <Col md={6} className={'px-xl-5 mx-xl-5 ' + activeStyle}>
                    <GlobalPicker caseSize={selectedCaseSize} caseItems={caseItems} setCaseItems={setCaseItems} caseCount={caseCount} setCaseCount={setCaseCount} customRules={customRules} />
                </Col>

                {/** sm=8 since the col moves to its own row */}
                { isActive ? 
                        <Col sm={8} md={6} lg={5} xl={4} className={'d-block diagram-background ' + activeStyle}>
                            <CaseDiagram caseSize={selectedCaseSize} caseItems={caseItems}/>
                        </Col>
                        :
                        <Col sm={12} className={'d-block diagram-background text-center p-5 ' + inactiveStyle}>
                            <h2>Click the case to get started</h2>
                            <div>
                                <img className='bounce' src={SixFrame} onClick={(e) => {e.preventDefault(); activatePicker(true)}}/>
                            </div>
                        </Col>
                    }
                </Row>
            </Row>

            {/** magic div that sits behind the case picker in mobile view */}
            <div className='d-md-none diagram-background'/>
        </div>
    )
}
