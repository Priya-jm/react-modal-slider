import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormHelperText, TextField } from '@material-ui/core';
// import { submitAnswer, updateAnswer } from "../services/Api/userSubmission";
import { GetQuestionInterface } from '../interfaces/GetQuestionInterface';
import './style.css';

const useStyles = makeStyles({
	questionSection: {
		width: '100%',
		position: 'relative',
	},
	questionNote: {
		// marginBottom: '10px',
		fontSize: '18px',
	},
	app: {
		// backgroundColor: '#252d4a',
		width: '650px',
		minHeight: 'min-content',
		// height: 'min-content',
		borderRadius: '15px',
		padding: '20px',
		boxShadow: '0px 0px 10px -5px rgb(0 0 0 / 95%)',
		display: 'flex',
		justifyContent: 'center',
	},
});

type QuestionCardProps = {
	questionObj: GetQuestionInterface;
	fileDataList: any[];
	handleNext: (answer: string) => Promise<boolean>;
	handleFileChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	handleDelete: (index: number) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
	questionObj,
	handleNext,
	handleFileChange,
	handleDelete,
	fileDataList,
}): JSX.Element => {
	const classes = useStyles();
	const [answer, setAnswer] = useState('');
	const [textAnswer, setTextAnswer] = useState('');
	const [formError, setFormError] = useState('');

	const handleAnswer = async (event: React.BaseSyntheticEvent) => {
		event.preventDefault();
		setFormError('');
		setAnswer(event.target.value);
	};

	const handleClick = async (event: React.BaseSyntheticEvent) => {
		event.preventDefault();
		if (questionObj.question.isOptionBasedQuestion) {
			if (answer) {
				const response = await handleNext(answer);
				if(response) {
					setAnswer('');
				}
			} else {
				setFormError('Please select your choice.');
			}
		} else {
			if (textAnswer) {
				const response = await handleNext(textAnswer);
				if(response) {
					setTextAnswer('');
				}
			} else {
				setFormError('Please enter your answer.');
			}
		}
	};

	return (
		<div>
			<div className={classes.app}>
				<div className={classes.questionSection}>
					<div className={classes.questionNote}>
						{questionObj.question.questionNote}
					</div>
					<FormHelperText component='p' error={true}>
						<span style={{ display: 'flex', justifyContent: 'center' }}>
							{formError}
						</span>
					</FormHelperText>
					<div className='answer-section'>
						{questionObj.question.isOptionBasedQuestion &&
							questionObj.question.responseOptions.map(
								(option, index: number) => {
									let checked_ans = false;
									if (answer === option.option) {
										checked_ans = true;
									}
									return (
										<div className='answer-option'>
											<input
												type='radio'
												id={option.option}
												value={option.option}
												onClick={handleAnswer}
												checked={checked_ans}
											/>
											<label aria-checked={checked_ans} htmlFor={option.option}>
												{option.option}
											</label>
										</div>
									);
								}
							)}
						{!questionObj.question.isOptionBasedQuestion && (
							<TextField
								type={questionObj?.question?.isNetAssetQuestion ? "number" : "text"}
								required
								value={textAnswer}
								label='Answer'
								variant='outlined'
								style={{ width: 400, alignSelf: 'center' }}
								onChange={(e) => {
									setFormError('');
									if(questionObj?.question?.isNetAssetQuestion && +e.target.value < 0) {
										return;
									}
									setTextAnswer(e.target.value);
								}}
							/>
						)}
						{questionObj.question.isDocumentRequired && (
							<>
								<br />
								<FileUpload
									buttonText={"Upload File"}
									handleChange={handleFileChange}
									handleDelete={handleDelete}
									fileDataList={fileDataList}
								/>
							</>
						)}
					</div>
				</div>
			</div>
			<Button
				variant='contained'
				size='medium'
				style={{ margin: '25px', backgroundColor: '#e65b74', color: 'white' }}
				onClick={handleClick}>
				Submit
			</Button>
		</div>
	);
};

export default QuestionCard;
