import Layout from "../../Layout/Layout";
import ButtonWrapper from "./ButtonPayment";
import "../../style/Payment.scss";

const currency = "USD";
const Payment = () => {
  return (
    <Layout>
      <div className="payment">
        <ButtonWrapper 
          amount={'10'}
          currency={currency}
          showSpinner={false}
        />
      </div>
    </Layout>
  );
};
export default Payment;
