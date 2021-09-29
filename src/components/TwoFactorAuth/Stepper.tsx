import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';
import CardSummary from './CardSummary';
import authenticated from '../../assets/authenticated.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    otpContainer: {
      width: 'fit-content',
    },
    backupCodeContainer: {
      background: '#f7f7f7',
      display: 'flex',
    },
    inputWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

function getSteps() {
  return [
    'Two Factor Authentication',
    'Save your recovery codes',
    'Two-factor authentication activated',
  ];
}

const VerticalLinearStepper = (props: {
  userEmail: string;
  qrCode: string;
  token: string;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndOutcome: () => void;
  validateToken: () => Promise<any>;
}): JSX.Element => {
  const [backupCodesLeft, setBackupCodesLeft] = useState([]) as any;
  const [backupCodesRight, setBackupCodesRight] = useState([]) as any;
  const [backupCodes, setBackupCodes] = useState([]) as any;

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([backupCodes.join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = `recoveryCodes_${props.userEmail}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <div>
            <Typography>
              Two-factor authentication (2FA) is an extra layer of security used
              when logging into websites or apps. Scan the image below with the
              two-factor authentication app on your phone.
            </Typography>
            <img src={props.qrCode} alt='' />
            <div className={classes.inputWrapper}>
              Enter the six-digit code from the application.
              <TextField
                value={props.token}
                type='text'
                onChange={props.handleChange}
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth
                label='Token'
                className={classes.otpContainer}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className={classes.backupCodeContainer}>
              <div style={{ width: '50%' }}>
                {backupCodesLeft.map((code: any) => (
                  <div key={code}>
                    <Typography>{code}</Typography>
                  </div>
                ))}
              </div>
              <div style={{ width: '50%' }}>
                {backupCodesRight.map((code: any) => (
                  <div key={code}>
                    <Typography>{code}</Typography>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleDownload}
                className={classes.button}
              >
                Download
              </Button>
            </div>
            <p style={{ fontSize: '13px' }}>
              Why is Saving your recovery code important? If you lose access to
              your phone, you can authenticate using your recovery codes.
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <img src={authenticated} alt='' />
            <CardSummary
              label=''
              value='The next time you login from unrecognized browser or device, you will need to provide a two-factor authentication code.'
            />
          </div>
        );
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const stepButtonLabels = {
    0: 'Verify',
    1: 'I have saved my recovery codes',
    2: 'Done',
  } as any;

  const diviedBackupCodes = (codes: []) => {
    if (codes.length) {
      const leftSideBackup = codes.slice(0, codes.length / 2);
      const rightSideBackup = codes.slice(codes.length / 2);
      setBackupCodesLeft(leftSideBackup);
      setBackupCodesRight(rightSideBackup);
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const tokenResponse = await props.validateToken();
      if (tokenResponse?.verified) {
        diviedBackupCodes(tokenResponse?.backupCodes);
        setBackupCodes(tokenResponse?.backupCodes);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      props.handleEndOutcome();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Typography component='h6' variant='h6'>
                {label}
              </Typography>
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {stepButtonLabels[activeStep]}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
export default VerticalLinearStepper;
