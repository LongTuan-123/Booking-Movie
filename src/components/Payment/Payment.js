import Layout from "../../Layout/Layout";
import ButtonWrapper from "./ButtonPayment";
import "../../style/Payment.scss";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_PAY_SEAT } from "../../config/endpointapi";
import { useParams } from "react-router-dom";

const currency = "USD";
const Payment = () => {
  const { id } = useParams()
  const ticket = JSON.parse(localStorage.getItem("@ticket"))
  const [token] = useState(localStorage.getItem("token_user"));
  const [ticketID, setTicketID] = useState([])
  const [money, setMoney] = useState(0)

  useEffect(() => {
    if(ticket) {
      ticket?.map(t => {
        setTicketID((prev) => [...prev, t?.id])
        setMoney((prev) => prev + t?.money)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(ticketID, money)

  const handleAccept = async() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    await axios.post(API_PAY_SEAT, { confirm: 1, id_count: ticketID?.join(','), showtime: id })
      .then(() => {
        localStorage.removeItem('@ticket')
      })
      .catch(err => {
        console.log(err)
      })
  } 

  const handleDenied = () => {
    toast.warn("You have cancel the transaction");
  }

  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
      <div className="payment">

        <ButtonWrapper 
          amount={'1'}
          currency={currency}
          showSpinner={false}
          onAccept={handleAccept}
          onDenied={handleDenied}
        />
      </div>
    </Layout>
  );
};
export default Payment;
