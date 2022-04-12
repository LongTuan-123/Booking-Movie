import Navigation from "../../Layout/Navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import Slider from "react-slick";
const Newsdetail = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  // const [keyword, setKeyword] = useState("");
  // const [limit] = useState(1000);
  // const [page] = useState(1);

  // useEffect(() => {
  //   const getNews = async () => {
  //     const params = { limit, page, keyword };
  //     await axios
  //       .get(API_NEWS, { params })
  //       .then((res) => {
  //         setPost(res?.data?.data?.data);
  //       console.log(post);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getNews();
  // }, [limit, page, keyword]);
  // const { id } = useParams();
  return (
    <Layout >
      
      <Navigation />
      
    </Layout>
  );
};
export default Newsdetail;
