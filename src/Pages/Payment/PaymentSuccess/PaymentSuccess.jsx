import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const{tranid}=useParams();
    return (
        <div>
            <h1>PaymentSuccess{tranid}</h1>
        </div>
    );
};

export default PaymentSuccess;