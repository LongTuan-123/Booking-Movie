import FacebookIcon from "../asset/facebook";
import InstaIcon from "../asset/instagram";
import PrinterIcon from "../asset/pinterest";
import TwitterIcon from "../asset/twitter";
import YouTubeIcon from "../asset/youtube";
import "../style/Footer.scss";
import Logo from "../asset/Logo-main.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content container row m-auto">
        <div className="footer-content-right row">
          <div className="footer-content-right-logo col-xl-3 col-12">
            <img className="" src={Logo} alt="lOGO" />
          </div>
          <div className="footer-content-right-info col-xl-3 col-sm-12 text-center">
            Địa chỉ liên lạc
            <span>Số 12,ngách 394, đường Mỹ Đình, Hà Nội</span>
            <span>Hotline:0973818134</span>
            <span>Email:longtuan2k@gmail.com</span>
          </div>
          <div className="footer-content-right-info col-xl-3 col-sm-12 ">
            Thông tin phòng vé
            <span>Giờ mở cửa:7h30-23h</span>
          </div>
          <div className="footer-content-right-info-3 col-xl-3 col-sm-12  row">
            <div className="footer-content-right-info-3-connectus text-center">
              Kết nối với chúng tôi
            </div>
            <div className="d-flex justify-content-around">
              <div className="footer-content-right-info-3-icon col-2 p-3">
                <FacebookIcon width={28} height={28} />
              </div>
              <div className="footer-content-right-info-3-icon col-2 p-3">
                <InstaIcon width={28} height={28} />
              </div>
              <div className="footer-content-right-info-3-icon col-2 p-3">
                <PrinterIcon width={28} height={28} />
              </div>
              <div className="footer-content-right-info-3-icon col-2 p-3">
                <YouTubeIcon width={28} height={28} />
              </div>
              <div className="footer-content-right-info-3-icon col-2 p-3">
                <TwitterIcon width={28} height={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-coppyright text-center">
        Copyright © 3622.All Rights Reserved By Long Dang Tuan
      </div>
    </div>
  );
};
export default Footer;
