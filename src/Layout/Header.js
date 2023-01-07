import "../style/Header.scss";
import Logo from "../asset/Logo-main.png";
import { Link } from "react-router-dom";
import {
  CONTACT,
  GENERAL_ROLE,
  HOME,
  LOGIN,
  NEWS,
  USER_PROFILE,
} from "../config/path";

import { Container, Nav, Navbar } from "react-bootstrap";
import { BiUser } from "react-icons/bi";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("data_user"));
  console.log(user);
  return (
    <div className="header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <img className="logo-img w-50" src={Logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex  m-auto">
              <Nav.Link>
                <Link className=" text-light p-4" to={HOME}>
                  Trang chủ
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className=" text-light p-4" to={CONTACT}>
                  Liên hệ
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className=" text-light p-4" to={NEWS}>
                  Tin tức
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className=" text-light p-4" to={GENERAL_ROLE}>
                  Quy định
                </Link>
              </Nav.Link>
            </Nav>
            {user ? (
              <Nav.Link>
                <Link className="h6" to={USER_PROFILE}>
                  {`${user.full_name}`}
                </Link>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Link className="d-flex h6 text-light" to={LOGIN}>
                  <div className="pt-1 px-2 ">
                    <BiUser />
                  </div>
                  <span>Đăng nhập</span>
                </Link>
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
