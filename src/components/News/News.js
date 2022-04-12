import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import { useEffect, useState } from "react";
import "../../style/News.scss";
import axios from "axios";
import { BsArrowRightCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import { NEWS_DETAIL } from "../../config/path";
import { API_NEWS } from "../../config/endpointapi";
const News = () => {
  const [post, setPost] = useState();
  const [keyword, setKeyword] = useState("");
  const [limit] = useState(1000);
  const [page] = useState(1);


  const history = useHistory();
const switchDetail =(id) =>{

    history.push(bindParam(NEWS_DETAIL,{id}));
};
useEffect(() => {
  const getNews = async () => {
    const params = { limit, page, keyword };
    await axios
      .get(API_NEWS, { params })
      .then((res) => {
        setPost(res?.data?.data?.data);
      console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getNews();
}, [limit, page, keyword]);
  return (
    <Layout>
      <Navigation />
      <div className="news">
        <div className="news-content">
          {post?.map((p) => {
            return (
              <div className="news-content-item">
                <img  src={p?.image}></img>
                <div className="news-content-item-info">
                  <div onClick={()=> switchDetail(p.id)} className="news-content-item-info-title">{p?.name}</div>
                  <div className="news-content-item-info-react">
                  </div>
                  <div className="news-content-item-info-description">
                    {p?.description}
                  </div>
                  <div
                  onClick={()=> switchDetail(p.id)} 
                  className="news-content-item-info-entry">
                    Đọc thêm
                    <BsArrowRightCircle/>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default News;
