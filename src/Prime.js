import React from "react"
import Header from './Header';
import { useStateValue } from './StateProvider';
import CurrencyFormat from "react-currency-format";
import "./Prime.css";

function Prime() {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div>
            <Header />
            <div className="prime">
                <img 
                    className="prime__image"
                    src="https://i.pcmag.com/imagery/articles/05qp7E8Z6G2lM79Y6Epl0tl-7..v1660073093.jpg" 
                    alt=""
                />
                <div className="prime__container">
                    <h1>Your Prime</h1>
                    <h2>Hello {!user ? 'Guest' : user.email},</h2>
                    <h2>{!user ? 'Please Log in to use your prime benefits!' : 'Thanks for being a prime member!'}</h2>
                    <h2 className="prime__spacer"></h2>
                    <h2>{!user ? 'Prime Benefits include:' : 'Your prime benefits include:'}</h2>
                    <ul>
                        <li>2-Day Free Shipping</li>
                        <li>Special Discounts and Deals</li>
                        <li>Amazon Prime Video</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Prime;