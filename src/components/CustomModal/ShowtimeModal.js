import moment from "moment";
import { useEffect, useState } from "react";
import "../../style/ShowtimeModal.scss";

const ShowtimeModal = (selectDate, handleSelectDate, showtime) => {
  const [date, setDate] = useState([]);
  const AMOUNT_DATE = 11;

  useEffect(() => {
    if (date.length < 8) {
      for (let i = 0; i < AMOUNT_DATE; i++) {
        setDate((prev) => [
          ...prev,
          moment().add(i, "days").format("YYYY-MM-DD"),
        ]);
      }
    }
  }, []);
  return (
    <div className="timeModal">
      <div className="flex">
        {date.map((items, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectDate(items)}
              className={`p-2 ${
                items === selectDate && "text-white bg-black"
              } cursor-pointer`}
            >
              {moment(items).format("DD-MM")}
            </div>
          );
        })}
      </div>
      <div className="mt-[10px]">Thời gian chiếu: </div>
      <div className="flex gap-[10px] mt-[10px]">
        {showtime?.map((items) => {
          return (
            <a className="p-2 border-2 border-black cursor-pointer">
              {items?.show_time}
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default ShowtimeModal;
