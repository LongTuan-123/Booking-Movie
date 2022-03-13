import Layout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../../style/Home.scss";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import { MOVIE_DETAIL } from "../../config/path";
import Slider from "react-slick";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [banner, setBanner] = useState([]);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState();
  const history = useHistory();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToScroll: 1,
    centerPadding: "20px",
    slidesToShow: 3,
  };
  const switchDetail = (id) => {
    history.push(bindParam(MOVIE_DETAIL, { id }));
  };
  const handleSelect = (selectIndex, e) => {
    setIndex(selectIndex);
  };
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://621c7d29768a4e1020ab6d54.mockapi.io/movie")
        .then((res) => {
          setMovies(res.data);
        });
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://621c7d29768a4e1020ab6d54.mockapi.io/time")
        .then((res) => {
          setTime(res.data);
        });
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://621c7d29768a4e1020ab6d54.mockapi.io/banner")
        .then((res) => {
          setBanner(res.data);
        });
    };
    getData();
  }, []);

  const movieOption = [];

  return (
    <Layout>
      <div className="home">
        {/* <Carousel
          className="d-block"
          style={{ height: "800px", objectFit: "cover" }}
          activeIndex={index}
          onSelect={handleSelect}
          variant="dark"
        >
          {banner.map((slide, index) => {
            return (
              <Carousel.Item key={`slide_${index}`} interval={3000} style={{ height: "800px" }}>
                <img
                  style={{ height: "100%" }}
                  className=" d-block w-100"
                  src={slide.banner}
                />
              </Carousel.Item>
            );
          })}
        </Carousel> */}

        <div className="home-snapbook">
          <div className="container">
            <img src="https://cinestar.com.vn/catalog/view/theme/default/images/icon-ticket.png" />
            <div className="container-title">
              <h2>Đặt vé Online</h2>
            </div>
            <div className="wrap">
              Chọn phim
              <select className="home-snapbook-select">
                {movies?.map((m, index) => {
                  return <option key={`movie_${index}`} value={m?.id}>{m?.name}</option>;
                })}
              </select>
            </div>
            <div className="wrap">
              Chọn ngày
              <input
                className="home-snapbook-select"
                type="date"
                name="calender"
              />
            </div>
            <div className="wrap">
              Chọn giờ chiếu
              <select className="home-snapbook-select">
                {time?.map((t, index) => {
                  return <option key={`time_${index}`} value={t?.id}>{t?.time}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="home-grid">
          <div className="home-grid-content ">
            <div className="home-grid-content-title">Phim đang chiếu</div>

            <div className="container">
              <Slider {...settings}>
                {movies.map((m) => {
                  return (
                    <div className="home-grid-content-image" key={m.id}>
                      <img src={m?.img} />
                      <span>{m.name}</span>
                      <div className="home-grid-content-image-hover">
                        <div
                          onClick={() => switchDetail(m.id)}
                          className="home-grid-content-image-hover-detail"
                        >
                          Chi tiết
                        </div>
                        <div className="home-grid-content-image-hover-info">
                          <span>Thể loại:{m.category}</span>
                          <span>Thời lượng:{m.duration} phút</span>
                        </div>
                        <div className="home-grid-content-image-hover-booking">
                          Đặt vé
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
        <div className="home-grid">
          <div className="home-grid-content ">
            <div className="home-grid-content-title">Phim sắp chiếu</div>

            <div className="container">
              <Slider {...settings}>
                {movies.map((m) => {
                  return (
                    <div className="home-grid-content-image" key={m.id}>
                      <img src={m?.img} />
                      <span>{m.name}</span>
                      <div className="home-grid-content-image-hover">
                        <div
                          onClick={() => switchDetail(m.id)}
                          className="home-grid-content-image-hover-detail"
                        >
                          Chi tiết
                        </div>
                        <div className="home-grid-content-image-hover-info">
                          <span>Thể loại:{m.category}</span>
                          <span>Thời lượng:{m.duration} phút</span>
                        </div>
                        <div className="home-grid-content-image-hover-booking">
                          Đặt vé
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
