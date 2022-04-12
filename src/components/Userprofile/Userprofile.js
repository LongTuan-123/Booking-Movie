import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Userprofile.scss";
import Layout from "../../Layout/Layout";
import Navigation from "../../Layout/Navigation";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_LOGOUT } from "../../config/endpointapi";
import { useHistory } from "react-router-dom";
import { HOME } from "../../config/path";



const Userprofile = () => {
  const user = JSON.parse(localStorage.getItem("data"));
  const [token] = useState(localStorage.getItem("token"));
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  console.log(user);
  const onLogout = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    console.log(token);
    axios
      .post(API_LOGOUT)
      .then(function (res) {
        toast.success("Đăng xuất thành công", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        localStorage.removeItem("data");
        localStorage.removeItem("token");
        history.push(HOME);
      })
      .catch(function (error) {
        toast.error("Đăng xuất không thành công", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      });
  };
  return (
    <Layout>
      <Navigation />
      <div className="userprofile ">
        <div className="userprofile-header">
          <div className="container row m-auto">
            <div className="d-flex col-xl-8 col-sm-12 m-auto">
            <div className="userprofile-header-icon ">
              <img src="https://dmitryvolkov.me/demo/flixgo2.0/main/img/user.svg" />
            </div>
            <div className="userprofile-header-name ">
              {`Wellcome ${user.last_name} ${user.first_name}`}
            
            </div>
            </div>
            <div className="userprofile-header-btn col-xl-2 col-sm-12 text-center">
              <button  className="m-auto" onClick={onLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
        <div className="userprofile-detail">
          <div className="container row m-auto">
            <div className="userprofile-detail-info mt-4 col-xl-5 col-sm-12">
              <div className="userprofile-detail-info-label">Hồ sơ</div>
              <ul className="userprofile-detail-info-list">
                <li>
                  Họ : <span>{user.last_name}</span>
                </li>
                <li>
                  Tên : <span>{user.first_name}</span>
                </li>
                <li>
                  Tuổi : <span>{user.age}</span>{" "}
                </li>
                <li>
                  Địa chỉ : <span>{user.address}</span>{" "}
                </li>
                <li>
                  Số điện thoại : <span>{user.phonenumber}</span>{" "}
                </li>
                <li>
                  CMND : <span>{user.person_id}</span>{" "}
                </li>
                <li>
                  Email : <span>{user.email}</span>
                </li>
              </ul>
            </div>
            <div className="userprofile-detail-security mt-4 col-xl-5 col-sm-12">
              <form className="modify">
                <div className="modify-label">Đổi mật khẩu</div>
                <div className="modify-label-name">
                  Mật khẩu cũ 
                </div>
                <div className="modify-form-border">
                  <input
                    className="modify-input"
                    placeholder="Nhập mật khẩu cũ"
                    {...register("oldpassword")}
                  />
                </div>
                <div className="modify-label-name">
                    Mật khẩu mới
                </div>
                <div className="modify-form-border">
                  <input
                    className="modify-input"
                    placeholder="Nhập mật khẩu mới"
                    {...register("newpassword")}
                  />
                </div>
                <div className="modify-label-name">
                  Xác nhận mật khẩu
                </div>
                <div className="modify-form-border">
                  <input
                    className="modify-input"
                    placeholder="Xác nhận"
                    {...register("confirm")}
                  />
                </div>
                <div className="text-center">

                <button className="modify-btn " type='submit'>
                    Xác nhận
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Userprofile;
