import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "axios";
import "../../style/Moviedetail.scss";
import React from "react";
import ReactPlayer from "react-player";
import Navigation from "../../Layout/Navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const Moviedetail = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [comment, setComment] = useState("");
  const { register, handleSubmit } = useForm();
  const [movieDetail, setmovieDetail] = useState();
  const { id } = useParams();
  const onSubmit = async (value)=>{
    console.log(value)

  }
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://621c7d29768a4e1020ab6d54.mockapi.io/movie/${id}`)
        .then((res) => {
          setmovieDetail(res.data);
        });
      await axios
        .get("https://621c7d29768a4e1020ab6d54.mockapi.io/time")
        .then((res) => {
          setTime(res.data);
        });
    };
    getData();
  }, []);
  return (
    <Layout>
      <Navigation />
      <div className="movieDetail">
        <div className="movieDetail-name">{movieDetail?.name}</div>
        <div className="movieDetail-content">
          <div className="movieDetail-content-info">
            <div className="movieDetail-content-info-img">
              <img src={movieDetail?.img} />
            </div>
            <div className="movieDetail-content-info-right">
              <div className="movieDetail-content-info-right-warn">
                <div className="movieDetail-content-info-right-warn-kind">
                  {movieDetail?.kind}
                </div>
                <div className="movieDetail-content-info-right-warn-age">
                  {movieDetail?.age}+
                </div>
              </div>
              <div className="movieDetail-content-info-right-duration">
                <span>Thời lượng : {movieDetail?.duration} phút</span>
              </div>
              <div className="movieDetail-content-info-right-actor">
                <span>
                  Diễn viên : <br />
                </span>
                {movieDetail?.actor}
              </div>
              <div className="movieDetail-content-info-right-category">
                <span>Thể loại : {movieDetail?.category}</span>
              </div>
              <div className="movieDetail-content-info-right-origin">
                <span>Xuất sứ :</span>
              </div>
              <div className="movieDetail-content-info-right-time">
                <span>Khởi chiếu :</span>
              </div>
            </div>
            <div className="movieDetail-content-info-left">
              <ReactPlayer url={movieDetail?.trailer} />
            </div>
          </div>
          <div className="movieDetail-content-ver2">
            <div className="movieDetail-content-ver2-button"></div>
            <div className="movieDetail-content-ver2-description">
              <span>Mô tả :</span> {movieDetail?.description}
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
              {time?.map((t) => {
                return (
                  <span
                    key={t?.id}
                    className="movieDetail-content-time-listtime"
                  >
                    {t?.time}
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
          <form className="movieDetail-comment-form" onSubmit={handleSubmit(onSubmit)}>
            <span className="movieDetail-comment-form-label">
              Bình luận
            </span>
            <input
              type="text"
              className="movieDetail-comment-form-input"
              placeholder="Nhập bình luận"
              {...register("comment")}
            />
            <div className="movieDetail-comment-form-btn">
            <button type="submit" >
            Gửi
          </button>

            </div>
                     
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Moviedetail;
