import Layout from "../../Layout/Layout";
import ButtonWrapper from "./ButtonPayment";
import "../../style/Payment.scss";
import { toast, ToastContainer } from "react-toastify";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  API_DELETE_SEAT,
  API_PAY_SEAT,
  API_SHOWTIME_DETAIL,
} from "../../config/endpointapi";
import Navigation from "../../Layout/Navigation";
import { useHistory, useParams } from "react-router-dom";
import { HOME, SEAT_PLAN } from "../../config/path";
import { bindParam } from "../../config/function";
import moment from "moment";
import { getToken } from "../../Http";

const currency = "USD";
const Payment = () => {
  const { id } = useParams();
  const ticket = JSON.parse(localStorage.getItem("@ticket"));
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  const [ticketID, setTicketID] = useState([]);
  const [money, setMoney] = useState(0);
  const show_time = localStorage.getItem("@showtime");
  const [showTimeDetail, setShowTimeDetail] = useState({});
  const showtimedetail = JSON.parse(localStorage.getItem("@showtime"));
  const [movieDetail, setMovieDetail] = useState({});
  const [room, setRoom] = useState({});

  const renderer = ({ minutes, seconds, completed }) => {
    setComplete(completed);
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  // useEffect(() => {
  //   const getTicket = async () => {
  //     const params = { limit: 1000, seat: seatSearch, page: 1, keyword: localStorage.getItem("@showtime") }
  //     await axios.get(API_TICKET, {params})
  //       .then(res => {
  //         setShowtime(res?.data?.data?.data)
  //       })
  //   }

  //   getTicket()
  // }, [])

  useEffect(() => {
    const getShowTimeDetail = async () => {
      await axios
        .get(bindParam(API_SHOWTIME_DETAIL, { id: showtimedetail }))
        .then((res) => {
          setShowTimeDetail(res?.data?.data);
          setMovieDetail(res?.data?.data?.movie);
          setRoom(res?.data?.data?.room);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getShowTimeDetail();
  }, []);

  useEffect(() => {
    const deleteData = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      await axios
        .post(API_DELETE_SEAT, {
          id_count: ticketID?.join(","),
          showtime: show_time,
        })

        .then(() => {
          toast.error("B???n ???? h???t th???i gian ?????t v?? vui l??ng th??? l???i");
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (ticket) {
      ticket?.map((t) => {
        setTicketID((prev) => [...prev, t?.id]);
        console.log(ticketID);
        setMoney((prev) => prev + t?.money);
        console.log(money);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    await axios
      .post(API_PAY_SEAT, {
        confirm: 1,
        id_count: ticketID?.join(","),
        showtime: show_time,
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
      .post(API_DELETE_SEAT, {
        id_count: ticketID?.join(","),
        showtime: show_time,
      })
      .then(() => {
        localStorage.removeItem("@ticket");
        history.push(bindParam(SEAT_PLAN, { id }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDenied = async () => {
    toast.warn("B???n ???? d???ng thanh to??n");
  };

  return (
    <Layout>
      <Navigation>
        Thanh to??n
      </Navigation>
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
      <div className="payment  row">
        <div className="payment-detail-title col-xl-8 col-sm-12">
          Th??ng tin chi ti???t
        </div>
        <div className="payment-detail col-xl-8 col-sm-12">
          <div className="payment-detail-left">
            <div className="payment-detail-left-label">Phim :</div>

            <div className="payment-detail-left-info">{movieDetail.name}</div>
            <div className="payment-detail-left-label">Ph??ng chi???u :</div>

            <div className="payment-detail-left-info">{room.name}</div>
            <div className="payment-detail-left-label">Ng??y chi???u :</div>

            <div className="payment-detail-left-info">
              {showTimeDetail.show_date}
            </div>
            <div className="payment-detail-left-label">Gi??? chi???u :</div>

            <div className="payment-detail-left-info">
              {showTimeDetail.show_time}
            </div>
            <div className="payment-detail-left-label">Gh??? ???? Ch???n : </div>

            <div className="payment-detail-left-info">{ticketID}</div>
            <div className="payment-detail-left-label">T???ng ti???n :</div>

            <div className="payment-detail-left-info">{money} dollar</div>
          </div>
          <div className="payment-detail-right">
            <img src="https://thumbs.dreamstime.com/b/cinema-ticket-icon-retro-template-isolated-white-background-set-tickets-to-theater-concert-other-event-vector-173751967.jpg"></img>
          </div>
        </div>
        <div className="payment-tool col-xl-4 col-sm-12">
          Th???i gian c??n l???i :
          <Countdown date={moment() + 300000} renderer={renderer}></Countdown>{" "}
          ph??t
          <ButtonWrapper
            amount={money}
            currency={currency}
            showSpinner={false}
            onAccept={handleAccept}
            onDenied={handleDenied}
          />
          Nh???p v??o h??nh ????? thanh to??n
          <button onClick={handleCancel}>H???y thanh to??n</button>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;