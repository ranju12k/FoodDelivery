import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setOrderData(data.orderData);
        } catch (error) {
            console.error("Error fetching order data:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    console.log("orderData:", orderData);

    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : orderData.length > 0 ? (
                        orderData.map((data, index) => (
                            <div key={index}>
                                {data.Order_date ? (
                                    <h2>{data.Order_date}</h2>
                                ) : (
                                    <p>No order date found for this entry.</p>
                                )}
                                <div className='row'>
                                    {data.order_data && data.order_data.length > 0 ? (
                                        data.order_data.map((nestedArray, nestedIndex) => (
                                            <div key={nestedIndex}>
                                                {nestedArray && nestedArray.length > 0 ? (
                                                    nestedArray.map((item, itemIndex) => (
                                                        <div className='col-12 col-md-6 col-lg-3' key={itemIndex}>
                                                            <p>ID: {item?.id}</p>
                                                            <p>Name: {item?.name}</p>
                                                            <p>Price: {item?.price}</p>
                                                            {/* Add more properties as needed */}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No items found in this order.</p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No order data found for this entry.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
