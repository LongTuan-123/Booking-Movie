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
  API_SHOWTIME_TIME,
} from "../../config/endpointapi";
import moment from "moment";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const [limit] = useState(1000);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [showtimeId, setShowtimeId] = useState("");
  const [movieSelectTime, setMovieSelectTime] = useState([]);
  const [banner, setBanner] = useState([]);
  const [movieSelect, setMovieSelect] = useState([]);
  const [listMovies, setListMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page] = useState(1);
  const history = useHistory();
  const [selectDate, setSelectDate] = useState(moment().format("YYYY-MM-DD"));
  console.log("Data: ", movieSelectTime, showtimeId);
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const switchDetail = (id) => {
    history.push(bindParam(MOVIE_DETAIL, { id }));
  };

  const handleSelectDate = (value) => {
    setSelectDate(value);
  };

  useEffect(() => {
    const getBanner = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_BANNER, { params })
        .then((res) => {
          setBanner(res?.data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanner();
  }, [limit, page, keyword]);

  useEffect(() => {
    const getListMovies = async () => {
      const params = { limit, page, keyword: "" };
      await axios
        .get(API_MOVIES, { params })
        .then((res) => {
          setListMovies(res?.data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getListMovies();
  }, [limit, page]);

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

  const handleSeatBooking = () => {
    history.push(bindParam(SEAT_PLAN, { id: showtimeId }));
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

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

  const handleShowtimeId = (e) => {
    setShowtimeId(e.target.value);
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Layout>
      <div className="home">
        <Carousel fade>
          {banner.map((slide, id) => {
            return (
              <Carousel.Item key={`slide_${id}`} interval={3000}>
                <img
                  style={{ height: "100%" }}
                  alt="something"
                  className=" d-block w-100 h-75"
                  src={slide.image}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="home-snapbook">
          <div className="container row">
            <div className="booking_label ">
              <img
                src="https://cinestar.com.vn/catalog/view/theme/default/images/icon-ticket.png"
                alt="something"
              />
              <div className="container-title">
                <h2>Đặt vé Online</h2>
              </div>
            </div>
            <div className="select_date col-sm-12 col-lg-4">
              <span className="container_input__title">Chọn ngày </span>
              <input
                min={moment().format("YYYY-MM-DD")}
                onChange={handleDate}
                type={"date"}
                defaultValue={moment().format("YYYY-MM-DD")}
              />
            </div>
            <div className="select_movie col-sm-12 col-lg-4">
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

            <div className="select_time col-sm-12 col-lg-4">
              <span className="container_input__title">Chọn giờ </span>
              <select
                defaultValue={"- Vui lòng chọn giờ chiếu -"}
                onChange={handleShowtimeId}
              >
                <option style={{ display: "none" }}>
                  -Vui lòng chọn giờ chiếu-
                </option>
                <option value={""}>Toàn bộ thời gian</option>
                {movieSelectTime &&
                  movieSelectTime?.map((data) => {
                    return <option value={data?.id}>{data.show_time}</option>;
                  })}
              </select>
            </div>
            {showtimeId && <button onClick={handleSeatBooking}>Đặt vé</button>}
          </div>
        </div>
        <div className="home-grid">
          <div className="home-grid-content ">
            <div className="home-grid-content-title">Danh sách phim</div>
            <div className="container">
              <Slider {...settings}>
                {listMovies.map((list) => {
                  return (
                    <div className="home-grid-content-image" key={list.id}>
                      <img src={list?.poster} alt={list?.name} />
                      <span>{list?.show_time}</span>
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
