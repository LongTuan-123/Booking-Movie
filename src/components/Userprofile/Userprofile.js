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
  const user = JSON.parse(localStorage.getItem("data_user"));
  const [token] = useState(localStorage.getItem("token_user"));
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onLogout = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
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
        localStorage.removeItem("data_user");
        localStorage.removeItem("data_user");
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
          <div className="container">
            <div className="userprofile-header-icon">
              <img src="https://dmitryvolkov.me/demo/flixgo2.0/main/img/user.svg" />
            </div>
            <div className="userprofile-header-name">
              {`Wellcome ${user?.ten} ${user?.ho}`}
              
            </div>
            <div className="userprofile-header-id"></div>
            <div className="userprofile-header-btn">
              <button  className="text-blue-600" onClick={onLogout} type="">
                Log out
              </button>
            </div>
          </div>
        </div>
        <div className="userprofile-detail">
          <div className="container">
            <div className="userprofile-detail-info">
              <div className="userprofile-detail-info-label">Hồ sơ</div>
              <ul className="userprofile-detail-info-list">
                <li>
                  Họ : <span>{user?.ho}</span>
                </li>
                <li>
                  Tên : <span>{user?.ten}</span>
                </li>
                <li>
                  Tuổi : <span>{user?.tuoi}</span>{" "}
                </li>
                <li>
                  Địa chỉ : <span>{user.dia_chi}</span>{" "}
                </li>
                <li>
                  Số điện thoại : <span>{user.so_DT}</span>{" "}
                </li>
                <li>
                  CMND : <span>{user.CMND}</span>{" "}
                </li>
                <li>
                  Email : <span>{user.email}</span>
                </li>
              </ul>
            </div>
            <div className="userprofile-detail-security">
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
                <button className="modify-btn " type='submit'>
                    Xác nhận
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Userprofile;
