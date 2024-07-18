import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import {useParams} from "react-router-dom"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MUCJqSJ5OsYGHjpJhKQbhdQCaudm4Q0A6XW0zdVkytY72xLYRsdYngBBw7jtSTflDWuBYBIFqH4I3r6M5UgrB1b00iqZkok7q");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const id = useParams();
  console.log(id.id)

  useEffect(() => {

    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3000/api/payment/create-intent", {
      method: "POST",
      headers: {'Content-Type':'application/json',
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true" },
      body: JSON.stringify({amount: id.id}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);


  const appearance = {
    theme: 'stripe',
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}