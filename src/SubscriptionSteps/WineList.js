import React from "react";

const WineList = ({wines}) => {
    return(
        <div class="wine_list">
            <ul>
            {wines && wines.map((o) => {
                return(
                    <li><p>{o.quantity} x {o.title}</p></li>
                )
            })
            }
            </ul>
        </div>
    )
}

export default WineList;