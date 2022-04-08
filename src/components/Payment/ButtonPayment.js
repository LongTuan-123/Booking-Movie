import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
const style = { layout: "vertical" };

const ButtonWrapper = ({ amount, currency, showSpinner, onAccept, onDenied }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
				
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={onAccept}
				onShippingChange={(data) => {
					console.log(data)
				}}
        onCancel={onDenied}
      />
    </>
  );
};

export default ButtonWrapper;
