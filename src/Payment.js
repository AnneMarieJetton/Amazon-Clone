import React, {useState, useEffect} from 'react';
import Header from './Header';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import axios from './Axios';
import { db } from './Firebase';

function Payment() {
    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();

    // const promise = loadStripe("pk_test_51NKtYcJbbYAIKf3mPXnxoupDFGsK18kux2yc6BkAFdDIaQXVbT8jj2cxnLfJfsiOJHMdNUTSeZ5b8rCyJZzbvw8700Yd7nsj74");
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const[disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate stripe secret
        const getClientSecret = async () => {
            console.log("the basket:", basket);
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log('The secret: ', clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //payment intent is payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            //empties the basket, causes strange error to occur where it will try to run the stripe order creation a second time.
            // dispatch({
            //     type: 'EMPTY_BASKET'
            // })

            navigate('/orders', { replace: true });
        }) 
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <Header />

                <div className='payment__container'>
                    <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>

                    {/* delivery address */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Delivery Address</h3>
                        </div>
                        <div className='payment__address'>
                            <p>{user?.email}</p>
                            <p>123 address lane</p>
                            <p>Los Angeles, CA</p>
                        </div>
                    </div>
                    {/* review items */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Review items and delivery</h3>
                        </div>
                        <div className='payment__items'>
                            {basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </div>
                    </div>
                    {/* payment method */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Payment Method</h3>
                        </div>
                        <div className='payment__details'>
                            {/* stripe stuff goes here */}
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                            <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                    </button>    
                                </div>

                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Payment;