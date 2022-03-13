import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Contact.scss";
import Navigation from "../../Layout/Navigation";
import React from "react";
import GoogleMapReact from 'google-map-react';

const Contact = () => {
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
      };
  const { register, handleSubmit } = useForm();

  const onSubmit = (value) => {
    console.log(value);
  };
  const axios = require("axios").default;
  const [users, setUsers] = useState();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        params: {
          id: 1,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <Layout>
        <Navigation/>
      <div className="contact">
        <div className="contact-container">
          <div className="contact-container-left">
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="contact-maintitle">Thông tin liên hệ </h1>
              <div className="contact-label">
                <div className="contact-label-title">
                  Họ và tên <span>*</span>
                </div>
                <div className="contact-form-border">
                  <input
                    className="contact-form__input"
                    placeholder="Nhập tên của bạn"
                    {...register("name")}
                  />
                </div>
              </div>
              <div className="contact-label">
                <div className="contact-label-title">
                 Số điện thoại <span>*</span>
                </div>
                <div className="contact-form-border">
                  <input
                    className="contact-form__input"
                    placeholder="Nhập số điện thoại"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div className="contact-label">
                <div className="contact-label-title">
                  Địa chỉ <span>*</span>
                </div>
                <div className="contact-form-border">
                  <input
                    className="contact-form__input"
                    placeholder="Nhập địa chỉ"
                    {...register("address")}
                  />
                </div>
              </div>
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
                  <input
                    className="contact-form__input"
                    placeholder="Nhập nội dung"
                    {...register("content")}
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
