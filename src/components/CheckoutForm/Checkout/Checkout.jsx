import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import { commerce} from '../../../lib/commerce'
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setcheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})

  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'}) 

            console.log(token)
            setcheckoutToken(token)
        } catch (error) {
            
        }
    }

    generateToken()
  }, [cart])

//   since we are setting the state using the previous state value, we have to call as cb fn
//  as a result we are not mutating the old state
const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

const next = (data) => {
    setShippingData(data)

    nextStep()
}
  
 const Confirmation = () => (
     <div>
         Confirmation
     </div>
 )

//  passing checkoutToken to PaymentForm so that child Review component has access to all cart items
  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next}/>
  : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
