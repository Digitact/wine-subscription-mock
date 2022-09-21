import React, {useState, useEffect} from 'react';
import {Button, Row, Col, Dropdown} from 'react-bootstrap';
import {Strings, Language} from '../assets/Strings';
import CaseItem from './CaseItem'

export default({caseSize, caseItems, setCaseItems, caseCount, setCaseCount, customRules, setCustomRules, filteredStock, setFilteredStock}) => {
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [defaultWines, setDefaultWines] = useState([])
    const [viewDefaults, setViewDefaults] = useState([])
    const [firstRun, setFirstRun] = useState(true)
      
    const _setTotalItems = (i) => {
        setTotalItems(i)
        setCaseCount(i)
    }

    useEffect(() => {
        async function fillStock() {
            setDefaultWines(customRules);
            setCustomRules(customRules);
            setFilteredStock(customRules);
            setLoading(false);
        }

        fillStock();
    }, [totalItems]);

    let theme = 'case-item-light'

    const switchTheme = () => {
        if (theme === 'case-item-light') {
            theme = 'case-item-dark'
        }
        else {
            theme = 'case-item-light'
        }
    }

    const cur = Strings[Language].GlobalPicker
    const placeholder = cur['SearchPlaceholder']
    const searchCTA = cur['SearchCTA']
    const sort = cur['SearchSort']
    const filter = cur['SearchFilter']
    const DefaultsString = cur['Default']
    const StockString = cur['Stock']

    if (loading) {
        return <p>Loading casepicker...</p>
    }
    
    if(firstRun && defaultWines) {
        setFirstRun(false)
    
        let vd = []
        let wines = []
        let t = 0
        //on the first run through we want to populate the case with any defaults mandated by the vendor
        defaultWines.forEach((w, i) => {
            for(let i = 0; i < w.quantity; i++) {
                wines.push(w)
            }          
          vd.push(w)
          t += parseInt(w.quantity)
        })
        setCaseItems(wines)
        _setTotalItems(t)
        setViewDefaults(vd)
    }

    return(
        <div>
            <Row className='my-2'>
                <Col>
                <h3>
                    Selected: {totalItems}/{caseSize}
                </h3>
                </Col>
            </Row>
            <Row className='scrollable m-0'>
                <Row>
                    { filteredStock && filteredStock.length ? filteredStock.map((o, i) => {

                        if(i !== 0 && (i-1) % 2 == 0) {
                            switchTheme()
                        }

                        let classname = 'm-0 d-block ' + theme

                        return(
                            
                            <Col md={6} className={classname}>
                                <CaseItem defaultQuantity={o.quantity} item={o} caseSize={caseSize} totalItems={totalItems} setTotalItems={_setTotalItems} caseItems={caseItems} setCaseItems={setCaseItems} bgClass={theme}/>
                            </Col>
                            
                        )})
                        :
                        <p>No items match your filter and search conditions</p>
                    }                    
                </Row>
            </Row>
        </div>
    )
}
