import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import "../../style/Seatplan.scss";
import Countdown from "react-countdown";
const Seatplan = () => {
  const col = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
  const row = [];
  for (var i = 1; i <= 12; i++) {
    row.push(i);
  }
  const renderer = ({ minutes, seconds, completed }) => {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };
  const onSubmit = async (value) => {
    console.log(value);
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
