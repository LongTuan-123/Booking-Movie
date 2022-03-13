import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Contact from "../components/Contact/Contact";
import Home from "../components/Home/Home";
import Moviedetail from "../components/Moviedetail/Moviedetail";
import News from "../components/News/News";
import Newsdetail from "../components/News/Newsdetail";
import Payment from "../components/Payment/Payment";
import Seatplan from "../components/Seatplan/Seatplan";
import Userprofile from "../components/Userprofile/Userprofile";
import {
  CONTACT,
  HOME,
  LOGIN,
  MOVIE_DETAIL,
  NEWS,
  NEWS_DETAIL,
  PAYMENT,
  SEAT_PLAN,
  SIGNUP,
  USER_PROFILE,
} from "../config/path";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={HOME} exact>
          <Home />
        </Route>
        <Route path={LOGIN} exact>
          <Login />
        </Route>
        <Route path={SIGNUP} exact>
          <Signup />
        </Route>
        <Route path={CONTACT} exact>
          <Contact />
        </Route>
        <Route path={MOVIE_DETAIL} exact>
          <Moviedetail />
        </Route>
        <Route path={PAYMENT} exact>
          <Payment />
        </Route>
        <Route path={SEAT_PLAN} exact>
          <Seatplan />
        </Route>
        <Route path={NEWS} exact>
          <News />
        </Route>
        <Route path={NEWS_DETAIL} exact>
          <Newsdetail />
        </Route>
        <Route path={USER_PROFILE} exact>
          <Userprofile />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
