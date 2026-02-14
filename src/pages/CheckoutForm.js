import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { navigateToMap } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const serverDomain =
  process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
    : process.env.REACT_APP_DOMAIN_NAME_SERVER;

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const bookedPlant = JSON.parse(localStorage.getItem("booked-plant"));
    if (!bookedPlant?.owner_id || !bookedPlant?.id) {
      localStorage.removeItem("booked-plant");
      navigate("/");
      return;
    }
    fetch(`${serverDomain}/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`${serverDomain}/create-checkout-session`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
