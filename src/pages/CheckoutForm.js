import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { navigateToMap } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const serverDomain =
  process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
    : process.env.REACT_APP_DOMAIN_NAME_SERVER;

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const [stripePromise, setStripePromise] = useState(null);

  const bookingInfo = JSON.parse(localStorage.getItem("booking-info"));
  useEffect(() => {
    if (!bookingInfo?.userId || !bookingInfo?.plantId) {
      localStorage.removeItem("bookingInfo");

      navigate("/");

      return;
    } else {
      fetch(`${serverDomain}/config`).then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      });
    }
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
