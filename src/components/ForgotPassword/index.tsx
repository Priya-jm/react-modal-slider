import {
  TextField,
  Button,
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../reducers/loaderSlice";
import { forgotPassword } from "../../services/Api/authuser";

import { validateEmail } from "../../utils/index";
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
  cardRoot: {
    minWidth: 545,
    marginTop: '5%',

  },
}));

export const ForgotPassword = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [formError, setFormError] = useState("");

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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setFormError("");
    props.handleResetPassword();
    if (handleValidation()) {
      dispatch(showLoading());
      try {
        await forgotPassword({ email });
        setIsResetPassword(true);
      } catch (err: any) {
        setFormError(err?.response?.data?.message || "Something went wrong");
      } finally {
        dispatch(hideLoading());
      }
    }
  };

  return (
    <>
    <FormHelperText component="p" error={true}>
          {formError}
        </FormHelperText>
      {!isResetPassword ? (
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
      ) : (
        <div>
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Check Inbox
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Reset password link has been send to the email.
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
          </Card>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
