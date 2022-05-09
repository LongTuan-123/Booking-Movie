import axios from "axios";
import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import "../../style/Seatplan.scss";
import { useEffect, useState } from "react";
import { bindParam } from "../../config/function";
import {
  API_MOVIES_DETAIL,
  API_ORDER_SEAT,
  API_SEAT_IN_ROOM,
  API_SHOWTIME_DETAIL,
  API_TICKET,
} from "../../config/endpointapi";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { LOGIN, PAYMENT } from "../../config/path";
import { toast, ToastContainer } from "react-toastify";
import { getToken } from "../../Http";

const Seatplan = () => {
  const { id } = useParams();
  const [showtime, setShowtime] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [seatSearch] = useState("");
  const col = ["A", "B", "C", "D", "E", "F", "G", "H", ];
  const dataUser = JSON.parse(localStorage.getItem("data_user"))?.id;
  const user = localStorage.getItem("data_user");
  const row = [];
  const [selectSeat, setSelectSeat] = useState([]);
  const [moneyDetail, setMoneyDetail] = useState([]);
  const history = useHistory();
  const [money, setMoney] = useState(0);
  const [seat, setSeat] = useState();
  const [showTimeDetail, setShowTimeDetail] = useState({});
  const showtimedetail = JSON.parse(localStorage.getItem("@showtime"));
  const [movieDetail, setMovieDetail] = useState({});
  const [room, setRoom] = useState({});
  for (var i = 1; i <= 10; i++) {
    row.push(i);
  }

  useEffect(() => {
    const getTicket = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
      const params = {
        limit: 1000,
        seat: seatSearch,
        page: 1,
        keyword: localStorage.getItem("@showtime"),
      };
      await axios.get(API_TICKET, { params }).then((res) => {
        setShowtime(res?.data?.data?.data);
      });
    };

    getTicket();
  }, []);

  useEffect(() => {
    if (showtime) {
      showtime?.map((showT) => {
        setTicket((prev) => [...prev, showT?.seat?.id]);
      });
    }
  }, [showtime]);

  useEffect(() => {
    const getShowTimeDetail = async () => {
      await axios
        .get(bindParam(API_SHOWTIME_DETAIL, { id: showtimedetail }))
        .then((res) => {
          setShowTimeDetail(res?.data?.data);
          setMovieDetail(res?.data?.data?.movie);
          setRoom(res?.data?.data?.room);
          console.log(movieDetail);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getShowTimeDetail();
  }, []);

  useEffect(() => {
    const getSeat = async () => {
      await axios
        .get(bindParam(API_SEAT_IN_ROOM, { id }))
        .then((res) => {
          setSeat(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getSeat();
  }, []);

  const onSelectSeat = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectSeat((prev) => [...prev, JSON.parse(value)]);
      setMoneyDetail((prev) => [...prev, JSON.parse(value).money]);
      setMoney(money + JSON.parse(value).money);
      console.log(selectSeat);
    } else {
      const seatClone = [...selectSeat];
      const moneyClone = [...moneyDetail];

      const moneyFilter = moneyClone.filter(
        (money) => money !== JSON.parse(value).money,
      );
      const seatFilter = seatClone.filter(
        (seat) => seat?.id !== JSON.parse(value).id,
      );

      setSelectSeat(seatFilter);
      setMoneyDetail(moneyFilter);
      setMoney(money - JSON.parse(value).money);
    }
  };

  const handlePayment = () => {
    if (dataUser && user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
      axios
        .post(API_ORDER_SEAT, {
          seats: selectSeat.map((seat) => seat.id).join(","),
          showtime_id: Number(localStorage.getItem("@showtime")),
          confirm: 0,
          money: moneyDetail.join(","),
          created_at: moment().format("YYYY-MM-DD HH:mm"),
          user_id: dataUser,
        })
        .then((res) => {
          localStorage.setItem("@ticket", JSON.stringify(selectSeat));
          history.push(bindParam(PAYMENT, { id }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Vui lòng đăng nhập để chọn ghế");
      history.push(LOGIN);
    }
  };

  return (
    <Layout>
      <Navigation />
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
      <div className="seatplan">
        <div className="seatplan-title">
          <div className="seatplan-title-label">
            Phòng chiếu <br /> {room.name}
          </div>
          <div className="seatplan-title-label">
            Giờ chiếu <br /> {showTimeDetail.show_time}
          </div>
          <div className="seatplan-title-label">
            Phim <br /> {movieDetail.name}
          </div>
          {/* <div className="seatplan-title-label">Số ghế</div>
          <div className="seatplan-title-label">
            Time left
            <br />
          </div> */}
        </div>
        <div className="seatplan-content">
          <div className="seatplan-content-screen">
            <h2>Screen</h2>
            <img
              className="seatplan-content-screen__img"
              src="http://pixner.net/boleto/demo/assets/images/movie/screen-thumb.png"
              alt="man"
            />
            <div className="seatwrap">
              <div className="seatplan-content-screen-col">
                {col.map((c) => {
                  return <div className="col">{c}</div>;
                })}
              </div>

              <div className="seatplan-content-screen-seat">
                <div className="seatplan-content-screen-seat-single">
                  {seat?.map((se) => {
                    if (!!ticket.includes(se?.id)) {
                      return(

                      <div className="seatplan-content-screen-seat-single_check">    
                          <span className="checkbackground__checked underline">
                            {se?.row}
                            {se?.order}
                          </span>
                        </div>
                      )

                    } else {
                      return (
                        <div className="seatplan-content-screen-seat-single_check">
                          <input
                            onChange={onSelectSeat}
                            className="checkseat"
                            checked={ticket.includes(se?.id) ? true : null}
                            value={JSON.stringify(se)}
                            type="checkbox"
                          />
                          <span className="checkbackground underline">
                            {se?.row}
                            {se?.order}
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="column">
              {row?.map((r) => {
                return <div className="column-count">{r}</div>;
              })}
            </div>
          </div>
        </div>
        

        <div className="container">
          <div className="list-seat row">
            <div className="col-xl-6 d-flex">Ghế chưa chọn : <img src="http://pixner.net/boleto/demo/assets/images/movie/seat01.png"/></div>
            <div className="col-xl-6 d-flex">Ghế đã chọn : <img src="http://pixner.net/boleto/demo/assets/images/movie/seat01-booked.png"/></div>
            {/* <div>Ghế đang chọn : <img src=""/></div> */}

            
          </div>
        </div>
        <div className="seatplan-proceed">
          <div className="container">
            {/* <div className="seatplan-proceed-seat">
              Ghế đã chọn: {selectSeat.row}
            </div> */}
            <div className="seatplan-proceed-price">Tổng tiền: {money} $</div>
            <div className="seatplan-proceed-btn">
              <button type="submit" onClick={handlePayment}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Seatplan;
