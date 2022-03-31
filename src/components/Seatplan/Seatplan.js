import axios from "axios";
import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import "../../style/Seatplan.scss";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { bindParam } from "../../config/function";
import { API_SEAT_IN_ROOM } from "../../config/endpointapi";
import { useParams } from "react-router-dom";

const Seatplan = () => {
  const { id } = useParams()
  const col = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
  const [token] = useState(localStorage.getItem("token_user"));
  const row = [];
  const [seat, setSeat] = useState()
  
  for (var i = 1; i <= 6; i++) {
    row.push(i);
  }

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const getSeat = async () => {
      await axios.get(bindParam(API_SEAT_IN_ROOM, { id }))
        .then((res) => {
          console.log(res)
        })
    }

    getSeat()
  }, [])

  const renderer = ({ minutes, seconds, completed }) => {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
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
            <img src="http://pixner.net/boleto/demo/assets/images/movie/screen-thumb.png" />
            <div className="seatwrap">
              <div className="seatplan-content-screen-col">
                {col.map((c) => {
                  return <div className="col">{c}</div>;
                })}
              </div>

              <div className="seatplan-content-screen-seat">
                {row.map((r) => {
                  return (
                    <div className="seatplan-content-screen-seat-singgle">
                      {col.map((c) => {
                        return (
                          <div>
                            <input className="checkseat" type="checkbox" />
                            <span className="checkbackground underline">
                              {c}
                              {r}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="column">
              {row.map((r) => {
                return <div className="column-count">{r}</div>;
              })}
            </div>
          </div>
        </div>
        <div className="seatplan-proceed">
          <div className="container">
            <div className="seatplan-proceed-seat">Ghế đã chọn</div>
            <div className="seatplan-proceed-price">Tổng tiền</div>
            <div className="seatplan-proceed-btn">
              <button type="submit">Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Seatplan;
