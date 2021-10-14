import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  //both hooks are for stripe payments.
  const stripe = useStripe();
  const elements = useElements();

  //for stripe payment
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  //for error catiching in stripe
  const [error, setError] = useState(null);
  //for disabling the button in stripe.
  const [disabled, setDisabled] = useState(true);
  //to get client secret from strip for the amount of pay.
  const [clientSecret, setClientSecret] = useState(true);

  //VERY IMPORTANT FOR PAYMENTS TO WORK PROPERLY !!!
  useEffect(() => {
    //generete the special stripe secret which allows us to charge a customer.
    //it should run every time the basket changes in the payment page, because total price also changes with change in basket.
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expect the total in a currencies subunits
        url: `/payments/create?total=${Math.round(
          getBasketTotal(basket) * 100
        )}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>> ", clientSecret);

  //this is to handle the payment CardElement form submit.
  const handleSubmit = async (event) => {
    //all the fancy stripe stuff.
    event.preventDefault();
    setProcessing(true);

    //after the useEffect gets the clientSecret.
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation.

        //adding to db, the order history.
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //we dont want the payment page to show up if clicked back button.
        //so we use, .replace().
        history.replace("/orders");

        //To clear the basket after paying.
        dispatch({
          type: "EMPTY_BASKET",
        });
      });
  };

  const handleChange = (event) => {
    //listen for changes in the CardElement
    //and display any errors as the customer types their card details.
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ({<Link to="/checkout">{basket?.length} items </Link>})
        </h1>
        {/* payment section - delivery address. */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React lane</p>
            <p>Los Angelaes, CA</p>
          </div>
        </div>
        {/* payment section - review items. */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items & Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
        {/* payment section - payment method. */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items & Delivery</h3>
          </div>
          <div className="payment__details">
            {/* this form is for including the CardElement from the Stripe */}
            <form onSubmit={handleSubmit} method="POST">
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => {
                    return <h3>Order Total {value}</h3>;
                  }}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* if there is an error, then show that inside a div. */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
