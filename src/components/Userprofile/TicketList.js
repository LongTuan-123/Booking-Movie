import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../../Layout/Navigation";

import { API_TICKET_USER_ID } from "../../config/endpointapi";
import { getToken } from "../../Http";
import Layout from "../../Layout/Layout";

import "../../style/Ticket.scss";

const TicketList = () => {
  const user = localStorage.getItem("data_user");
  const [listTicket, setListTicket] = useState([]);

  useEffect(() => {
    if (user) {
      const getTicketList = async () => {
        const params = { user_id: JSON.parse(user).id };
        axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
        await axios
          .get(API_TICKET_USER_ID, { params })
          .then((res) => {
            setListTicket(res?.data?.data);
          })
          .catch((err) => {});
      };

      getTicketList();
    }
  }, [user]);
console.log(user.first_name);
  return (
    <Layout>
      <Navigation>
        Lịch sử giao dịch
      </Navigation>
      <div className="layout">

      <div className="layout-ticket">
        {listTicket.map((li) => (
          <div className="ticket">
            <img src="https://thumbs.dreamstime.com/b/cinema-ticket-icon-retro-template-isolated-white-background-set-tickets-to-theater-concert-other-event-vector-173751967.jpg" />
            <div className="ticket-content">
              <div>ID vé: {li?.id}</div>
              <div>
                Họ và tên: {li?.user?.first_name} {li?.user?.last_name}
              </div>
              <div>Phim: {li?.showtime?.movie_id}</div>
              <div>
                Chỗ ngồi: {li?.seat?.row}
                {li?.seat?.order}
              </div>
           
              <div>Ngày chiếu: {li?.showtime?.show_date}</div>
              <div>Giờ chiếu: {li?.showtime?.show_time}</div>
              <div>Tiền: {li?.money} $</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default TicketList;
