import React, {useState, useEffect, useRef} from 'react';
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
    const [filters, setFilters] = useState([])
    const [filteredStock, setFilteredStock] = useState([])
    const [searchedStock, setSearchedStock] = useState([])
    const [currentSort, setCurrentSort] = useState('None')
    const searchInput = useRef()
    
    //const endpoint = "https://wineclub-demo.digitact.co.uk/app/api/subscriptionoptions/winehub-demo.myshopify.com";
    //const endpoint = "https://wineclub-demo.digitact.co.uk/app/api/casepicker/winehub-demo.myshopify.com/7770188742913"
    const endpoint = "https://wineclub-demo.digitact.co.uk/app/api/casepicker/"
    
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
        
            const fullPath = endpoint+window.permanent_domain+'/'+window.product_id//+apiArgs()

            fetch(fullPath)
            .then((response) => {
                if (response.ok) {
                    const rj = response.json()
                    return rj;
                }
                throw response;
            })
            .then((data) => {
                setDefaultWines(customRules);
                setStock(customRules);
                setSearchedStock(customRules);
                setFilteredStock(customRules);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            })
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
    const clearCTA = cur['ClearCTA']
    const sort = cur['SearchSort']
    const filter = cur['SearchFilter']
    const year = cur['SearchYear']
    const type = cur['SearchType']
    const notInCase = cur['SearchNotInCase']
    const price = cur['SearchPrice']
    const ascending = cur['SearchAscending']
    const descending = cur['SearchDescending']
    const CurrentFilters = cur['SearchCurrentFilters']

    const DefaultsString = cur['Default']
    const StockString = cur['Stock']

    if (loading) {
        return <p>Loading casepicker...</p>
    }
    
    //get all the types and years and put them into some kind of collection
    const years = []
    const types = []

    stock.forEach((o) => {
        const yearstr = year + ': ' + o.vintage 
        const typestr = type + ': ' + o.wine_type

        if(years.indexOf(yearstr) === -1) {
            years.push(yearstr)
        }

        if(types.indexOf(typestr) === -1) {
            types.push(typestr)
        }
    })

    //sorting
    const sortStrings = [
        year + ' ' + ascending,
        year + ' ' + descending,
        type + ' ' + ascending,
        type + ' ' + descending,
    ]

    function sortBy(target, command) {
        let sorted = [...target]
        if(command.includes(ascending)) {
            if(command.includes(year)) {
                sorted.sort((left, right) => {
                    return (left.vintage - right.vintage)
                })
            }
            else if(command.includes(price)) {
                sorted.sort((left, right) => {
                    return (left.price - right.price)
                })
            }
            else if(command.includes(type)) {
                sorted.sort((left,right) => {
                    return (left.wine_type.localeCompare(right.wine_type))
                })
            }
        }
        else if(command.includes(descending)) {
            if(command.includes(year)) {
                sorted.sort((left, right) => {
                    return (right.vintage - left.vintage)
                })
            }
            else if(command.includes(price)) {
                sorted.sort((left, right) => {
                    return (left.price - right.price)
                })
            }
            else if(command.includes(type)) {
                sorted.sort((left,right) => {
                    return (right.wine_type.localeCompare(left.wine_type))
                })
            }
        }
        setFilteredStock(sorted)
        setCurrentSort(command)
    }

    //filtering
    const filterStrings = [
        ...years,
        ...types,
        notInCase
    ]

    function applyFilters(target, theFilters) {
        const fstock = [...target]
        stock.forEach((s) => {
            theFilters.forEach((f) => {
                let spliced = false
                if(f.includes(year)) {
                    if (!f.includes(s.vintage)) {
                        const i = fstock.indexOf(s)
                        if (i !== -1) {
                            fstock.splice(i, 1)
                            spliced = true
                        }
                    }
                }
                if(!spliced) {
                    if(f.includes(notInCase)) {
                        caseItems.forEach((o) => {
                            if(o.shopify_id === s.shopify_id) {
                                const i = fstock.indexOf(s)
                                if(i !== -1) {
                                    fstock.splice(i, 1)
                                }
                            }
                        })
                    }
                }
                if(!spliced) {
                if(f.includes(type)) {
                    if (!f.includes(s.wine_type)) {
                        const i = fstock.indexOf(s)
                        if (i !== -1) {
                            fstock.splice(i, 1)
                        }
                    }
                }
            }
            })
        })
        setFilteredStock(fstock)
    }


    function addFilter(filterStr) {
        if(filters.indexOf(filterStr) === -1) {
            const f = [...filters]
            f.push(filterStr)
            setFilters(f)

            applyFilters(searchedStock, f)
        }
    }

    function removeFilter(filterStr) {
        const i = filters.indexOf(filterStr) 
        if(i !== -1) {
            const f = [...filters]
            f.splice(i, 1)
            setFilters(f)

            applyFilters(searchedStock, f)
        }
    }

    //an extra step that just checks whether the filter is active or not
    function toggleFilter(filterStr) {
        if(filters.indexOf(filterStr) === -1) {
            addFilter(filterStr)
        }
        else {
            removeFilter(filterStr)
        }
    }

    function searchForWines(searchStr) {
        let searched = []
        //look for the string in vintage, wine type, and title
        stock.forEach((o) => {
            if(o.wine_type.includes(searchStr) || o.title.includes(searchStr) || searchStr.includes(o.vintage)) {
                searched.push(o)
            }
        })
        if(searched.length) {
            setSearchedStock(searched)
            applyFilters(searched, filters)
        }
    }
    function clearSearch() {
        searchInput.current.value = ''
        let s = [...stock]
        setSearchedStock(s)
        applyFilters(s, filters)
    }

    if(firstRun && stock) {
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

    const addToShopify = (e) => {
        e.preventDefault()

        var properties = {};
        var totals = {};
        let c = [...caseItems];    
        for(let i = 0; i < c.length; i++) {
            if(totals[c[i].title]===undefined) totals[c[i].title] = 1;
            else totals[c[i].title] = totals[c[i].title]+1;
        }
        console.log(totals);
        var counter = 1;
        Object.keys(totals).forEach(key => {
            properties["Wine "+counter] = totals[key]+" x "+key;
            counter++; 
        });
        console.log(properties);
        console.log(caseItems);        

        let formData = {
            'items': [{
                'id': window.variant_id,
                'quantity': 1,
                'properties': properties
            }]
        };
        //alert(formData)
        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        //.then(response => {
        //    return response.json();
        //})
        .then((response) => response.json())
        .then((response) => {
            if (response.status) {
                this.handleErrorMessage(response.description);
                return;
            }

            console.log("goCartInstance:", window.goCartInstance);
            if (window.goCartInstance) {
                window.goCartInstance.addItemToCartHandler(response);
            } else {
                this.cartNotification.renderContents(response);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }   

    return(
        <div>
            <Row className='my-2'>
                <Col>
                <input ref={searchInput} className='d-inline search-minimal' placeholder={placeholder}></input>
                <Button className='d-inline button-minimal' onClick={(e) => {e.preventDefault(); searchForWines(searchInput.current.value);}}>{searchCTA}</Button>
                <Button className='d-inline button-minimal mx-1' onClick={(e) => {e.preventDefault(); clearSearch();}}>{clearCTA}</Button>
                </Col>
            </Row>
            <Row className='my-2'>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-minimal'>{sort}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            { sortStrings.map((s) => {
                                return(
                                <Dropdown.Item onClick={(e) => {e.preventDefault(); sortBy(filteredStock, s);}}>
                                    {s}
                                </Dropdown.Item>
                                )
                            })
                                
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-minimal'>{filter}</Dropdown.Toggle>
                    
                        <Dropdown.Menu>
                            { filterStrings.map((s) => {
                                return(
                                <Dropdown.Item onClick={(e) => {e.preventDefault(); toggleFilter(s);}}>
                                    {s}
                                </Dropdown.Item>
                                )
                            })
                                
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                <h3>
                    {totalItems}/{caseSize}
                </h3>
                </Col>               
                {(totalItems===caseSize)?<>
                <Col>
                    <Button variant="light" onClick={(e) => addToShopify(e)}>
                        Add to Cart
                    </Button>
                </Col>
                </>:<></>} 
            </Row>
            {/** display current filters on the dataset */}
            <Row>
                <ul className='horizontal-list'>
                    <p>Sorting by: {currentSort}</p>
                </ul>
            </Row>
            <Row>
                <ul className='horizontal-list'>
                    <li className='horizontal-list-item'>
                        {CurrentFilters}
                    </li>
        
                {filters && filters.map((s) => {
                    return(
                        <li className='horizontal-list-item'>
                            <span >
                                <Button className='horizontal-list-item button-minimal' onClick={(e) => {e.preventDefault(); removeFilter(s)}}>x</Button>
                                <p className='horizontal-list-item'>{s}</p>
                            </span>
                        </li>
                    )
                })}
                </ul>
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
                        { filteredStock && filteredStock.length && stock.map((o, i) => {
                            //const [localQuantity, setLocalQuantity] = useState(0)

                            if(i !== 0 && (i-1) % 2 === 0) {
                                switchTheme()
                            }

                            let classname = 'm-0 d-block ' + theme

                            return(
                                
                                <Col md={6} className={classname}>
                                    <CaseItem defaultQuantity={o.quantity} item={o} caseSize={caseSize} totalItems={totalItems} setTotalItems={setTotalItems} caseItems={caseItems} setCaseItems={setCaseItems} bgClass={theme}/>
                                 </Col>
                                
                        )})
                            }
                    
                </Row>
            </Row>
        </div>
    )
}
