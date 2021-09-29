import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ForgotPassword from "../../components/ForgotPassword";
import Copyright from "../../components/Copyright";
import logo from "../../assets/logo.svg";
import forgot_password from "../../assets/Images/forgot-password.svg";
import { useHistory } from 'react-router-dom';

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

const ForgotPasswordPage: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [isSignInIcon, setIsSignInIcon] = useState(true);

  const handleResetPassword = () => {
    setIsSignInIcon(false);
  };
  const history = useHistory();
  const handleClick = () => history.push('/login');

  return (
    <div className="login_section forgot_pass" id="sign_in_pg">
      <div className="logo_section">
        <div>
          <img src={logo} alt="truefie" />
        </div>
      </div>
      <CssBaseline />
      <div className="container">
        <div className="lg_row">
          <div className="lg_col_1">
            <img src={forgot_password} alt="forgot_password" />
          </div>
          <div className="lg_col_2">
            <div className="forgot_form">
              <div className={classes.paper}>
                {isSignInIcon && (
                  <Typography component="h1" variant="h5">
                    Forgot Password?
                  </Typography>
                )}
                 <p className="for_subhead">Enter your email and we'll send you instructions to reset your password</p>
                <ForgotPassword handleResetPassword={handleResetPassword} />{" "}
                <p onClick={handleClick} className="backlog">Back to login</p>
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

export default ForgotPasswordPage;
