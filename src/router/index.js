import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import Payment from "../components/Payment/Payment";
import Seatplan from "../components/Seatplan/Seatplan";
import Userprofile from "../components/Userprofile/Userprofile";
import { bindParam, isLogin, isTicket } from "../config/function";
import axios from "axios";
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
import Loading from "../common/Loading";
const Login = lazy(() => import("../components/auth/Login"));
const Signup = lazy(() => import("../components/auth/Signup"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Home = lazy(() => import("../components/Home/Home"));
const Moviedetail = lazy(() => import("../components/Moviedetail/Moviedetail"));
const News = lazy(() => import("../components/News/News"));
const Newsdetail = lazy(() => import("../components/News/Newsdetail"));

const AppRouter = () => {
  const showtime = localStorage.getItem("@showtime");
  const token= localStorage.getItem("token_user");

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }, [token])

  return (
    <Suspense fallback={<Loading width="1000" height="1000"/>}>
      <Router>
        <Switch>
          <Route
            path={HOME}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : (
                <Home {...props} />
              )
            }
          />
          <Route
            path={CONTACT}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : (
                <Contact {...props} />
              )
            }
          />
          <Route
            path={MOVIE_DETAIL}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : (
                <Moviedetail {...props} />
              )
            }
          />
          <Route
            path={PAYMENT}
            exact
            render={(props) =>
              isTicket() ? <Payment {...props} /> : <Redirect to={LOGIN} />
            }
          />
          <Route
            path={SEAT_PLAN}
            exact
            component={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : (
                <Seatplan {...props} />
              )
            }
          />
          <Route path={NEWS} exact>
            <News />
          </Route>
          <Route
            path={NEWS_DETAIL}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : (
                <Newsdetail {...props} />
              )
            }
          />
          <Route
            path={USER_PROFILE}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : isLogin() ? (
                <Userprofile {...props} />
              ) : (
                <Redirect to={LOGIN} />
              )
            }
          />
          <Route
            path={LOGIN}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : isLogin() ? (
                <Redirect to={HOME} />
              ) : (
                <Login {...props} />
              )
            }
          />
          <Route
            path={SIGNUP}
            exact
            render={(props) =>
              isTicket() ? (
                <Redirect to={bindParam(PAYMENT, { id: showtime })} />
              ) : isLogin() ? (
                <Redirect to={HOME} />
              ) : (
                <Signup {...props} />
              )
            }
          />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};
export default AppRouter;
