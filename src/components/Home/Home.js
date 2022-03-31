import Layout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../../style/Home.scss";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import { MOVIE_DETAIL, SEAT_PLAN } from "../../config/path";
import Slider from "react-slick";
import { API_SHOWTIME } from "../../config/endpointapi";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
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

  const handleSwitchTicket = (id) => {
    history.push(bindParam(SEAT_PLAN, {id}))
  }
  
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
              <input />
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
                      <img src={m?.movie?.poster} alt={m?.movie?.name}/>
                      <span>{m?.movie?.name}</span>
                      <div className="home-grid-content-image-hover">
                        <div
                          onClick={() => switchDetail(m?.movie?.id)}
                          className="home-grid-content-image-hover-detail"
                        >
                          Chi tiết
                        </div>
                        <div className="home-grid-content-image-hover-info">
                          <span>Thể loại: {m?.movie?.type_of_movie}</span>
                          <span>Thời lượng: {m?.movie?.range_of_movie} phút</span>
                        </div>
                        <div className="home-grid-content-image-hover-booking" onClick={() => handleSwitchTicket(m?.movie?.id)}>
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
                          <span>Thể loại: {m.category}</span>
                          <span>Thời lượng: {m.duration} phút</span>
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
