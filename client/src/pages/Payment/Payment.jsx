import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";

// console.log("Stripe API Key: ", process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const stripePromise = loadStripe('pk_test_51Na2WQA7KomKEVh5QNjaIGNCUJyfrCLN9ge85ZZRrN4NOzbppYXtRRINyLjMygnFuyuRyibdSGud4xKTkbzeV1el00bmqdO2Lc');

function Payment() {
const navigate = useNavigate();

const handlePayment = async () => {
  const stripe = await stripePromise;

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'price_1NaqlRA7KomKEVh5i2xn7K71', quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/register?success=true`,
    cancelUrl: `${window.location.origin}/register?canceled=true`,
});


  if (error) {
    console.warn('Error:', error);
  }
};

return (
<div>
<h1>Payment Page</h1>
<p>Registration Fee: $40</p>
<button onClick={handlePayment}>Pay</button>
</div>
);
}

export default Payment;
