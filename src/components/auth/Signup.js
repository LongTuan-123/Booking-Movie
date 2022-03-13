import "./Signup.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_REGISTER } from "../../config/endpointapi";

const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [confirm, setConfirm] = useState();
  const onChangeConfirm = (val) => {
    setConfirm(val.target.value);
  };
  const onSubmit = (value) => {
    if (value.password === value.confirm) {
      axios
  
        .post(API_REGISTER, value)
        .then(function (res) {
          
          console.log(res);
          toast.success("Đăng kí thành công", {
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
    } else {
    }
  };
  return (
    <div className="signup">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="signup-title">Đăng kí tài khoản </h1>
          <div className="signup-col1">
            <div className="signup-col1-label">
              <div className="signup-col1-label-name">
                Họ <span>*</span>
              </div>
              <div className="signup-form-border">
                <input
                  className="signup-form__input"
                  placeholder="Enter your first name"
                  {...register("ho", { required: true })}
                />
              </div>
              {errors.firstname && <span>Nhập họ của bạn</span>}
            </div>
            <div className="signup-col1-label">
              <div className="signup-col1-label-name">
                Tên <span>*</span>
              </div>
              <div className="signup-form-border">
                <input
                  className="signup-form__input"
                  placeholder="Enter your last name"
                  {...register("ten", { required: true })}
                />
              </div>
              {errors.lastname && <span>Nhập tên của bạn</span>}
            </div>
          </div>
          <div className="signup-col2">
            <div className="signup-col2-label">
              <div className="signup-col2-label-name">
                Tuổi <span>*</span>
              </div>
              <div className="signup-form-border">
                <input
                  className="signup-form__input"
                  placeholder="Enter your age"
                  {...register("tuoi", { min: 6, max: 99 }, { required: true })}
                />
              </div>
              {errors.age && <span>Age is required</span>}
            </div>
            {/* <div className="signup-col2-label">
            <div className="signup-col2-label-name">
              Giới tính <span>*</span>
            </div>
            <select className="signup-form__select" {...register("gender")}>
              <option value="female">Nữ</option>
              <option value="male">Nam</option>
              <option value="other">Khác</option>
            </select>
            {errors.gender && <span>Lựa chọn giới tính</span>}
          </div> */}
          </div>
          <div className="signup-label">
            <div className="signup-label-name">
              Địa chỉ <span>*</span>
            </div>
            <div className="signup-form-border">
              <input
                className="signup-form__input"
                placeholder="Enter your address"
                {...register("dia_chi", { required: true })}
              />
            </div>
            {errors.address && <span>Nhập địa chỉ</span>}
          </div>
          <div className="signup-label">
            <div className="signup-label-name">
              Số điện thoại <span>*</span>
            </div>
            <div className="signup-form-border">
              <input
                className="signup-form__input"
                placeholder="Enter your phone number"
                {...register("so_DT", { required: true })}
              />
            </div>
            {errors.phonenumber && <span>Nhập số điện thoại</span>}
          </div>
          <div className="signup-label">
            <div className="signup-label-name">
              CMND <span>*</span>
            </div>
            <div className="signup-form-border">
              <input
                className="signup-form__input"
                placeholder="Enter your personal ID"
                {...register("CMND", { required: true })}
              />
            </div>
            {errors.CMND && <span>Nhập số CMND</span>}
          </div>

          <div className="signup-label">
            <div className="signup-label-name">
              Email <span>*</span>
            </div>
            <div className="signup-form-border">
              <input
                type="text"
                className="signup-form__input"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && <span>Nhập email</span>}
          </div>
          <div className="signup-label">
            <div className="signup-label-name">
              Password <span>*</span>
            </div>
            <div className="signup-form-border">
              <input
                type="password"
                className="signup-form__input"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && <span>Nhập password</span>}
          </div>
          <div className="signup-label">
            <div className="signup-label-name">
              Xác nhận Password <span>*</span>
            </div>
            <div className="signup-form-border">
              <input
                onChange={onChangeConfirm}
                type="password"
                className="signup-form__input"
                placeholder="Enter your password"
                {...register("confirm", { required: true })}
              />
            </div>
            {errors.confirm && <span>Xác nhận password</span>}
          </div>
          <div className="signup-button">
            <button type="submit" className="signup-button-btn">
              Sign up
            </button>
          </div>
          <div className="signup-question">Already have an account ?</div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Signup;