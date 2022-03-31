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
  const user = JSON.parse(localStorage.getItem("data_user")) | null;
  const token = localStorage.getItem("token_user") | null;
  console.log(user, token);

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
          <Route path={PAYMENT} exact>
            <Payment />
          </Route>
          <Route path={SEAT_PLAN} exact render={() => <Seatplan />} />
          <Route path={NEWS} exact>
            <News />
          </Route>
          <Route path={NEWS_DETAIL} exact>
            <Newsdetail />
          </Route>
          <Route
            path={USER_PROFILE}
            exact
            render={() =>
              user && token ? <Userprofile /> : <Redirect to={LOGIN} />
            }
          />
          <Route
            path={LOGIN}
            exact
            render={() =>
              user === 0 || token === 0 ? <Login /> : <Redirect to={HOME} />
            }
          />
          <Route
            path={SIGNUP}
            exact
            render={() =>
              user === 0 || token === 0 ? <Signup /> : <Redirect to={HOME} />
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
