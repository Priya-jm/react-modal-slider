import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/Css/Login.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SignUp from "./containers/Signup";
import Login from "./containers/Login";
import { LOGIN, SIGNUP, DASHBOARD, QUESTIONS, RESETPASSWORD, FORGOTPASSWORD, FINANCIALREVIEW } from "./constants/routes";
import { checkIfAccesstokenIsValid } from "./utils";
import Profile from "./containers/Profile";
import Question from "./containers/Questions";
import { rootState } from "./store";
import { showLoading, hideLoading } from "./reducers/loaderSlice";
import Loader from "./components/Loader";
import ResetPassword from "./containers/ResetPassword";
import ForgotPasswordPage from "./containers/ForgotPassword";
import Form from "./components/balanceSheet";
import Header from "./components/Header";

type AppProps = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const App: React.FC<AppProps> = ({
  isLoading,
  showLoading,
  hideLoading,
}): JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const { status } = useSelector((state: any) => state.userStatus)

  useEffect(() => {
    setLoggedIn(checkIfAccesstokenIsValid());
  }, []);

  let loc = window.location.pathname

  return (
    <div className="App">
      <BrowserRouter>
        {loc === "/" || loc === "/login" || loc === "/forgotPassword" || loc === "/signup"  ? null :
          <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} companyLogoUrl={companyLogoUrl} userStatus={status} />
        }
        <Switch>
          <Redirect
            path="/"
            exact
            to={checkIfAccesstokenIsValid() ? DASHBOARD : LOGIN}
          />
          <Route path={SIGNUP} exact render={() => <SignUp setLoggedIn={setLoggedIn} />} />
          {!checkIfAccesstokenIsValid() && (
            <Route
              path={LOGIN}
              render={() => <Login setLoggedIn={setLoggedIn} />}
            />
          )}
          <Route
            exact path={FINANCIALREVIEW}
            render={() => <Form />}
          />
          {!checkIfAccesstokenIsValid() && (
            <Route
              path={RESETPASSWORD}
              render={() => <ResetPassword />}
            />
          )}
          {!checkIfAccesstokenIsValid() && (
            <Route
              path={FORGOTPASSWORD}
              render={() => <ForgotPasswordPage />}
            />
          )}
          {checkIfAccesstokenIsValid() && (
            <div>
              <Route path={QUESTIONS} exact component={Question} />
              <Route path={DASHBOARD} exact render={() => <Profile setCompanyLogoUrl={setCompanyLogoUrl} />} />
            </div>
          )}
          <Redirect
            path="**"
            to={checkIfAccesstokenIsValid() ? DASHBOARD : LOGIN}
          />
        </Switch>
      </BrowserRouter>
      {isLoading && <Loader />}
    </div>
  );
};

const mapStateToProps = (state: rootState) => ({
  isLoading: state.loader.loading,
});

export default connect(mapStateToProps, { showLoading, hideLoading })(App);
