import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
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

const Login = lazy(() => import("../components/auth/Login"));
const Signup = lazy(() => import("../components/auth/Signup"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Home = lazy(() => import("../components/Home/Home"));
const Moviedetail = lazy(() => import("../components/Moviedetail/Moviedetail"));
const News = lazy(() => import("../components/News/News"));
const Newsdetail = lazy(() => import("../components/News/Newsdetail"));

const AppRouter = () => {
  const user = localStorage.getItem("data_user");
  const token = localStorage.getItem("token_user");
  const ticket = localStorage.getItem("@ticket");

  return (
    <Suspense fallback={<div>loading</div>}>
      <Router>
        <Switch>
          <Route path={HOME} exact>
            <Home />
          </Route>
          <Route path={CONTACT} exact>
            <Contact />
          </Route>
          <Route path={MOVIE_DETAIL} exact>
            <Moviedetail />
          </Route>
          <Route
            path={PAYMENT}
            exact
            component={(props) =>
              ticket ? <Payment {...props} /> : <Redirect to={LOGIN} />
            }
          />
          <Route
            path={SEAT_PLAN}
            exact
            component={(props) => <Seatplan {...props} />}
          />
          <Route path={NEWS} exact>
            <News />
          </Route>
          <Route path={NEWS_DETAIL} exact>
            <Newsdetail />
          </Route>
          <Route
            path={USER_PROFILE}
            exact
            component={(props) =>
              user && token ? (
                <Userprofile {...props} />
              ) : (
                <Redirect to={LOGIN} />
              )
            }
          />
          <Route
            path={LOGIN}
            exact
            component={(props) =>
              user && token ? <Redirect to={HOME} /> : <Login {...props} />
            }
          />
          <Route
            path={SIGNUP}
            exact
            component={(props) =>
              user && token ? <Redirect to={HOME} /> : <Signup {...props} />
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
