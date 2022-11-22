import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Strings, Language } from '../assets/Strings';

export const CaseItem = ({ defaultQuantity, item, caseSize, totalItems, setTotalItems, caseItems, setCaseItems, bgClass }) => {
    const [localQuantity, setLocalQuantity] = useState(defaultQuantity);

    const cur = Strings[Language].CaseItem;
    const Qty = cur['Quantity'];
    const Limit = cur['Limit'];
    const Minimum = cur['Minimum'];

    const incrementLocalQuantity = (e, o, q) => {
        e.preventDefault();
        if (o !== null) {
            if (totalItems + 1 <= caseSize && q < o.max) {
                const c = [...caseItems];
                c.push(o);
                setCaseItems(c);

                let z = q;
                z++;
                setLocalQuantity(z);

                let t = totalItems;
                t++;
                setTotalItems(t);
                //setButtonDisabled(false);
            }
        }
    };

    const decrementLocalQuantity = (e, o, q) => {
        e.preventDefault();

        if (q > 0 && q > o.min) {
            const c = [...caseItems];
            let ind = -1;

            for (let i = 0; i < c.length; i++) {
                if (c[i].shopify_id === o.shopify_id) {
                    ind = i;
                    break;
                }
            }
            c.splice(ind, 1);

            setCaseItems(c);

            let z = q;
            z--;
            setLocalQuantity(z);

            let t = totalItems;
            t--;
            setTotalItems(t);

            if (z === 0) {
                //setButtonDisabled(true);
            }
        }
    };

    return (
        <Col>
            <Row className="square-150">
                <img src={item.image} height={140} className="px-5" style={{ objectFit: 'contain' }} alt={item.title} />
            </Row>
            <Row className="m-auto">
                <Col xxs={3} md={3} className="w-25 d-flex justify-content-end p-0">
                    <Button
                        variant="dark"
                        className={'circle-button-bg ' + bgClass}
                        onClick={e => decrementLocalQuantity(e, item, localQuantity)}
                        disabled={localQuantity === item.min}
                    >
                        <b>-</b>
                    </Button>
                </Col>
                <Col xxs={4} className="w-50">
                    <p className="text-center">
                        {Qty}: {localQuantity}
                    </p>
                </Col>
                <Col xxs={3} md={3} className="w-25 d-flex justify-content-start p-0">
                    <Button
                        variant="dark"
                        className={'circle-button-bg ' + bgClass}
                        onClick={e => incrementLocalQuantity(e, item, localQuantity)}
                        disabled={totalItems === caseSize || localQuantity === item.max}
                    >
                        <b>+</b>
                    </Button>
                </Col>
            </Row>
            <Row>
                <p className="text-center">{item.title}</p>
            </Row>
            <Row>
                <Col>
                    <p>{item.wine_type}</p>
                </Col>
                <Col>
                    <p>
                        {item.min > 0 ? (
                            <>
                                {' '}
                                {Minimum} {item.min}
                                <br />
                            </>
                        ) : (
                            <></>
                        )}
                        {Limit} {item.max}
                    </p>
                </Col>
            </Row>
        </Col>
    );
};
