import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DASHBOARD, SIGNUP } from "../../constants/routes";
import {
  login,
  validateToken,
  resendQrUsingBackupCodes,
} from "../../services/Api/authuser";
import { TOKEN } from "../../constants/text";
import { setItemInLocalStorage } from "../../utils/localstorage";
import { useHistory, Link } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../reducers/loaderSlice";
import Copyright from "../../components/Copyright";
import Box from "@material-ui/core/Box";
import TwoFactorAuth from "../../components/TwoFactorAuth";
import login_img from "../../assets/Images/login_img.svg";
import logo from '../../assets/logo.svg';

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
    "&:active": {
      color: "#3f51b5",
    },
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));

type LoginProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = (props): JSX.Element => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [tokenAuthFlag, setTokenAuthFlag] = useState(false);
  const [showQrCodeFlag, setShowQrCodeFlag] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState("");
  const [loginTokens, setLoginTokens] = useState("");
  const [headingText, setHeadingText] = useState(
    "Enter the six-digit code from the application."
  );
  const [authInputLabel, setAuthInputLabel] = useState("Authorization Token");
  const [authButtonLabel, setAuthButtonLabel] = useState("Validate");
  const [backUpCodeScreenVisible, setBackUpCodeScreenVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { setLoggedIn } = props;

  const handleValidation = () => {
    let validateFlag = true;
    if (validateEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      validateFlag = false;
    }
    return validateFlag;
  };

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setFormError("");
    setTokenAuthFlag(false);
    setShowQrCodeFlag(false);
    if (handleValidation()) {
      dispatch(showLoading());
      try {
        const res = await login({ email, password });
        setUserId(res?.id);
        if (res?.qrCode) {
          setShowQrCodeFlag(true);
          setQrCode(res.qrCode);
        }
        setTokenAuthFlag(true);
      } catch (err: any) {
        setFormError(err?.response?.data?.message || "Something went wrong");
      } finally {
        dispatch(hideLoading());
      }
    }
  };

  const resendQrUsingBackupCodesHandler = async () => {
    try {
      const res = await resendQrUsingBackupCodes({ userId, token });
      setToken("");
      setQrCode(res?.qrCodeUrl);
      setShowQrCodeFlag(true);
      setBackUpCodeScreenVisible(false);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleAuthentication = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    if (typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    if (backUpCodeScreenVisible) {
      resendQrUsingBackupCodesHandler();
      return;
    }

    dispatch(showLoading());
    setFormError("");
    try {
      const res = await validateToken({ userId, token });
      let date = new Date();
      date.setSeconds(date.getSeconds() + res.expiresIn);
      const tokenObj = {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        expiresIn: date.getTime(),
      };
      setItemInLocalStorage(TOKEN, JSON.stringify(tokenObj));
      setLoggedIn(true);
      dispatch(hideLoading());
      history.push(DASHBOARD);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleTokenChange = (token: string) => {
    setFormError("");
    setToken(token);
  };

  const handleTokenChangeHelper = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleTokenChange(evt.target.value);
  };

  const handleEndOutcome = () => {
    setItemInLocalStorage(TOKEN, loginTokens);
    setLoggedIn(true);
    history.push(DASHBOARD);
  };

  const handleResendQrEnabler = () => {
    setFormError("");
    setToken("");
    setBackUpCodeScreenVisible(true);
    setHeadingText("Use your one of your Backup codes to regenerate the QR");
    setAuthInputLabel("Backup Code");
    setAuthButtonLabel("Verify");
  };
  const handleResetValidationScreen = () => {
    setFormError("");
    setToken("");
    setBackUpCodeScreenVisible(false);
    setHeadingText("Enter the six-digit code from the application.");
    setAuthInputLabel("Authorization Token");
    setAuthButtonLabel("Validate");
  };
  const handleLoginTokenChange = (tokens: string) => {
    setLoginTokens(tokens);
  };

  return (
    <div className="login_section sign_in" id="sign_in_pg">
      <div className="logo_section">
        <div>
          <img src={logo} alt="truefie" />
        </div>
      </div>
      <CssBaseline />
      <div className="container">
        <div className="lg_row">
          <div className="lg_col_1">
            <img src={login_img} alt="login_img" />
          </div>
          <div className="lg_col_2">
            <div className="login_form">
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Welcome to Truefi!
                </Typography>
                <FormHelperText component="p" error={true}>
                  {formError}
                </FormHelperText>
                {showQrCodeFlag ? (
                  <div style={{ width: "150%" }}>
                    <TwoFactorAuth
                      handleLoginTokenChange={handleLoginTokenChange}
                      userEmail={email}
                      userId={userId}
                      qrCode={qrCode}
                      token={token}
                      tokenChangeHandler={handleTokenChange}
                      handleEndOutcome={handleEndOutcome}
                    />
                  </div>
                ) : tokenAuthFlag ? (
                  <>
                    <Typography component="h4" variant="h6">
                      Two-Factor Authentication
                    </Typography>
                    {headingText}
                    <form className={classes.form} onSubmit={handleAuthentication}>
                      <TextField
                        value={token}
                        type="text"
                        onChange={handleTokenChangeHelper}
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth
                        label={authInputLabel}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        {authButtonLabel}
                      </Button>
                    </form>
                    {backUpCodeScreenVisible ? (
                      <div
                        className={classes.link}
                        onClick={handleResetValidationScreen}
                      >
                        Use Authorization token to Authorize?
                      </div>
                    ) : (
                      <div className={classes.link} onClick={handleResendQrEnabler}>
                        Use Backup Codes to Authenticate?
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <TextField
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...(emailError && {
                          error: true,
                          helperText: "email is not valid",
                        })}
                      />
                      <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      // {...(errors && {error:true, helperText: 'cannot be blank'})}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                    </form>
                    <Link to={SIGNUP} className={classes.link}>
                      Don't have an account? Sign Up
                    </Link>
                    <div
                      className={classes.link}
                      onClick={() => {
                        history.push("./forgotPassword");
                      }}
                    >
                      Forgot Password?
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </div>
  );
};

export default Login;
