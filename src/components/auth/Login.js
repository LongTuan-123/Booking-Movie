import "./Login.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { HOME, SIGNUP } from "../../config/path";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_LOGIN } from "../../config/endpointapi";
import Home from "../Home/Home";

const Login = () => {
  const [users, setUsers] = useState();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (value) => {
    if (value.email == "") {
      toast.error("Bạn chưa nhập tài khoản!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    } else if (value.password == "") {
      toast.error("Bạn chưa nhập mật khẩu", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    } else if (value.email == "" && value.password == "") {
      toast.error("Bạn chưa điền thông tin", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    } else {
      axios
        .post(API_LOGIN, value)
        .then(function (res) {
          if (res.status === 200) {
            localStorage.setItem("data", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.access_token);
            history.push(HOME);
            toast.success("Đăng nhập thành công", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
            });
          } else {
            console.log(res);
          }
        })
        .catch(function (error) {
          toast.error("Vui lòng nhập lại", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="login-title">Đăng nhập tài khoản </h1>
          <div className="login-label">
            <div className="login-label-name">
              Email <span>*</span>
            </div>
            <div className="login-form-border">
              <input
                className="login-form__input"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
          </div>
          <div className="login-label">
            <div className="login-label-name">
              Password <span>*</span>
            </div>
            <div className="login-form-border">
              <input
                type="password"
                className="login-form__input"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>
          </div>
          <button type="submit" className="login-btn">
            Log in
          </button>
          <div className="login-question">Don't have an account?</div>
          <Link className="login-signup" to={SIGNUP}>
            Đăng kí ngay
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
