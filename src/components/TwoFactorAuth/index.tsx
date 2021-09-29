import React, { useState } from 'react';
import VerticalLinearStepper from './Stepper';
import { verifyToken } from '../../services/Api/authuser';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../reducers/loaderSlice';
import { Snackbar } from '@material-ui/core';

const TwoFactorAuth = (props: {
  handleLoginTokenChange: (tokens: string) => void;
  userEmail: string;
  qrCode: string;
  userId: string;
  token: string;
  tokenChangeHandler: (token: string) => void;
  handleEndOutcome: () => void;
}): JSX.Element => {
  const dispatch = useDispatch();
  const [toastFlag, setToastFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { qrCode, userId, token, userEmail, handleLoginTokenChange } = props;

  const handleTokenChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    props.tokenChangeHandler(evt.target.value);
  };

  const validateToken = async () => {
    try {
      setToastFlag(false);
      dispatch(showLoading());
      const response = await verifyToken({ userId, token });
      if (response?.verified) {
        let date = new Date();
        date.setSeconds(date.getSeconds() + response.expiresIn);
        const tokenObj = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: date.getTime(),
        };
        handleLoginTokenChange(JSON.stringify(tokenObj));
      }

      if (!response?.verified) {
        setToastFlag(true);
        setErrorMessage(
          'Token not verified, Try rescanning the QR code or re-enter the fresh token'
        );
      }
      return response;
    } catch (err) {
      setToastFlag(true);
      setErrorMessage(err?.response?.data?.message || 'Something went wrong');
      return { verified: false };
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div>
      <VerticalLinearStepper
        userEmail={userEmail}
        qrCode={qrCode}
        handleChange={handleTokenChange}
        validateToken={validateToken}
        handleEndOutcome={props.handleEndOutcome}
        token={token}
      />
      <Snackbar
        autoHideDuration={5 * 1000}
        open={toastFlag}
        message={errorMessage}
        onClose={() => setToastFlag(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default TwoFactorAuth;
