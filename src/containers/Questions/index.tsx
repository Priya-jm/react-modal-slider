import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  LinearProgressProps,
  LinearProgress,
  Box,
  FormHelperText,
  Snackbar,
} from '@material-ui/core';

import { getQuestion } from '../../services/Api/questions';
import { submitResponse } from '../../services/Api/userSubmission';
import QuestionCard from '../../components/QuestionCard';
import { GetQuestionInterface } from '../../interfaces/GetQuestionInterface';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../reducers/loaderSlice';
import DialogBox from '../../components/DialogBox';
import { DASHBOARD, FINANCIALREVIEW } from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';

type QuestionProps = {};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  progressBar: {
    width: '100%',
    margin: '50px',
  },
  body: {
    // backgroundColor: '#7cc6fe',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '30vh',
  },
});

const Question: React.FC<QuestionProps> = (props): JSX.Element => {
  const classes = useStyles();
  const [question, setQuestion] = useState(
    null as unknown as GetQuestionInterface
  );
  const [open, setOpen] = useState(false);

  const [toastFlag, setToastFlag] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');
  const [fileDataList, setFileDataList] = useState([]) as any;
  const [questionErrorFlag, setQuestionErrorFlag] = useState(false);
  const [perc, setPerc] = useState(0);
  const [attestationId, setAttestationId] = useState('');
  const [questionError, setQuestionError] = useState('');
  const isLoading = useSelector((state: rootState) => state.loader.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  const supportedFormats = {
    'image/jpeg': 1,
    'image/png': 1,
    'image/heif': 1,
    'application/pdf': 1,
  } as any;
  const fileCanBeUploaded = 4;

  const fetchQuestion = async (): Promise<void> => {
    dispatch(showLoading());
    setQuestionErrorFlag(false);
    try {
      const questionRes = await getQuestion();
      const {isFinancialReviewCompleted, isSubmissionCompleted} = questionRes;
      if(!isFinancialReviewCompleted && isSubmissionCompleted){
        history.push({
          pathname: FINANCIALREVIEW,
          state: {attestationId: questionRes._id}
        });
      }
      setQuestion({ ...questionRes });
    } catch (err: any) {
      setQuestionError(
        `${err?.response?.data?.message}` || 'Internal Server Error'
      );
      setQuestionErrorFlag(true);
    }
    dispatch(hideLoading());
  };

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line
  }, []);

  const handleCloseDialogBox = () => {
    setOpen(false);
    history.push({
      pathname: FINANCIALREVIEW,
      state: {attestationId}
  });
  };

  const handleFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target!.files!.length + fileDataList.length > fileCanBeUploaded) {
      setErrorMsg(`Only upload upto ${fileCanBeUploaded} files at a time `);
      setToastFlag(true);
      return;
    }
    const fileList = evt.target!.files! as unknown as any[];
    let newFileDataList = [...fileDataList];
    for (const file of fileList) {
      if (!supportedFormats[file.type]) {
        setErrorMsg(
          `Unsupported document is provided. Supported document formats are PDF, JPG, PNG, HEIC.`
        );
        setToastFlag(true);
        setFileDataList([]);
        return;
      }
      if (file.size > 20 * 1000000) {
        setErrorMsg(`File Size should be less than 20MB.`);
        setToastFlag(true);
        setFileDataList([]);
        return;
      }
      newFileDataList = [...newFileDataList, file];
    }

    setFileDataList(newFileDataList);
  };

  const handleDelete = (index: number) => {
    const updatedFileList = [...fileDataList];
    updatedFileList.splice(index, 1);
    setFileDataList(updatedFileList);
  };

  const handleNext = async (answer: string): Promise<boolean> => {
    if (answer === '') {
      return false;
    }
    dispatch(showLoading());
    try {
      const formData = new FormData();
      formData.append('questionId', question.question._id);
      formData.append('response', answer);

      if (question.question.isDocumentRequired) {
        fileDataList.forEach((file: any) => formData.append('documents', file));
      }

      const res = await submitResponse(question._id, formData);
      setFileDataList([]);
      if (res.isSubmissionIneligible) {
        setQuestionError(res?.messageOnIneligible || 'Submission not eligible');
        setQuestionErrorFlag(true);
        return false;
      }
      if (!res.isSubmissionCompleted) {
        await fetchQuestion();
      } else {
        setOpen(true);
        setPerc(res?.progressPercentage)
        setAttestationId(res?._id);
      }
      return true;
    } catch (err: any) {
      setErrorMsg(`${err!.response!.data!.message}`);
      setToastFlag(true);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleNoQuestionClose = () => {
    setQuestionErrorFlag(false);
    history.push(DASHBOARD);
  };

  return !isLoading ? (
    <Container>
      <br />
      {questionErrorFlag ? (
        <DialogBox
          open={questionErrorFlag}
          handleClose={handleNoQuestionClose}
          text={`${questionError}`}
        />
      ) : (
        <>
          <div className={classes.progressBar}>
            <LinearProgressWithLabel value={open? perc : question?.progressPercentage} />
          </div>
          <div>
            <FormHelperText component='p'>
              <span
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '15px',
                  width: '250px',
                  textAlign: 'right',
                }}
              >
                Note: Question submission is auto-save
              </span>
            </FormHelperText>
          </div>
          <br />
          <div className={classes.body}>
            {question && (
              <QuestionCard
                questionObj={question}
                handleNext={handleNext}
                handleFileChange={handleFileUpload}
                handleDelete={handleDelete}
                fileDataList={fileDataList}
              />
            )}
          </div>
        </>
      )}
      <DialogBox
        open={open}
        handleClose={handleCloseDialogBox}
        text='You have completed all the questions.'
      />
      <Snackbar
        autoHideDuration={5 * 1000}
        open={toastFlag}
        message={errorMessage}
        onClose={() => setToastFlag(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  ) : (
    <div></div>
  );
};

export default Question;
