import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [amount, setAmount] = useState("")

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Sunflower",
          amount: {
            value: amount,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    }).then((orderID) => {
      setOrderID(orderID)
      return orderID
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details
      console.log(payer)
      setSuccess(true)
    })
  }

  const onError = (data, actions) => {
    console.log(data)
    setErrorMessage("Une erreur s'est produite lors de votre paiement")
  }

  useEffect(() => {
    if (success) {
      alert("Payement successful !!")
    }
  }, [success])

  console.log(1, orderID)
  console.log(2, success)
  console.log(3, ErrorMessage)
  console.log(4, amount)

  return (
    <div className='App'>
      {
        show ?
          <div className='containerPayement'>
            <PayPalScriptProvider options={{ "client-id": "ATDHSGw1Df2uTuXswERAkPINZzFIoFklpcr97zagnjdHM2t4tQA1KCIgW2kUyp80NDvOIuK4NqnDG2CW", currency: "EUR"}}>
              <PayPalButtons style={{ layout: 'vertical' }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            </PayPalScriptProvider>
            <button style={{ marginBottom: 10 }} type='submit' onClick={() => setShow(false)}>
              Retour
            </button>
          </div>
          :
          <div className='BtnPayment'>
            <button type='submit' $
              onClick={() => {
                setShow(true)
                setAmount("5")
              }}
            >
              5 €
            </button>
            <button type='submit' $
              onClick={() => {
                setShow(true)
                setAmount("10")
              }}
            >
              10 €
            </button>
            <button type='submit' $
              onClick={() => {
                setShow(true)
                setAmount("15")
              }}
            >
              15 €
            </button>
            <button type='submit' $
              onClick={() => {
                setShow(true)
                setAmount("20")
              }}
            >
              20 €
            </button>
          </div>
      }
    </div>
  )
}

export default App;
