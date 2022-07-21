import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import GlobalPicker from './GlobalPicker';
import CaseDiagram from './CaseDiagram';

export default ({caseSize = 6, caseCount, setCaseCount, customRules, caseItems, setCaseItems}) => {
    

    return (
        <div className='mx-xl-5 mb-5 px-xl-5 pb-5'>
            <Row className='my-5 side-by-side'>
                <Col md={6} className='px-xl-5 mx-xl-5'>
                    <GlobalPicker caseSize={caseSize} caseItems={caseItems} setCaseItems={setCaseItems} caseCount={caseCount} setCaseCount={setCaseCount} customRules={customRules} />
                </Col>

                {/** sm=8 since the col moves to its own row */}
                <Col sm={8} md={6} lg={5} xl={4} className='d-block diagram-background'>
                    {<CaseDiagram caseSize={caseSize} caseItems={caseItems}/>}
                </Col>
            </Row>

            {/** magic div that sits behind the case picker in mobile view */}
            <div className='d-md-none diagram-background'/>
        </div>
    )
}
