import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import GlobalPicker from './GlobalPicker';
import CaseDiagram from './CaseDiagram';
import ControlBar from './ControlBar';

export default ({caseSize, caseCount, setCaseCount, customRules, setCustomRules, caseItems, setCaseItems}) => {
    const [filters, setFilters] = useState([])
    const [filterables, setFilterables] = useState([])
    const [searchables, setSearchables] = useState([])
    const [filteredStock, setFilteredStock] = useState([])

    return (
        <div className='pb-5'>
            <Row>
                <ControlBar 
                    caseSize={caseSize}
                    caseItems={caseItems}
                    setCaseItems={setCaseItems}
                    filters={filters}
                    setFilters={setFilters}
                    filterables={filterables}
                    searchables={searchables}
                    stock={customRules}
                    filteredStock={filteredStock}
                    setFilteredStock={setFilteredStock}
                     />
            </Row>

            <Row className='side-by-side'>
                <Col md={6} className=''>
                    <GlobalPicker 
                        caseSize={caseSize} 
                        caseItems={caseItems} 
                        setCaseItems={setCaseItems} 
                        setFilterables={setFilterables}
                        setSearchables={setSearchables}
                        caseCount={caseCount} 
                        setCaseCount={setCaseCount} 
                        customRules={customRules} 
                        setCustomRules={setCustomRules}
                        filteredStock={filteredStock}
                        setFilteredStock={setFilteredStock}/>
                </Col>

                {/** sm=8 since the col moves to its own row */}
                <Col sm={8} md={6} lg={5} xl={4} className='d-block diagram-background' style={{ 'margin': '0 auto' }}>
                    {<CaseDiagram caseSize={caseSize} caseItems={caseItems}/>}
                </Col>
            </Row>

            {/** magic div that sits behind the case picker in mobile view */}
            <div className='d-md-none diagram-background' style={{ 'margin': '0 auto' }}/>
        </div>
    )
}
