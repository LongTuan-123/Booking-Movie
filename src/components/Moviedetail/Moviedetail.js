import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "axios";
import "../../style/Moviedetail.scss";
import React from "react";
import ReactPlayer from "react-player";
import Navigation from "../../Layout/Navigation";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { API_MOVIES_DETAIL, API_SHOWTIME } from "../../config/endpointapi";
import { bindParam } from "../../config/function";
import { SEAT_PLAN } from "../../config/path";
import ReactStars from "react-stars";


const Moviedetail = () => {
  const [date, setDate] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const [comment, setComment] = useState("");
  const [data, setData] = useState({});
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const onSubmit = async (value) => {
    console.log(value);
  };
  const ratingChanged = (newRating) => {
    alert(`Bạn đã đánh ${newRating} giá sao`)
  }
    const onNofication=(newRating)=>{
      toast.success(`Bạn đã đánh ${newRating} giá`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }
  useEffect(() => {
    const getShowtime = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_SHOWTIME, { params })
        .then((res) => {
          setMovies(res?.data?.data?.data);
          setTotal(res?.data?.data?.total);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getShowtime();
  }, [limit, page, keyword]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(bindParam(API_MOVIES_DETAIL, { id }))
        .then((res) => {
          setData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  const handleSwitchTicket = (showtime) => {
    const { room, id } = showtime;
    history.push(bindParam(SEAT_PLAN, { id: room.id }));
    localStorage.setItem("@showtime", id);
  };
  return (
    <Layout>
      <Navigation />
      <div className="movieDetail">
        <div className="movieDetail-name">{data?.name}</div>
        <div className="movieDetail-content">
          <div className="movieDetail-content-info row d-flex">
            <div className="movieDetail-content-info-img col-sm-6 col-xl-2 mt-4">
              <img src={data?.poster} />
            </div>
            <div className="movieDetail-content-info-right col-sm-6 col-xl-2 mt-4">
              <div className="movieDetail-content-info-right-warn">
                <div className="movieDetail-content-info-right-warn-kind">
                  {data?.dimension}
                </div>
                <div className="movieDetail-content-info-right-warn-age">
                  {data?.range_age}+
                </div>
              </div>
              <div className="movieDetail-content-info-right-duration">
                <span>Thời lượng : {data?.range_of_movie} phút</span>
              </div>
              <div className="movieDetail-content-info-right-actor">
                <span>
                  Diễn viên : {data.actor}<br />
                </span>
                {data?.actor}
              </div>
              <div className="movieDetail-content-info-right-category">
                <span>Thể loại : {data?.type_of_movie}</span>
              </div>
    
              <div className="movieDetail-content-info-right-time">
                <span>Khởi chiếu : {data.start_date}</span>
              </div>
            </div>
            <div className="movieDetail-content-info-left col-sm-12 col-xl-6 mt-4 ">
              <ReactPlayer width={"100%"} url={data?.trailer} />
            </div>
          </div>
          <div className="movieDetail-content-ver2">
            <div className="movieDetail-content-ver2-button"></div>
            <div className="movieDetail-content-ver2-description">
              <span>Mô tả :</span> {data?.description}
            </div>
          </div>
          <div className="movieDetail-content-time">
            <div className="movieDetail-content-time-label">
              Chọn ngày chiếu :
            </div>
            <div className="movieDetail-content-time-label">Giờ chiếu :</div>
            <div className="movieDetail-content-time-label"></div>
            <div className="calender">
              <input type="date" name="time" />
            </div>

            <div className="list">
              {movies?.map((time) => {
                return (
                  <span
                    key={time?.id}
                    className="movieDetail-content-time-listtime"
                  >
                    {time?.showtime}
                  </span>
                );
              })}
            </div>
            <div className="booking">
              <button className="movieDetail-content-ver2-button-btn">
                Đặt vé
              </button>
            </div>
          </div>
        </div>
        <div className="movieDetail-background"></div>
        <div className="movieDetail-comment">
          <form
            className="movieDetail-comment-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="movieDetail-comment-form-label">
              Bình luận
              <ReactStars
                count={5}
                onChange={ratingChanged}
                onClick={onNofication}
                size={24}
                color2={"#ffd700"}
              />
            </span>
            <input
              type="text"
              className="movieDetail-comment-form-input"
              placeholder="Nhập bình luận"
              {...register("comment")}
            />
            <div className="movieDetail-comment-form-btn">
              <button type="submit">Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Moviedetail;
