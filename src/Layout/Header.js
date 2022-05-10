import "../style/Header.scss";
import Logo from "../asset/Logo-main.png";
import HomeIcon from "../asset/Home";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  CONTACT,
  GENERAL_ROLE,
  HOME,
  LOGIN,
  NEWS,
  SEAT_PLAN,
  USER_PROFILE,
} from "../config/path";
import User from "../asset/user";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";
import { BiUser } from "react-icons/bi";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("data_user"));
  return (
    <div className="header">
      <div className="header-container bg1">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img className="logo-img w-50" src={Logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="d-flex  m-auto">
                <Nav.Link>
                  <Link
                    className="header-navbar-content-right-nav text-light p-4"
                    to={HOME}
                  >
                    Trang chủ
                  </Link>
                </Nav.Link>
                {/* <NavDropdown title="Phim" id="nav-dropdown" className="dropdown">
                  <NavDropdown.Item>
                    <Link
                      className="header-navbar-content-right-nav text-dark"
                      to={HOME}
                    >
                      Phim đang chiếu
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="header-navbar-content-right-nav text-dark"
                      to={HOME}
                    >
                      Phim đang chiếu
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown> */}

                <Nav.Link>
                  <Link
                    className="header-navbar-content-right-nav text-light p-4"
                    to={CONTACT}
                  >
                    Liên hệ
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="header-navbar-content-right-nav text-light p-4"
                    to={NEWS}
                  >
                    Tin tức
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    className="header-navbar-content-right-nav text-light p-4"
                    to={GENERAL_ROLE}
                  >
                    Quy định
                  </Link>
                </Nav.Link>
              </Nav>
              {user ? (
                <Nav.Link>
                  <Link
                    className="header-navbar-content-right-nav"
                    to={USER_PROFILE}
                  >
                    {`${user.last_name}  ${user.first_name}`}
                  </Link>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <Link
                    className="header-navbar-content-right-nav d-flex"
                    to={LOGIN}
                  >
                    <BiUser />
                    <span>Đăng nhập</span>
                  </Link>
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default Header;
