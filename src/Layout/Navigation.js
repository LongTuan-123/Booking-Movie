import "../style/Navigation.scss";
import imagePagination from "../asset/pagnigation.jpg";

const Navigation = ({ children }) => {
  return (
    <div className="navigation">
      <div className="navigation-background">
        <img src={imagePagination} />
        <div className="navigation-background-title">{children}</div>
      </div>
    </div>
  );
};
export default Navigation;
