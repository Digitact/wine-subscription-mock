import React, {useState, useEffect} from 'react';
import {Button, Row, Col, Dropdown} from 'react-bootstrap';
import {Strings, Language} from '../assets/Strings';
import CaseItem from './CaseItem'

export default({caseSize, caseItems, setCaseItems, caseCount, setCaseCount, customRules}) => {
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [defaultWines, setDefaultWines] = useState([])
    const [viewDefaults, setViewDefaults] = useState([])
    const [firstRun, setFirstRun] = useState(true)
    const [stock, setStock] = useState([])
    
    const endpoint = "https://howards-folly-wine.digitact.co.uk/test/api/casebuilder";
    
    const _setTotalItems = (i) => {
        setTotalItems(i)
        setCaseCount(i)
    }

    let apiArgs = () => {
        let str=''
        caseItems.forEach((w, i) => {
        if(w && w.shopify_id) {
            if(i === 0) str += '?'
            else str += '&'
            
            str += 'selected[]='+w.shopify_id
        }
        })
        return str
    };

    useEffect(() => {
        async function fillStock() {
        /*
            const fullPath = endpoint+apiArgs()
        
            fetch(fullPath)
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
            })
            .then((data) => {
                setDefaultWines(data.default);

                defaultWines.forEach((dw, i) => {
                    
                })

                setStock(data.products);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
            */
            setDefaultWines(customRules);
            setStock(customRules);
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
          wines.push(w)
          t++

          let dw = vd.find(v => w.shopify_id === v.shopify_id)
          if(dw) {
              dw.min++
          }
          else {
              w.min = 1
              vd.push(w)
          }
        })
        setCaseItems(wines)
        _setTotalItems(t)
        setViewDefaults(vd)
    }

    return(
        <div>
            <Row className='my-2'>
                <Col>
                <input className='d-inline search-minimal' placeholder={placeholder}></input>
                <Button className='d-inline button-minimal'>{searchCTA}</Button>
                </Col>
            </Row>
            <Row className='my-2'>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-minimal'>{sort}</Dropdown.Toggle>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-minimal'>{filter}</Dropdown.Toggle>
                    </Dropdown>
                </Col>
                <Col>
                <h3>
                    {totalItems}/{caseSize}
                </h3>
                </Col>
            </Row>
            {/*<Row className='scrollable m-0'>
            <Row>
                <h4>
                 {DefaultsString}
                </h4>
                        { viewDefaults.length && viewDefaults.map((o, i) => {
                            //const [localQuantity, setLocalQuantity] = useState(0)

                            if(i !== 0 && (i-1) % 2 == 0) {
                                switchTheme()
                            }

                            let classname = 'm-0 d-block ' + theme

                            return(
                                
                                <Col md={6} className={classname}>
                                    <CaseItem defaultItem={true} item={o} caseSize={caseSize} totalItems={totalItems} setTotalItems={setTotalItems} caseItems={caseItems} setCaseItems={setCaseItems} bgClass={theme}/>
                                </Col>
                                
                        )})
                            }
                    
                </Row>
                        </Row>*/}
            <Row className='scrollable m-0'>
                {/*<h4>
                    {StockString}
                    </h4>*/}
                <Row>
                        { stock.length && stock.map((o, i) => {
                            //const [localQuantity, setLocalQuantity] = useState(0)

                            if(i !== 0 && (i-1) % 2 == 0) {
                                switchTheme()
                            }

                            let classname = 'm-0 d-block ' + theme

                            return(
                                
                                <Col md={6} className={classname}>
                                    <CaseItem item={o} caseSize={caseSize} totalItems={totalItems} setTotalItems={_setTotalItems} caseItems={caseItems} setCaseItems={setCaseItems} bgClass={theme}/>
                                </Col>
                                
                        )})
                            }
                    
                </Row>
            </Row>
        </div>
    )
}
