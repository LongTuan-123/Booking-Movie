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
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={Logo} />
        </div>
        <div className="footer-content-right">
          <div className="footer-content-right-info">
            Địa chỉ liên lạc
            <span>Số 12,ngách 394, đường Mỹ Đình, Hà Nội</span>
            <span>Hotline:0973818134</span>
            <span>Email:longtuan2k@gmail.com</span>
          </div>
          <div className="footer-content-right-info">
            Thông tin phòng vé
            <span>Giờ mở cửa:7h30-23h</span>
          </div>
          <div className="footer-content-right-info-3">
            <div className="footer-content-right-info-3-connectus">
              Kết nối với chúng tôi
            </div>
            <div className="footer-content-right-info-3-icon">
              <FacebookIcon width={36} height={36} />
            </div>
            <div className="footer-content-right-info-3-icon">
              <InstaIcon width={36} height={36} />
            </div>
            <div className="footer-content-right-info-3-icon">
              <PrinterIcon width={36} height={36} />
            </div>
            <div className="footer-content-right-info-3-icon">
              <YouTubeIcon width={36} height={36} />
            </div>
            <div className="footer-content-right-info-3-icon">
              <TwitterIcon width={36} height={36} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-coppyright">
        <div className="footer-coppyright-left">
          Copyright © 3622.All Rights Reserved By Long Dang Tuan
        </div>
        <div className="footer-coppyright-right"></div>
      </div>
    </div>
  );
};
export default Footer;
