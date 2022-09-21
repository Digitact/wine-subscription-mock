import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Strings, Language } from '../assets/Strings';

export default({ caseSize, caseItems, setCaseItems, filters, setFilters, filterables, searchables, stock, filteredStock, setFilteredStock }) => {
    const [searchedStock, setSearchedStock] = useState([])
    const [currentSort, setCurrentSort] = useState('None')
    const [finishedCases, setFinishedCases] = useState([])
    const searchInput = useRef()

    useEffect(() => {
        setSearchedStock([...stock])
    }, [stock])

    const filterToken = ':'

    const cur = Strings[Language].GlobalPicker
    const placeholder = cur['SearchPlaceholder']
    const searchCTA = cur['SearchCTA']
    const clearCTA = cur['ClearCTA']
    const sort = cur['SearchSort']
    const year = cur['SearchYear']
    const type = cur['SearchType']
    const notInCase = cur['SearchNotInCase']
    const price = cur['SearchPrice']
    const ascending = cur['SearchAscending']
    const descending = cur['SearchDescending']
    const CurrentFilters = cur['SearchCurrentFilters']
    const caseFull = cur['CaseFull']

    const years = []
    const types = []
    const filterObject = {}

    stock.forEach((o) => {
        const yearstr = year + ': ' + o.vintage
        const typestr = type + ': ' + o.wine_type

        if(years.indexOf(yearstr) === -1) {
            years.push(yearstr)
        }

        if(types.indexOf(typestr) === -1) {
            types.push(typestr)
        }

        for (const [key, val] of Object.entries(o)) {
            if(filterables.includes(key)) {
                if (val!="") { //no blank values
                    if (key in filterObject) {
                        //console.log("match - updating:"+key);
                        if(!filterObject[key].includes(val)) { //no repeats
                            filterObject[key].push(val);
                        }
                    }
                    else {
                        //console.log("no match - adding:"+key);
                        filterObject[key] = [val];
                    }    
                }
            }
        }
    })

    //sort the filter values
    for (const [key, value] of Object.entries(filterObject)) {
        var numberfields = ["vintage","ph","serving_temperature","acidity","bottle_size"];
        if (numberfields.includes(key)) { //sort by number value
            value.sort(function(a, b){return a-b});
        }        
        else { //sort by text value
            value.sort();
        }        
    }

    //sorting
    const sortStrings = [
        year + ' ' + ascending,
        year + ' ' + descending,
        type + ' ' + ascending,
        type + ' ' + descending
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

    //when applying filters, we have to do a bit of transformation to the strings as what is displayed is different to what comes in as data
    function applyFilters(target, theFilters) {
        const fstock = [...target]
        stock.forEach((s) => {
            theFilters.forEach((f) => {
                //tokenise the filter we're looking at by filterToken
                const tokens = f.split(filterToken);

                if(tokens.length != 2) return;  //needs to be a key:value indicating filter:subfilter

                //if filterables includes the first token then proceed
                if(filterables.includes(tokens[0].toLowerCase().trim().replaceAll(' ', '_'))) {
                    let spliced = false

                    //now get all the properties of the stock item as key/value pairs
                    //  find the member variable matching token[0]
                    //  if the value doesn't equal token[1], splice it out
                    for (const [key, val] of Object.entries(s)) {
                        if(key.replaceAll('_', ' ').toUpperCase() === tokens[0].trim().toUpperCase()) {
                            if(val !== tokens[1].trim()) {
                                const i = fstock.indexOf(s)
                                
                                if(i !== -1) {
                                    fstock.splice(i, 1);
                                }
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

            applyFilters(searchedStock,f)
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
            searchables.forEach((s) => {
                for(const [k,v] of Object.entries(o)) {
                    if(!searched.includes(o) && k === s && v.toUpperCase().includes(searchStr.toUpperCase())) {
                        searched.push(o)
                        break;
                    }
                }
            })
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

    return (
        <>
            <Row className='my-2'>
                <Col xs={6}>
                    <input ref={searchInput} className='d-inline search-minimal' onKeyPress={(e) => {if (e.key === "Enter") {searchForWines(searchInput.current.value);}}} placeholder={placeholder}></input>
                    <Button className='d-inline btn btn-dark' onClick={(e) => {e.preventDefault(); searchForWines(searchInput.current.value);}}>{searchCTA}</Button>
                    <Button className='d-inline btn btn-dark mx-1' onClick={(e) => {e.preventDefault(); clearSearch();}}>{clearCTA}</Button>
                </Col>
                <Col xs={6} className="text-end">
                </Col>               
            </Row>

            <Row className='my-2 d-inline'>
                <Dropdown className='d-inline'>
                    <Dropdown.Toggle className='btn-dark dropdown-minimal'>{sort}</Dropdown.Toggle>
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

                { Object.entries(filterObject).map((key) => {  
                        var title = key[0].replaceAll('_', ' ');
                        title = title.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
                        return(
                        <Dropdown className='d-inline'>
                            <Dropdown.Toggle className='dropdown-minimal'>
                                {title}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                { key[1].map((v) => {
                                    return(
                                        <Dropdown.Item onClick={(e) => { e.preventDefault(); toggleFilter(title + filterToken + ' ' + v); }}>
                                            {v}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>

                        </Dropdown>)
                    })
                }
            </Row>
            
            <Row>
                <ul className='d-inline'>
                    <p>Sorting by: {currentSort}</p>
                </ul>
            </Row>

            <Row>
                <ul className='d-inline'>
                    <li className='d-inline float-left'>
                        { CurrentFilters }
                    </li>

                    { filters && filters.map((s) => {
                        return (
                            <li className='d-inline float-left'>
                                <span>
                                    <Button className='d-inline float-left button-minimal' onClick={(e)=>{e.preventDefault(); removeFilter(s)}}>x</Button>
                                    <p className='d-inline float-left'>{s}</p>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </Row>
        </>
    )
}
