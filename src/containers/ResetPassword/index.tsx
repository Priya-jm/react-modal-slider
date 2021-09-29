import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Typography,
  FormHelperText,
  TextField,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core";
import Copyright from "../../components/Copyright";
import {
  ChangePassword,
  validateResetPasswordToken,
} from "../../services/Api/authuser";
import { hideLoading, showLoading } from "../../reducers/loaderSlice";
import { useDispatch } from "react-redux";
import { LooseObjectInterface } from "../../interfaces/LooseObjectInterface";
import { SignUpErrorDataInterface, SignUpHelperTextDataInterface } from "../../interfaces/SignupInterface";
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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isResetTokenValid, setIsResetTokenValid] = useState(false);
  const [errorFields, setErrorFields] = useState({
    passwordError: false,
    confirmPasswordError: false,
  });
  const [helperTextFields, setHelperTextFields] = useState({
    passwordHelperText: "",
    confirmPasswordHelperText: "",
  });

  const userId = query.get("userId") || "";
  const token = query.get("token") || "";

  useEffect(() => {
    const validateToken = async () => {
      const res = await validateResetPasswordToken({ token }, userId);
      setIsResetTokenValid(res.tokenValidated);
    };
    validateToken();
  }, [token, userId]);

  const handleValidation = () => {
    let validateFlag = true;
    let errorData = { ...errorFields } as LooseObjectInterface;
    let helperTextData = { ...helperTextFields } as LooseObjectInterface;

    if ( password === confirmPassword ) {
      errorData['confirmPasswordError'] = false;
      helperTextData['confirmPasswordHelperText'] = '';
      if ( password.length >= 4) {
        errorData['passwordError'] = false;
        helperTextData['passwordHelperText'] = '';
      } else {
        errorData['passwordError'] = true;
        helperTextData['passwordHelperText'] =
          'Password should be more than 4 character.';
        validateFlag = false;
      }
    } else {
      errorData['confirmPasswordError'] = true;
      helperTextData['confirmPasswordHelperText'] =
        'Password did not match.';
      if (password.length >= 4) {
        errorData['passwordError'] = false;
        helperTextData['passwordHelperText'] = '';
      } else {
        errorData['passwordError'] = true;
        helperTextData['passwordHelperText'] =
          'Password should be more than 4 character.';
      }
      validateFlag = false;
    }

    setErrorFields({
      ...(errorData as unknown as SignUpErrorDataInterface),
    });
    setHelperTextFields({
      ...(helperTextData as unknown as SignUpHelperTextDataInterface),
    });
    return validateFlag;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setFormError("");
    if (handleValidation()) {
      dispatch(showLoading());
      try {
        await ChangePassword({ token, password }, userId);
        history.push("/login");
      } catch (err: any) {
        setFormError(err?.response?.data?.message || "Something went wrong");
      } finally {
        dispatch(hideLoading());
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <FormHelperText component="p" error={true}>
          {formError}
        </FormHelperText>
        <>
          <form className={classes.form} onSubmit={handleSubmit}>
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
              {...(errorFields.passwordError && {error:true, helperText: helperTextFields.passwordHelperText})}
            />
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...(errorFields.confirmPasswordError && {error:true, helperText: helperTextFields.confirmPasswordHelperText})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isResetTokenValid}
            >
              Save
            </Button>
          </form>
        </>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ResetPassword;
