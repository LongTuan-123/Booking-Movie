import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import { useEffect, useState } from "react";
import "../../style/News.scss";
import axios from "axios";
import { BsArrowRightCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { bindParam } from "../../config/function";
import { NEWS_DETAIL } from "../../config/path";
const News = () => {
  const [post, setPost] = useState();

  const history = useHistory();
const switchDetail =(id) =>{

    history.push(bindParam(NEWS_DETAIL,{id}));
};
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://621c7d29768a4e1020ab6d54.mockapi.io/news")
        .then((res) => {
          setPost(res.data);       
        });
        
        
    };
    getData();
  }, []);
  return (
    <Layout>
      <Navigation />
      <div className="news">
        <div className="news-content">
          {post?.map((p) => {
            return (
              <div className="news-content-item">
                <img  src={p?.img}></img>
                <div className="news-content-item-info">
                  <div onClick={()=> switchDetail(p.id)} className="news-content-item-info-title">{p?.title}</div>
                  <div className="news-content-item-info-react">
                  </div>
                  <div className="news-content-item-info-description">
                    {p?.des}
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
