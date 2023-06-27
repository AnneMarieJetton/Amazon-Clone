import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import Prime from './Prime'
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51NKtYcJbbYAIKf3mPXnxoupDFGsK18kux2yc6BkAFdDIaQXVbT8jj2cxnLfJfsiOJHMdNUTSeZ5b8rCyJZzbvw8700Yd7nsj74");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app conponent loads
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS: ', authUser);

      if (authUser) {
        //user just logged in/ user was logged in
        dispatch ({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //user is logged out
        dispatch ({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Prime" element={<Prime />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;