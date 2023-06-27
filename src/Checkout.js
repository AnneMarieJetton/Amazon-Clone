import React from "react"
import Header from './Header';
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { useStateValue } from './StateProvider';
import CurrencyFormat from "react-currency-format";
import "./Checkout.css";

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div>
            <Header />
            <div className="checkout">
                <div className="checkout__left">
                    <img 
                        className="checkout__ad"
                        // Src="https://static.semrush.com/blog/uploads/media/c2/52/c2521160ece538cfdbfb218788caf9ea/mDWwN6GNJt_lE7-pGth6IXsdxvqVmPeaGHw-F_dHXiKN8p3FGgIVicwvbdShvLirF5slOvKUkxpfMkaVdne2a6do6vHWdLZSfy1i-lGmfZL9-FyS162K6P-QGbZbk1vKp9YjNSil%3Ds0.png"
                        Src="https://influencermarketinghub.com/wp-content/uploads/2021/11/Amazon-Display-Ad-Amazon-1024x140.jpg"
                        alt=""
                    />

                    <h3>Hello, {user?.email}</h3>

                    {basket?.length === 0 ? (
                        <div>
                            <h2>Your shopping basket is empty</h2>
                            <p>
                                You have no items in your basket. To buy one or more items, click "add to basket" next to the item.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="checkout__title">Your Shopping Basket</h2>

                            {/* list basket items */}
                            {basket?.map((item) => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {basket.length > 0 && (
                    <div className = "checkout__right">
                        <Subtotal />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;