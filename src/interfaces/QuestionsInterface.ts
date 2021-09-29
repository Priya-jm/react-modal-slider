import { OptionInterface } from "./OptionInterface";

export interface QuestionsResponseInterface {
  _id: string;
	responseOptions: OptionInterface[];
	question: string;
	questionNote: string;
	isLive: boolean;
	parentQuestion: string;
	parentQuestionOption: string;
	isOptionBasedQuestion: boolean;
	weight: {
    _id: string;
    name: string;
    value: number;
  }
	category: {
    _id: string;
    name: string;
  }
	respondent: {
    _id: string;
    name: string;
  }
}
