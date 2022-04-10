import Layout from "../../Layout/Layout";
import ButtonWrapper from "./ButtonPayment";
import "../../style/Payment.scss";
import { toast, ToastContainer } from "react-toastify";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_DELETE_SEAT, API_PAY_SEAT } from "../../config/endpointapi";
import { useHistory, useParams } from "react-router-dom";
import { HOME, SEAT_PLAN } from "../../config/path";
import { bindParam } from "../../config/function";
import moment from "moment";

const currency = "USD";
const Payment = () => {
  const { id } = useParams();
  const ticket = JSON.parse(localStorage.getItem("@ticket"));
  const [token] = useState(localStorage.getItem("token_user"));
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  const [ticketID, setTicketID] = useState([]);
  const [money, setMoney] = useState(0);

  const renderer = ({ minutes, seconds, completed }) => {
    setComplete(completed);
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  useEffect(() => {
    const deleteData = async () => {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      await axios
        .post(API_DELETE_SEAT, { id_count: ticketID?.join(","), showtime: id })
        .then(() => {
          toast.error("Bạn đã hết thời gian đặt vé vui lòng thử lại")
          localStorage.removeItem("@ticket");
          history.push(bindParam(SEAT_PLAN, { id }));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (complete) {
      deleteData();
    }
  }, [complete]);

  useEffect(() => {
    if (ticket) {
      ticket?.map((t) => {
        setTicketID((prev) => [...prev, t?.id]);
        setMoney((prev) => prev + t?.money);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    await axios
      .post(API_PAY_SEAT, {
        confirm: 1,
        id_count: ticketID?.join(","),
        showtime: id,
      })
      .then(() => {
        localStorage.removeItem("@ticket");
        history.push(HOME);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = async () => {
    await axios
      .post(API_DELETE_SEAT, { id_count: ticketID?.join(","), showtime: id })
      .then(() => {
        localStorage.removeItem("@ticket");
        history.push(bindParam(SEAT_PLAN, { id }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDenied = async () => {
    toast.warn("You have cancel the transaction");
  };

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
        <Countdown date={moment() + 300000} renderer={renderer}></Countdown>
        <ButtonWrapper
          amount={money}
          currency={currency}
          showSpinner={false}
          onAccept={handleAccept}
          onDenied={handleDenied}
        />
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Layout>
  );
};
export default Payment;
