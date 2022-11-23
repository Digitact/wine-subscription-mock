import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { CaseItem } from './CaseItem';

export const GlobalPicker = ({ caseSize, caseItems, setCaseItems, caseCount, setCaseCount, customRules }) => {
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [defaultWines, setDefaultWines] = useState([]);
    const [firstRun, setFirstRun] = useState(true);
    const [stock, setStock] = useState([]);

    const _setTotalItems = (i) => {
        setTotalItems(i);
        setCaseCount(i);
    };

    useEffect(() => {
        async function fillStock() {
            setDefaultWines(customRules);
            setStock(customRules);
            setLoading(false);
        }
        fillStock();
    }, [totalItems]);

    let theme = 'case-item-light';

    const switchTheme = () => {
        if (theme === 'case-item-light') {
            theme = 'case-item-dark';
        } else {
            theme = 'case-item-light';
        }
    };

    if (loading) {
        return <p>Loading casepicker...</p>;
    }

    if (firstRun && defaultWines) {
        setFirstRun(false);

        const vd = [];
        const wines = [];
        let t = 0;
        //on the first run through we want to populate the case with any defaults mandated by the vendor
        defaultWines.forEach((w, i) => {
            for (let i = 0; i < w.quantity; i++) {
                wines.push(w);
            }
            vd.push(w);
            t += parseInt(w.quantity);
        });
        setCaseItems(wines);
        _setTotalItems(t);
    }

    return (
        <div>
            <Row className="my-2">
                <Col>
                    <h3>
                        Selected: {totalItems}/{caseSize}
                    </h3>
                </Col>
            </Row>
            <Row className="scrollable m-0">
                <Row>
                    {stock.length &&
                        stock.map((o, i) => {
                            if (i !== 0 && (i - 1) % 2 === 0) {
                                switchTheme();
                            }

                            const classname = 'm-0 d-block ' + theme;

                            return (
                                <Col md={6} className={classname}>
                                    <CaseItem
                                        defaultQuantity={o.quantity}
                                        item={o}
                                        caseSize={caseSize}
                                        totalItems={totalItems}
                                        setTotalItems={_setTotalItems}
                                        caseItems={caseItems}
                                        setCaseItems={setCaseItems}
                                        bgClass={theme}
                                    />
                                </Col>
                            );
                        })}
                </Row>
            </Row>
        </div>
    );
};

export default GlobalPicker;
