import "../style/Navigation.scss";
const Navigation = ({ children }) => {
  return (
    <div className="navigation">
      <div className="navigation-background">
        <img src="https://dmitryvolkov.me/demo/flixgo2.0/main/img/section/section.jpg" />
        <div className="navigation-background-title">{children}</div>
      </div>
    </div>
  );
};
export default Navigation;
