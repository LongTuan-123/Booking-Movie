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
import {
  API_EVALUATION,
  API_EVALUATION_STORE,
  API_MOVIES_DETAIL,
  API_SHOWTIME,
} from "../../config/endpointapi";
import { bindParam } from "../../config/function";
import { SEAT_PLAN } from "../../config/path";
import ReactStars from "react-stars";
import moment from "moment";
import { getToken } from "../../Http";

const Moviedetail = () => {
  const { id } = useParams();
  const [stars, setStars] = useState(0);
  const [date, setDate] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const [comment, setComment] = useState([]);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [query, setQuery] = useState(false);
  const user = JSON.parse(localStorage.getItem("data_user"));
  const [limit, setLimit] = useState(1000);
  const [keyword] = useState(id);
  const [page] = useState(1);
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (value) => {
    if (stars === 0) {
      toast.warn("Hãy đánh giá sao của bạn");
    } else {
      value.created_at = moment().format("YYYY-MM-DD");
      value.updated_at = moment().format("YYYY-MM-DD");
      value.stars = stars;
      value.user_id = user?.id;
      value.movie_id = id;

      await axios
        .post(API_EVALUATION_STORE, value)
        .then((res) => {
          setQuery(!query);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const ratingChanged = (newRating) => {
    setStars(newRating);
  };

  useEffect(() => {
    const getData = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      const params = { limit, page, keyword };
      await axios
        .get(API_EVALUATION, { params })
        .then((res) => {
          setComment(res?.data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, [query]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(bindParam(API_MOVIES_DETAIL, { id }))
        .then((res) => {
          setData(res?.data?.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  console.log(comment, user);
  useEffect(() => {
    if (comment) {
      comment?.map((com) => {
        if (com?.user?.id == user?.id) {
          setStatus(true);
        }
      });
    }
  }, [comment]);

  const handleSwitchTicket = (showtime) => {
    const { room, id } = showtime;
    history.push(bindParam(SEAT_PLAN, { id: room.id }));
    localStorage.setItem("@showtime", id);
  };

  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
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
                  Diễn viên : {data.actor}
                  <br />
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
              <ReactPlayer
                controls={true}
                muted={true}
                width={"100%"}
                url={data?.trailer}
              />
            </div>
          </div>
          <div className="movieDetail-content-ver2">
            <div className="movieDetail-content-ver2-button"></div>
            <div className="movieDetail-content-ver2-description">
              <span>Mô tả :</span> {data?.description}
            </div>
          </div>
        </div>
        <div className="movieDetail__comment">
          <div className="movieDetail__comment-title">
            Nhận xét của người xem
          </div>
          {comment?.map((com) => {
            return (
              <div className="movieDetail__comment-content">
                <h3>
                  {com?.user?.first_name} {com?.user?.last_name}
                </h3>
                <ReactStars
                  count={5}
                  value={com?.stars}
                  size={20}
                  color2={"#ffd700"}
                />
                <p>{com?.comment}</p>
              </div>
            );
          })}
        </div>
        <div className="movieDetail-comment">
          <form
            className="movieDetail-comment-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="movieDetail-comment-form-label">
              Bình luận
              {status !== true && (
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  color2={"#ffd700"}
                />
              )}
            </span>
            <input
              type="text"
              className="movieDetail-comment-form-input"
              placeholder={ status !== true ? "Nhập bình luận": "Bạn đã bình luận rồi"}
              disabled={!!status}
              {...register("comment")}
            />
            <div className="movieDetail-comment-form-btn">
              <button type="submit" disabled={!!status}>Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Moviedetail;
