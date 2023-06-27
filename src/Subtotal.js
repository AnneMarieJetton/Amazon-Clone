import React from "react";
import './Subtotal.css';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./Reducer"
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

function Subtotal() {
    const navigate = useNavigate()
    const [{ basket }, dispatch] = useStateValue();

    return <div className="subtotal">
        {/* Price */}

        <CurrencyFormat

            renderText={(value) => (
                <>
                    <p>
                        Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )}

            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        
        />

        <button onClick ={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>;
}

export default Subtotal;