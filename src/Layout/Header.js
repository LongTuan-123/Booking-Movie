import "../style/Header.scss";
import Logo from "../asset/Logo-main.png";
import HomeIcon from "../asset/Home";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  CONTACT,
  HOME,
  LOGIN,
  NEWS,
  SEAT_PLAN,
  USER_PROFILE,
} from "../config/path";
import User from "../asset/user";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("data_user"));
  return (
    <div className="header">
      {/* <div className="header-container">
        
      <Navbar className="header-navbar" sticky="top" edivd="lg" collapseOnSelect>
        <div className="header-container-left">

        <NavbarBrand className="header-navbar-brand">
          <img src={Logo}/>
        </NavbarBrand>
        </div>
        <div className="header-container-right">
          
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link className="header-navbar-nav"href={HOME}>
                Trang chủ
              </Nav.Link>
            <NavDropdown title="Phim">
              <NavDropdown.Item className="header-navbar-nav" >Phim đang chiếu</NavDropdown.Item>
              <NavDropdown.Item className="header-navbar-nav" >Phim sắp chiếu</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="header-navbar-nav">Khuyến mãi</Nav.Link>
            <Nav.Link className="header-navbar-nav" href={CONTACT}>Liên hệ</Nav.Link>
            <Nav.Link className="header-navbar-nav" href={LOGIN}>Đăng nhập</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>

      </div> */}
      <div className="header-navbar">
        <div className="header-navbar-content">
          <div className="header-navbar-content-left">
            <img className="logo-img" src={Logo} />
          </div>
          <div className="header-navbar-content-right">
            <Link className="header-navbar-content-right-nav" to={HOME}>
              Trang chủ
            </Link>
            <div className="header-navbar-content-right-nav">
              Phim đang chiếu
            </div>
            <div className="header-navbar-content-right-nav">
            </div>
            <Link className="header-navbar-content-right-nav" to={CONTACT}>
              Liên hệ
            </Link>
            <Link className="header-navbar-content-right-nav" to={NEWS}>
              Tin tức
            </Link>

            <Link className="header-navbar-content-right-nav" to={SEAT_PLAN}>
              Đặt ghế
            </Link>
          </div>
          {user ? (
            <Link className="header-navbar-content-right-nav" to={USER_PROFILE}>
              {`${user.first_name} ${user.last_name}`}
            </Link>
          ) : (
            <Link className="header-navbar-content-right-nav-btn" to={LOGIN}>
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
