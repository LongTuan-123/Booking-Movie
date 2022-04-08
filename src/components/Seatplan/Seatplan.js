import axios from "axios";
import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import "../../style/Seatplan.scss";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { bindParam } from "../../config/function";
import { API_ORDER_SEAT, API_SEAT_IN_ROOM } from "../../config/endpointapi";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { PAYMENT } from "../../config/path";

const Seatplan = () => {
  const { id } = useParams();
  const col = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
  const [token] = useState(localStorage.getItem("token_user"));
  const row = [];
  const [selectSeat, setSelectSeat] = useState([]);
  const [moneyDetail, setMoneyDetail] = useState([]);
  const history = useHistory()
  const [money, setMoney] = useState(0);
  const [seat, setSeat] = useState();

  for (var i = 1; i <= 10; i++) {
    row.push(i);
  }

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const getSeat = async () => {
      await axios.get(bindParam(API_SEAT_IN_ROOM, { id })).then((res) => {
        setSeat(res?.data?.data);
      });
    };

    getSeat();
  }, []);

  const renderer = ({ minutes, seconds, completed }) => {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  const onSelectSeat = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectSeat((prev) => [...prev, JSON.parse(value)]);
      setMoneyDetail((prev) => [...prev, JSON.parse(value).money]);
      setMoney(money + JSON.parse(value).money);
    } else {
      const seatClone = [...selectSeat];
      const moneyClone = [...moneyDetail];

      const moneyFilter = moneyClone.filter(
        (money) => money !== JSON.parse(value).money
      );
      const seatFilter = seatClone.filter(
        (seat) => seat !== JSON.parse(value).money
      );

      setSelectSeat(seatFilter);
      setMoneyDetail(moneyFilter);
      setMoney(money - JSON.parse(value).money);
    }
  };

  const handlePayment = () => {
    console.log(selectSeat.map((seat) => seat.id));
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .post(API_ORDER_SEAT, {
        seats: selectSeat.map((seat) => seat.id).join(","),
        showtime_id: Number(localStorage.getItem("@showtime")),
        confirm: 0,
        money: moneyDetail.join(","),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
      .then((res) => {
        localStorage.setItem("@ticket", JSON.stringify(selectSeat))
        history.push(PAYMENT)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <Navigation />
      <div className="seatplan">
        <div className="seatplan-title">
          <div className="seatplan-title-label">Phòng chiếu</div>
          <div className="seatplan-title-label">Giờ chiếu</div>
          <div className="seatplan-title-label">Phim</div>
          <div className="seatplan-title-label">Số ghế</div>
          <div className="seatplan-title-label">
            Time left
            <br />
            <Countdown
              date={Date.now() + 300000}
              renderer={renderer}
            ></Countdown>
          </div>
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
                    return (
                      <div className="seatplan-content-screen-seat-single_check">
                        <input
                          onChange={onSelectSeat}
                          className="checkseat"
                          value={JSON.stringify(se)}
                          type="checkbox"
                        />
                        <span className="checkbackground underline">
                          {se?.row}
                          {se?.order}
                        </span>
                      </div>
                    );
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
        <div className="seatplan-proceed">
          <div className="container">
            <div className="seatplan-proceed-seat">Ghế đã chọn</div>
            <div className="seatplan-proceed-price">Tổng tiền: {money}</div>
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
