/* eslint-disable array-callback-return */
import Layout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../../style/Home.scss";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import { MOVIE_DETAIL, SEAT_PLAN } from "../../config/path";
import Slider from "react-slick";
import {
  API_BANNER,
  API_MOVIES,
  API_SHOWTIME,
  API_SHOWTIME_TIME,
} from "../../config/endpointapi";
import moment from "moment";
import { Carousel, Col, Container, Row } from "react-bootstrap";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [limit] = useState(1000);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState("");
  const [timeBaseOnDate, setTimeBaseOnDate] = useState([]);
  const [movieSelectTime, setMovieSelectTime] = useState([]);
  const [banner, setBanner] = useState([]);
  const [movieSelect, setMovieSelect] = useState([]);
  const [listMovies, setListMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page] = useState(1);
  const history = useHistory();

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToScroll: 1,
    centerPadding: "20px",
    slidesToShow: movies?.length > 1 ? (movies?.length > 2 ? 3 : 2) : 1,
  };
  const settingListMovies = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToScroll: 1,
    centerPadding: "20px",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settingListMovies: {
          className: "center",
          centerMode: true,
          infinite: true,
          slidesToScroll: 1,
          centerPadding: "20px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settingListMovies: {
          className: "center",
          centerMode: true,
          infinite: true,
          slidesToScroll: 1,
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const switchDetail = (id) => {
    history.push(bindParam(MOVIE_DETAIL, { id }));
  };

  useEffect(() => {
    const getBanner = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_BANNER, { params })
        .then((res) => {
          setBanner(res?.data?.data?.data);
          console.log(banner);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanner();
  }, [limit, page, keyword]);
  useEffect(() => {
    const getListMovies = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_MOVIES, { params })
        .then((res) => {
          setListMovies(res?.data?.data?.data);
          console.log(listMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getListMovies();
  }, [limit, page, keyword]);

  useEffect(() => {
    const getShowtime = async () => {
      const params = { limit, page, keyword, date, time };
      await axios
        .get(API_SHOWTIME, { params })
        .then((res) => {
          setMovies(res?.data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getShowtime();
  }, [limit, page, keyword, time, date]);

  useEffect(() => {
    const getShowtime = async () => {
      const params = { date };
      await axios
        .get(API_SHOWTIME_TIME, { params })
        .then((res) => {
          setMovieSelectTime(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getShowtime();
  }, [date]);

  useEffect(() => {
    if (movieSelectTime) {
      let movieSelectClone = [];
      movieSelectTime?.map((movies) => {
        if (!movieSelectClone?.includes(movies?.show_time)) {
          movieSelectClone.push(movies?.show_time);
          // console.log(movies?.show_time);
          setTimeBaseOnDate(movieSelectClone);
        }
      });
    }
  }, [movieSelectTime]);

  useEffect(() => {
    if (movieSelectTime) {
      let movieSelectClone = [];
      movieSelectTime?.map((movies) => {
        console.log(movies?.movie?.name);
        if (!movieSelectClone?.includes(movies?.movie?.name)) {
          movieSelectClone.push(movies?.movie?.name);
          setMovieSelect(movieSelectClone);
        }
      });
    }
  }, [movieSelectTime]);

  const handleSwitchTicket = (showtime) => {
    const { room, id } = showtime;
    history.push(bindParam(SEAT_PLAN, { id: room.id }));
    localStorage.setItem("@showtime", id);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    setTimeBaseOnDate([]);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
    // console.log(time);
  };

  const handleKeyword = (e) => {
    // console.log(e.target.value)
    setKeyword(e.target.value);
  };

  console.log(movieSelect);
  return (
    <Layout>
      <div className="home">
        <Carousel fade>
          {banner.map((slide, id) => {
            return (
              <Carousel.Item key={`slide_${id}`} interval={3000}>
                <img
                  style={{ height: "100%" }}
                  className=" d-block w-100 h-75"
                  src={slide.image}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="home-snapbook">
          <div className="container row">
            <div className="booking_label col-sm-12 col-lg-3">
              <img src="https://cinestar.com.vn/catalog/view/theme/default/images/icon-ticket.png" />
              <div className="container-title">
                <h2>Đặt vé Online</h2>
              </div>
            </div>
            <div className="select_movie col-sm-12 col-lg-3">
              <span className="container_input__title">Chọn phim</span>
              <select
                defaultValue={"- Vui lòng chọn bộ phim -"}
                onChange={handleKeyword}
              >
                <option style={{ display: "none" }}>
                  -Vui lòng chọn bộ phim-
                </option>
                <option value={""}>Toàn bộ bộ phim</option>
                {movieSelect?.map((movie) => {
                  return <option value={movie}>{movie}</option>;
                })}
              </select>
            </div>
            <div className="select_date col-sm-12 col-lg-3">
              <span className="container_input__title">Chọn ngày</span>
              <input
                min={moment().format("YYYY-MM-DD")}
                onChange={handleDate}
                type={"date"}
                defaultValue={moment().format("YYYY-MM-DD")}
              />
            </div>
            <div className="select_time col-sm-12 col-lg-3">
              <span className="container_input__title">Chọn thời gian</span>
              <select
                defaultValue={"- Vui lòng chọn giờ chiếu -"}
                onChange={handleTime}
              >
                <option style={{ display: "none" }}>
                  -Vui lòng chọn giờ chiếu-
                </option>
                <option value={""}>Toàn bộ thời gian</option>
                {timeBaseOnDate?.map((time) => {
                  return <option value={time}>{time}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="home-grid">
          <div className="home-grid-content ">
            <div className="home-grid-content-title">
              Danh sách suất chiếu chiếu
            </div>
            <div className="container">
              {movies.length === 0 && (
                <div className="container__no-movies">
                  Không có bộ phim trong {date}
                </div>
              )}
              <Slider {...settings}>
                {movies.map((m) => {
                  return (
                    <div className="home-grid-content-image" key={m.id}>
                      <img
                        style={{ width: 360 }}
                        src={m?.movie?.poster}
                        alt={m?.movie?.name}
                      />
                      <span>{m?.show_time}</span>
                      <span>{m?.movie?.name}</span>
                      <div className="home-grid-content-image-hover">
                        <div
                          className="home-grid-content-image-hover-booking"
                          onClick={() => handleSwitchTicket(m)}
                        >
                          Đặt vé
                        </div>
                        <div className="home-grid-content-image-hover-info">
                          <span>Thể loại: {m?.movie?.type_of_movie}</span>
                          <span>
                            Thời lượng: {m?.movie?.range_of_movie} phút
                          </span>
                        </div>
                      </div>
                      <div className="home-grid-content-image-background"></div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="home-grid-content ">
            <div className="home-grid-content-title">Danh sách phim</div>
            <div className="container">
              <Slider {...settingListMovies}>
                {listMovies.map((list) => {
                  return (
                    <div className="home-grid-content-image" key={list.id}>
                      <img
                        style={{ width: 360 }}
                        src={list?.poster}
                        alt={list?.name}
                      />
                      <span>{list?.show_time}</span>
                      <span>{list?.name}</span>
                      <div className="home-grid-content-image-hover">
                        <div
                          onClick={() => switchDetail(list?.id)}
                          className="home-grid-content-image-hover-detail"
                        >
                          Chi tiết
                        </div>
                        <div className="home-grid-content-image-hover-info">
                          <span>Thể loại: {list?.type_of_movie}</span>
                          <span>Thời lượng: {list?.range_of_movie} phút</span>
                        </div>
                      </div>
                      <div className="home-grid-content-image-background"></div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
