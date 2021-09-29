export interface QuestionInteface {
  _id: string;
  isOptionBasedQuestion: boolean;
  responseOptions: {
    option: string
  }[];
  question: string;
  questionNote: string;
  isDocumentRequired: boolean;
  isNetAssetQuestion: boolean;
}

export interface GetQuestionInterface {
  _id: string;
  progressPercentage: number;
  question: QuestionInteface;
  isFinancialReviewCompleted?: boolean;
  isSubmissionCompleted?: boolean;
}
