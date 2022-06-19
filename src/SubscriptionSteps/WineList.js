import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default({wines}) => {
    return(
        <div>
            <ul>
            {wines && wines.map((o) => {
                return(
                    <li><p>{o.quantity} x {o.vintage} {o.title}</p></li>
                )
            })
            }
            </ul>
        </div>
    )
}
