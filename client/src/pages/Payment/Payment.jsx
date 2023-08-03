import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Payment() {
const navigate = useNavigate();

const handlePayment = async () => {
  const stripe = await stripePromise;

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'price_1JHABC2eZvKYlo2CZwxd92Kl', quantity: 1 }],
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
<p>Registration Fee: $25</p>
<button onClick={handlePayment}>Pay</button>
</div>
);
}

export default Payment;
