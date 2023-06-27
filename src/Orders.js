import React, { useEffect, useState } from 'react'
import Header from './Header'
import './Orders.css'
import  { db } from "./Firebase";
import { useStateValue } from './StateProvider';
import Order from './Order'

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div>
            <Header/>
            <div className='orders'>
                <h1>orders</h1>
                
                <div className='orders__order'>
                    {orders?.map(order => (
                        <Order order={order} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders