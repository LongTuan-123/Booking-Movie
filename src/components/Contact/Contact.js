import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Contact.scss";
import Navigation from "../../Layout/Navigation";
import React from "react";
import { API_OPINION_CREATE } from "../../config/endpointapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  const { register, handleSubmit } = useForm();

  const [opinion, setOpinion] = useState({});
  const dataUser = JSON.parse(localStorage.getItem("data_user"))?.id;
  const user_id = { user_id: dataUser };
  const json = JSON.stringify(user_id);

  const onSubmit = (value) => {
    value.user_id = dataUser;
    console.log(value);
    axios
      .post(API_OPINION_CREATE, value)
      .then(function (res) {
        console.log(res);
        alert("Cảm ơn bạn đã gửi phản hồi");
        toast.success("Cảm ơn bạn đã gửi thông tin", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(dataUser);

  return (
    <Layout>
      <Navigation>Liên hệ</Navigation>
      <div className="contact">
        <div className="contact-container">
          <div className="contact-container-left">
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="contact-maintitle">Thông tin liên hệ </h1>

              <div className="contact-label">
                <div className="contact-label-title">
                  Tiêu đề <span>*</span>
                </div>
                <div className="contact-form-border">
                  <input
                    className="contact-form__input"
                    placeholder="Nhập tiêu đề"
                    {...register("title")}
                  />
                </div>
              </div>
              <div className="contact-label">
                <div className="contact-label-title">
                  Nội dung <span>*</span>
                </div>
                <div className="contact-form-border">
                  <textarea
                    rows={5}
                    showCount
                    maxLength={1000}
                    className="contact-form__input"
                    placeholder="Nhập nội dung"
                    {...register("detail")}
                  />
                </div>
              </div>
              <div className="contact-btn">
                <button type="submit" className="contact-btn-submit">
                  Gửi thông tin
                </button>
              </div>
            </form>
          </div>
          <div className="contact-container-right">
            <div className="contact-container-right-info">
              <div className="contact-container-right-info-phone">
                <img src="http://pixner.net/boleto/demo/assets/images/contact/contact01.png" />
                <div className="contact-container-right-info-phone-content">
                  Số điện thoại
                  <span>0973818134</span>
                </div>
              </div>
              <div className="contact-container-right-info-email">
                <img src="http://pixner.net/boleto/demo/assets/images/contact/contact02.png" />
                <div className="contact-container-right-info-email-content">
                  Địa chỉ email
                  <span>longtuan2k@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Contact;
