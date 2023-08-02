import React from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
const navigate = useNavigate();

const handlePayment = () => {
// Handle payment process here. After successful payment, navigate back to registration page
console.log("Processing payment...");
navigate('/register');
};

return (
<div>
<h1>Payment Page</h1>
<p>Registration Fee: $25</p>
<button onClick={handlePayment}>Pay</button>
</div>
);
}

export default Payment;