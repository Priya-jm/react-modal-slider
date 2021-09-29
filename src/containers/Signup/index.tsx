import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Typography, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import { signup } from "../../services/Api/authuser";
import { LOGIN } from "../../constants/routes";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../reducers/loaderSlice";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { LooseObjectInterface } from "../../interfaces/LooseObjectInterface";
import {
  SignUpDataInterface,
  SignUpErrorDataInterface,
  SignUpHelperTextDataInterface,
} from "../../interfaces/SignupInterface";
import FileUploadWithDragDrop from "../FileUploadWithDragDrop";
import TwoFactorAuth from "../../components/TwoFactorAuth";
import { DASHBOARD } from "../../constants/routes";
import { setItemInLocalStorage } from "../../utils/localstorage";
import { TOKEN } from "../../constants/text";
import {
  validateName,
  validateEmail,
  validateTelegram,
  validateLinkedIn,
  validateMobileNo,
  validateTwitter,
  validateCompanyLinkedIn,
} from "../../utils";
// import InputRemoveAdd from "../../components/InputRemoveAdd";
import MultiInput from "../../components/MultiInput";
import sign_up from '../../assets/Images/sign_up.png';
import logo from '../../assets/logo.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        to={"https://material-ui.com/"}
        style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.54)" }}
      >
        TrueFi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignSelf: "auto",
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
    "&:active": {
      color: "#3f51b5",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
  field: {
    width: "90%",
  },
}));

type SignupProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUp: React.FC<SignupProps> = (props): JSX.Element => {
  const { setLoggedIn } = props;
  const classes = useStyles();
  const [toastFlag, setToastFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileUploadIncompleteFlag, setFileUploadIncompleteFlag] =
    useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [twoFactorAuthFlag, setTwoFactorAuthFlag] = useState(false);
  const [token, setToken] = useState("");
  const [ethValue, setEthValue] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEthValueError, setIsEthValueError] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    primaryFirstName: "",
    primaryLastName: "",
    primaryMobileNo: "",
    primaryEmail: "",
    primaryTelegramHandle: "",
    primaryLinkedInProfile: "",
    password: "",
    confirmPassword: "",
    alternateFirstName: "",
    alternateLastName: "",
    alternateMobileNo: "",
    alternateEmail: "",
    alternateTelegramHandle: "",
    alternateLinkedInProfile: "",
    borrowerEntityName: "",
    tradeName: "",
    borrowerCountry: "",
    ethAddresses: [],
    ethAddress: "",
    industry: "",
    website: "",
    linkedInProfile: "",
    twitterProfile: "",
    companyDescription: "",
    companyLogo: {},
  });
  const [errorFields, setErrorFields] = useState({
    primaryFirstNameError: false,
    primaryLastNameError: false,
    primaryMobileNoError: false,
    primaryEmailError: false,
    primaryTelegramHandleError: false,
    primaryLinkedInProfileError: false,
    passwordError: false,
    confirmPasswordError: false,
    alternateFirstNameError: false,
    alternateLastNameError: false,
    alternateMobileNoError: false,
    alternateEmailError: false,
    companyDescriptionError: false,
    alternateTelegramHandleError: false,
    alternateLinkedInProfileError: false,
    // borrowerEntityNameError: false,
    // tradeNameError: false,
    borrowerCountryError: false,
    // ethAddressError: false,
    // industryError: false,
    // websiteError: false,
    twitterProfileError: false,
    linkedInProfileError: false,
  });
  const [helperTextFields, setHelperTextFields] = useState({
    primaryFirstNameHelperText: "",
    primaryLastNameHelperText: "",
    primaryMobileNoHelperText: "",
    primaryEmailHelperText: "",
    primaryTelegramHandleHelperText: "",
    primaryLinkedInProfileHelperText: "",
    passwordHelperText: "",
    confirmPasswordHelperText: "",
    alternateFirstNameHelperText: "",
    alternateLastNameHelperText: "",
    alternateMobileNoHelperText: "",
    alternateEmailHelperText: "",
    alternateTelegramHandleHelperText: "",
    alternateLinkedInProfileHelperText: "",
    // borrowerEntityNameHelperText: '',
    // tradeNameHelperText: '',
    borrowerCountryHelperText: "",
    // ethAddressHelperText: '',
    // industryHelperText: '',
    // websiteHelperText: '',
    twitterProfileHelperText: "",
    linkedInProfileHelperText: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const formFields = [
    [
      {
        value: registrationData.primaryFirstName,
        type: "text",
        label: "First Name",
        required: true,
        name: "primaryFirstName",
        errorFlag: errorFields.primaryFirstNameError,
        helperText: helperTextFields.primaryFirstNameHelperText,
      },
      {
        value: registrationData.primaryLastName,
        type: "text",
        label: "Last Name",
        required: true,
        name: "primaryLastName",
        errorFlag: errorFields.primaryLastNameError,
        helperText: helperTextFields.primaryLastNameHelperText,
      },
      {
        value: registrationData.primaryEmail,
        type: "email",
        label: "Email Address",
        required: true,
        name: "primaryEmail",
        errorFlag: errorFields.primaryEmailError,
        helperText: helperTextFields.primaryEmailHelperText,
      },
      {
        value: registrationData.primaryMobileNo,
        type: "tel",
        label: "Mobile Number",
        required: false,
        name: "primaryMobileNo",
        errorFlag: errorFields.primaryMobileNoError,
        helperText: helperTextFields.primaryMobileNoHelperText,
      },
      {
        value: registrationData.primaryTelegramHandle,
        type: "text",
        label: "Telegram Handle",
        required: false,
        name: "primaryTelegramHandle",
        errorFlag: errorFields.primaryTelegramHandleError,
        helperText: helperTextFields.primaryTelegramHandleHelperText,
      },
      {
        value: registrationData.primaryLinkedInProfile,
        type: "text",
        label: "LinkedIn Profile",
        required: false,
        name: "primaryLinkedInProfile",
        errorFlag: errorFields.primaryLinkedInProfileError,
        helperText: helperTextFields.primaryLinkedInProfileHelperText,
      },
      {
        value: registrationData.password,
        type: "password",
        label: "Password",
        required: true,
        name: "password",
        errorFlag: errorFields.passwordError,
        helperText: helperTextFields.passwordHelperText,
      },
      {
        value: registrationData.confirmPassword,
        type: "password",
        label: "Confirm Password",
        required: true,
        name: "confirmPassword",
        errorFlag: errorFields.confirmPasswordError,
        helperText: helperTextFields.confirmPasswordHelperText,
      },
    ],
    [
      {
        value: registrationData.alternateFirstName,
        type: "text",
        label: "First Name",
        required: false,
        name: "alternateFirstName",
        errorFlag: errorFields.alternateFirstNameError,
        helperText: helperTextFields.alternateFirstNameHelperText,
      },
      {
        value: registrationData.alternateLastName,
        type: "text",
        label: "Last Name",
        required: false,
        name: "alternateLastName",
        errorFlag: errorFields.alternateLastNameError,
        helperText: helperTextFields.alternateLastNameHelperText,
      },
      {
        value: registrationData.alternateEmail,
        type: "email",
        label: "Email Address",
        required: false,
        name: "alternateEmail",
        errorFlag: errorFields.alternateEmailError,
        helperText: helperTextFields.alternateEmailHelperText,
      },
      {
        value: registrationData.alternateMobileNo,
        type: "tel",
        label: "Mobile Number",
        required: false,
        name: "alternateMobileNo",
        errorFlag: errorFields.alternateMobileNoError,
        helperText: helperTextFields.alternateMobileNoHelperText,
      },
      {
        value: registrationData.alternateTelegramHandle,
        type: "text",
        label: "Telegram Handle",
        required: false,
        name: "alternateTelegramHandle",
        errorFlag: errorFields.alternateTelegramHandleError,
        helperText: helperTextFields.alternateTelegramHandleHelperText,
      },
      {
        value: registrationData.alternateLinkedInProfile,
        type: "text",
        label: "LinkedIn Profile",
        required: false,
        name: "alternateLinkedInProfile",
        errorFlag: errorFields.alternateLinkedInProfileError,
        helperText: helperTextFields.alternateLinkedInProfileHelperText,
      },
    ],
    [
      {
        value: registrationData.borrowerEntityName,
        type: 'text',
        label: 'Borrower Entity Name',
        required: false,
        name: 'borrowerEntityName',
        errorFlag: false,
      },
      {
        value: registrationData.tradeName,
        type: "text",
        label: "Trade Name/DBA",
        required: false,
        name: "tradeName",
        errorFlag: false,
      },
      {
        value: registrationData.borrowerCountry,
        type: "text",
        label: "Borrower Country",
        required: true,
        name: "borrowerCountry",
        errorFlag: errorFields.borrowerCountryError,
        helperText: helperTextFields.borrowerCountryHelperText,
      },
      {
        value: registrationData.ethAddresses,
        type: "text",
        label: "ETH Addresses",
        required: false,
        name: "ethAddresses",
        errorFlag: false,
      },
      {
        value: registrationData.ethAddress,
        type: 'text',
        label: 'Primary ETH Address',
        required: false,
        name: 'ethAddress',
        errorFlag: false,
      },
      {
        value: registrationData.industry,
        type: "text",
        label: "Industry",
        required: false,
        name: "industry",
        errorFlag: false,
      },
      {
        value: registrationData.website,
        type: "url",
        label: "Website",
        required: false,
        name: "website",
        errorFlag: false,
      },
      {
        value: registrationData.linkedInProfile,
        type: "url",
        label: "LinkedIn Profile",
        required: false,
        name: "linkedInProfile",
        errorFlag: errorFields.linkedInProfileError,
        helperText: helperTextFields.linkedInProfileHelperText,
      },
      {
        value: registrationData.twitterProfile,
        type: "url",
        label: "Twitter Profile",
        required: false,
        name: "twitterProfile",
        errorFlag: errorFields.twitterProfileError,
        helperText: helperTextFields.twitterProfileHelperText,
      },
      {
        value: registrationData.companyDescription,
        type: 'text',
        label: 'Company Description',
        required: false,
        name: 'companyDescription',
        errorFlag: errorFields.companyDescriptionError,
      },
      {
        type: "file",
        name: "companyLogo",
      },
    ],
  ];
  const [loginTokens, setLoginTokens] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const tabs = ["Primary Contact", "Alternate Contact", "Company Information"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const data = { ...registrationData } as LooseObjectInterface;
    data[name] = e.target.value.trimLeft();
    setRegistrationData({ ...(data as unknown as SignUpDataInterface) });
  };

  const handleValidation = () => {
    let validateFlag = true;
    let errorData = { ...errorFields } as LooseObjectInterface;
    let helperTextData = { ...helperTextFields } as LooseObjectInterface;

    switch (activeStep) {
      case 0:
        if (validateName(registrationData.primaryFirstName)) {
          errorData["primaryFirstNameError"] = false;
          helperTextData["primaryFirstNameHelperText"] = "";
        } else if (registrationData.primaryFirstName.trim().length === 1) {
          errorData["primaryFirstNameError"] = true;
          helperTextData["primaryFirstNameHelperText"] =
            "Valid first name contains 2-30 characters";
          validateFlag = false;
        } else {
          errorData["primaryFirstNameError"] = true;
          helperTextData["primaryFirstNameHelperText"] =
            "Please enter a valid first name. valid Last name contains only alphabets";
          validateFlag = false;
        }

        if (validateName(registrationData.primaryLastName)) {
          errorData["primaryLastNameError"] = false;
          helperTextData["primaryLastNameHelperText"] = "";
        } else if (registrationData.primaryLastName.trim().length === 1) {
          errorData["primaryLastNameError"] = true;
          helperTextData["primaryLastNameHelperText"] =
            "Valid last name contains 2-30 characters";
          validateFlag = false;
        } else {
          errorData["primaryLastNameError"] = true;
          helperTextData["primaryLastNameHelperText"] =
            "Please enter a valid last name. valid Last name contains only alphabets";
          validateFlag = false;
        }

        if (validateEmail(registrationData["primaryEmail"])) {
          errorData["primaryEmailError"] = false;
          helperTextData["primaryEmailHelperText"] = "";
        } else {
          errorData["primaryEmailError"] = true;
          helperTextData["primaryEmailHelperText"] =
            "Please enter a valid email address.";
          validateFlag = false;
        }

        if (
          registrationData["primaryTelegramHandle"] &&
          !validateTelegram(registrationData["primaryTelegramHandle"])
        ) {
          errorData["primaryTelegramHandleError"] = true;
          helperTextData["primaryTelegramHandleHelperText"] =
            "Please enter a valid telegram URL.";
          validateFlag = false;
        } else {
          errorData["primaryTelegramHandleError"] = false;
          helperTextData["primaryTelegramHandleHelperText"] = "";
        }

        if (
          registrationData["primaryLinkedInProfile"] &&
          !validateLinkedIn(registrationData["primaryLinkedInProfile"])
        ) {
          errorData["primaryLinkedInProfileError"] = true;
          helperTextData["primaryLinkedInProfileHelperText"] =
            "Please enter a valid LinkedIn URL.";
          validateFlag = false;
        } else {
          errorData["primaryLinkedInProfileError"] = false;
          helperTextData["primaryLinkedInProfileHelperText"] = "";
        }

        if (
          registrationData["password"] === registrationData["confirmPassword"]
        ) {
          errorData["confirmPasswordError"] = false;
          helperTextData["confirmPasswordHelperText"] = "";
          if (registrationData["password"].length >= 4) {
            errorData["passwordError"] = false;
            helperTextData["passwordHelperText"] = "";
          } else {
            errorData["passwordError"] = true;
            helperTextData["passwordHelperText"] =
              "Password should be more than 4 character.";
            validateFlag = false;
          }
        } else {
          errorData["confirmPasswordError"] = true;
          helperTextData["confirmPasswordHelperText"] =
            "Password did not match.";
          if (registrationData["password"].length >= 4) {
            errorData["passwordError"] = false;
            helperTextData["passwordHelperText"] = "";
          } else {
            errorData["passwordError"] = true;
            helperTextData["passwordHelperText"] =
              "Password should be more than 4 character.";
          }
          validateFlag = false;
        }

        if (
          registrationData["primaryMobileNo"] &&
          !validateMobileNo(registrationData["primaryMobileNo"])
        ) {
          errorData["primaryMobileNoError"] = true;
          helperTextData["primaryMobileNoHelperText"] =
            "Please enter a valid mobile no.";
          validateFlag = false;
        } else {
          errorData["primaryMobileNoError"] = false;
          helperTextData["primaryMobileNoHelperText"] = "";
        }

        registrationData.primaryFirstName =
          registrationData.primaryFirstName.trim();
        registrationData.primaryLastName =
          registrationData.primaryLastName.trim();
        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        return validateFlag;

      case 1:
        if (
          registrationData.alternateFirstName &&
          validateName(registrationData.alternateFirstName)
        ) {
          errorData["alternateFirstNameError"] = false;
          helperTextData["alternateFirstNameHelperText"] = "";
        } else if (registrationData.alternateFirstName.trim().length === 1) {
          errorData["alternateFirstNameError"] = true;
          helperTextData["alternateFirstNameHelperText"] =
            "Valid first name Contains 2-30 characters";
          validateFlag = false;
        } else if (parseInt(registrationData.alternateFirstName)) {
          errorData["alternateFirstNameError"] = true;
          helperTextData["alternateFirstNameHelperText"] =
            "Please enter a valid first name. Valid first name contains only alphabets ";
          validateFlag = false;
        }

        if (
          registrationData.alternateLastName &&
          validateName(registrationData.alternateLastName)
        ) {
          errorData["alternateLastNameError"] = false;
          helperTextData["alternateLastNameHelperText"] = "";
        } else if (registrationData.alternateLastName.trim().length === 1) {
          errorData["alternateLastNameError"] = true;
          helperTextData["alternateLastNameHelperText"] =
            "Valid last name Contains 2-30 characters";
          validateFlag = false;
        } else if (parseInt(registrationData.alternateLastName)) {
          errorData["alternateLastNameError"] = true;
          helperTextData["alternateLastNameHelperText"] =
            "Please enter a valid last name. Valid first name contains only alphabets ";
          validateFlag = false;
        }

        if (
          registrationData["alternateEmail"] &&
          !validateEmail(registrationData["alternateEmail"])
        ) {
          errorData["alternateEmailError"] = true;
          helperTextData["alternateEmailHelperText"] =
            "Please enter a valid email address.";
          validateFlag = false;
        } else {
          errorData["alternateEmailError"] = false;
          helperTextData["alternateEmailHelperText"] = "";
        }

        if (
          registrationData["alternateMobileNo"] &&
          !validateMobileNo(registrationData["alternateMobileNo"])
        ) {
          errorData["alternateMobileNoError"] = true;
          helperTextData["alternateMobileNoHelperText"] =
            "Please enter a valid mobile no.";
          validateFlag = false;
        } else {
          errorData["alternateMobileNoError"] = false;
          helperTextData["alternateMobileNoHelperText"] = "";
        }

        if (
          registrationData["alternateTelegramHandle"] &&
          !validateTelegram(registrationData["alternateTelegramHandle"])
        ) {
          errorData["alternateTelegramHandleError"] = true;
          helperTextData["alternateTelegramHandleHelperText"] =
            "Please enter a valid telegram URL.";
          validateFlag = false;
        } else {
          errorData["alternateTelegramHandleError"] = false;
          helperTextData["alternateTelegramHandleHelperText"] = "";
        }

        if (
          registrationData["alternateLinkedInProfile"] &&
          !validateLinkedIn(registrationData["alternateLinkedInProfile"])
        ) {
          errorData["alternateLinkedInProfileError"] = true;
          helperTextData["alternateLinkedInProfileHelperText"] =
            "Please enter a valid LinkedIn URL.";
          validateFlag = false;
        } else {
          errorData["alternateLinkedInProfileError"] = false;
          helperTextData["alternateLinkedInProfileHelperText"] = "";
        }

        registrationData.alternateFirstName = (
          registrationData.alternateFirstName || ""
        ).trim();
        registrationData.alternateLastName = (
          registrationData.alternateLastName || ""
        ).trim();
        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        return validateFlag;
      case 2:
        // if (ethValue.length === 0) {
        //   setIsEthValueError(true);
        //   validateFlag = false;
        // } else {
        //   setIsEthValueError(false);
        // }

        if (
          registrationData["twitterProfile"] &&
          !validateTwitter(registrationData["twitterProfile"])
        ) {
          errorData["twitterProfileError"] = true;
          helperTextData["twitterProfileHelperText"] =
            "Please enter a valid Twitter url";
          validateFlag = false;
        } else {
          errorData["twitterProfileError"] = false;
          helperTextData["twitterProfileHelperText"] = "";
        }

        if (
          registrationData["linkedInProfile"] &&
          !validateCompanyLinkedIn(registrationData["linkedInProfile"])
        ) {
          errorData["linkedInProfileError"] = true;
          helperTextData["linkedInProfileHelperText"] =
            "Please enter a valid LinkedIn URL.";
          validateFlag = false;
        } else {
          errorData["linkedInProfileError"] = false;
          helperTextData["linkedInProfileHelperText"] = "";
        }

        if (
          registrationData["borrowerCountry"] &&
          !validateName(registrationData["borrowerCountry"])
        ) {
          errorData["borrowerCountryError"] = true;
          helperTextData["borrowerCountryHelperText"] =
            "Please enter valid Country";
          validateFlag = false;
        } else {
          errorData["borrowerCountryError"] = false;
          helperTextData["borrowerCountryHelperText"] = "";
        }

        registrationData["borrowerCountry"] =
          registrationData["borrowerCountry"].trim();
        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });

        setFileUploadIncompleteFlag(false);
        if (!validateFlag) return validateFlag;

        return validateFlag;
    }
  };

  const prepareDataObj = () => {
    const formData = new FormData();
    const filesList = Object.entries(registrationData["companyLogo"]);
    filesList.forEach((file: any) =>
      formData.append(`companyLogo`, file[1], file[1].name)
    );
    formData.append("firstName", registrationData["primaryFirstName"]);
    formData.append("lastName", registrationData["primaryLastName"]);
    formData.append("email", registrationData["primaryEmail"]);
    formData.append("password", registrationData["password"]);
    formData.append("mobileNumber", registrationData["primaryMobileNo"]);

    if (registrationData["primaryTelegramHandle"])
      formData.append(
        "telegramHandle",
        registrationData["primaryTelegramHandle"]
      );
    if (registrationData["primaryLinkedInProfile"])
      formData.append(
        "linkedInHandle",
        registrationData["primaryLinkedInProfile"]
      );

    //alternate contact
    if (
      registrationData["alternateFirstName"] ||
      registrationData["alternateLastName"] ||
      registrationData["alternateEmail"] ||
      registrationData["alternateMobileNo"] ||
      registrationData["alternateTelegramHandle"] ||
      registrationData["alternateLinkedInProfile"]
    ) {
      if (registrationData["alternateFirstName"])
        formData.append(
          "alternateContact[firstName]",
          registrationData["alternateFirstName"]
        );
      if (registrationData["alternateLastName"])
        formData.append(
          "alternateContact[lastName]",
          registrationData["alternateLastName"]
        );
      if (registrationData["alternateEmail"])
        formData.append(
          "alternateContact[email]",
          registrationData["alternateEmail"]
        );
      if (registrationData["alternateMobileNo"])
        formData.append(
          "alternateContact[mobileNumber]",
          registrationData["alternateMobileNo"]
        );
      if (registrationData["alternateTelegramHandle"])
        formData.append(
          "alternateContact[telegramHandle]",
          registrationData["alternateTelegramHandle"]
        );
      if (registrationData["alternateLinkedInProfile"])
        formData.append(
          "alternateContact[linkedInHandle]",
          registrationData["alternateLinkedInProfile"]
        );
    }

    formData.append(
      "companyInformation[entityName]",
      registrationData["borrowerEntityName"]
    );
    if (registrationData["borrowerCountry"])
      formData.append(
        "companyInformation[country]",
        registrationData["borrowerCountry"]
      );
    formData.append(
      "companyInformation[companyDescription]",
      registrationData["companyDescription"]
    );
    if (registrationData["tradeName"])
      formData.append(
        "companyInformation[tradeName]",
        registrationData["tradeName"]
      );
    if (registrationData["ethAddress"])
      formData.append(
        "companyInformation[ethAddress]",
        registrationData["ethAddress"]
      );
    if (registrationData["industry"])
      formData.append(
        "companyInformation[industry]",
        registrationData["industry"]
      );
    if (registrationData["website"])
      formData.append(
        "companyInformation[website]",
        registrationData["website"]
      );
    if (registrationData["linkedInProfile"])
      formData.append(
        "companyInformation[linkedInProfile]",
        registrationData["linkedInProfile"]
      );
    if (registrationData["twitterProfile"])
      formData.append(
        "companyInformation[twitterProfile]",
        registrationData["twitterProfile"]
      );

    ethValue.map((val: any, key: number) =>
      formData.append(`companyInformation[ethAddresses][${key}]`, val.value)
    );

    return formData;
  };

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setTwoFactorAuthFlag(false);
    if (handleValidation()) {
      if (activeStep === tabs.length - 1) {
        dispatch(showLoading());
        const dataObj = prepareDataObj();
        try {
          const response = await signup(dataObj);
          setTwoFactorAuthFlag(true);
          setUserId(response?.id);
          setQrCodeUrl(response?.qrcode);
        } catch (err: any) {
          setToastFlag(true);
          setErrorMessage(
            err?.response?.data?.message || "Internal Server Error"
          );
        } finally {
          dispatch(hideLoading());
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const extensionSupported = {
    "image/svg+xml": 1,
    "image/png": 1,
    "image/jpeg": 1,
    "image/jpg": 1,
  } as any;
  const fileMaxSize = 25;
  const handleFileChange = (fileData: any) => {
    setErrorMessage("");
    setFileUploadIncompleteFlag(false);
    if (
      fileData.length &&
      extensionSupported[fileData[0].type] &&
      fileData[0].size <= fileMaxSize * 1000000
    ) {
      const registrationDataTemp = { ...registrationData };
      registrationDataTemp["companyLogo"] = fileData;
      setRegistrationData(registrationDataTemp);
      return;
    }
    setToastFlag(true);
    !extensionSupported[fileData[0].type]
      ? setErrorMessage(
        `Unsupported document is provided. Supported document formats are SVG, JPG, JPEG and PNG.`
      )
      : setErrorMessage(`File size should be less than ${fileMaxSize}MB`);
    resetCompanyLogo();
  };

  const resetCompanyLogo = () => {
    const registrationDataTemp = { ...registrationData };
    registrationDataTemp["companyLogo"] = {};
    setRegistrationData(registrationDataTemp);
  };

  const handleDeleteFile = () => resetCompanyLogo();

  const handleEndOutcome = () => {
    setItemInLocalStorage(TOKEN, loginTokens);
    setLoggedIn(true);
    history.push(DASHBOARD);
  };

  const handleTokenChange = (token: string) => {
    setToken(token);
  };

  const handleLoginTokenChange = (tokens: string) => {
    setLoginTokens(tokens);
  };

  return (
    <div className="signup_section login_section">
      <CssBaseline />
      <div className="container">
        <div className="sg_row">
        <div className="logo_section hid-desk">
              <div>                
                <img src={logo} alt="truefie" />
              </div>
            </div>
          <div className="sig_col_1">
            <div className="wrap">
            <div className="logo_section">
              <div>
                
                <img src={logo} alt="truefie" />
              </div>
            </div>
            <img src={sign_up} alt="sign_up" className="vectr-img" />
            </div>
          </div>
          <div className="sig_col_2">
            <div className="login_form">
              <div className={classes.paper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  style={{ padding: "0 10px" }}
                >
                  Sign Up
                </Typography>
                {twoFactorAuthFlag ? (
                  <>
                    <TwoFactorAuth
                      handleLoginTokenChange={handleLoginTokenChange}
                      userEmail={registrationData["primaryEmail"]}
                      qrCode={qrCodeUrl}
                      userId={userId}
                      token={token}
                      tokenChangeHandler={handleTokenChange}
                      handleEndOutcome={handleEndOutcome}
                    />
                    <Link to={LOGIN} className={classes.link}>
                      Already have an account? Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    <Typography gutterBottom>
                      Please fill out the fields listed below. Note that any fields left
                      intentionally blank may have impact on your credit score.
                    </Typography>
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      style={{ width: "100%" }}
                    >
                      {tabs.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <form className={classes.form} onSubmit={handleSubmit}>
                      {formFields[activeStep].map((field: any, index) =>
                        field.type === "file" ? (
                          <React.Fragment key={index}>
                            <FileUploadWithDragDrop
                              handleChange={handleFileChange}
                              handleDelete={handleDeleteFile}
                              fileData={registrationData}
                            />
                            {fileUploadIncompleteFlag && (
                              <p style={{ color: "red" }}>{errorMessage}</p>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment key={index}>
                            {field.name === "ethAddresses" ? (
                              <div>
                                <MultiInput
                                  label={field.label}
                                  className={classes.field}
                                  value={ethValue}
                                  setValue={setEthValue}
                                />
                                <div></div>
                              </div>
                            ) : (
                              <TextField
                                value={field.value}
                                type={field.type}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                  handleChange(e, field.name)
                                }
                                variant="outlined"
                                margin="normal"
                                required={field.required}
                                fullWidth
                                label={field.label}
                                className={classes.field}
                                {...(field.errorFlag && {
                                  error: true,
                                  helperText: field.helperText,
                                })}
                              />
                            )}
                            {field.type === "tel" && (
                              <span className="MuiTypography-caption col-6 mg-l-auto insta">e.g: +00-00000000, Country code is required.</span>
                              // <Typography
                              //   variant="caption"
                              //   display="block"
                              //   gutterBottom

                              //   style={{
                              //     color: "#9c9c9c",
                              //     textAlign: "left",
                              //     paddingLeft: "30px",
                              //   }}
                              // >
                                
                              // </Typography>
                            )}
                            {(field.name === "primaryTelegramHandle" ||
                              field.name === "alternateTelegramHandle") && (
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    color: "#9c9c9c",
                                    textAlign: "left",
                                    paddingLeft: "30px",
                                  }}
                                >
                                  e.g: https://t.me/userName OR http://t.me/userName OR
                                  @userName
                                </Typography>
                              )}
                            {(field.name === "primaryLinkedInProfile" ||
                              field.name === "alternateLinkedInProfile") && (
                                <span className="insta">e.g: https://linkedin.com/in/userName OR
                                https://www.linkedin.com/in/userName OR
                                https://linkedin.com/m/in/userName OR
                                https://linkedin.com/mwlite/in/userName.</span>
                                // <Typography
                                //   variant="caption"
                                //   display="block"
                                //   gutterBottom
                                //   style={{
                                //     color: "#9c9c9c",
                                //     textAlign: "left",
                                //     paddingLeft: "30px",
                                //   }}
                                // >
                                  
                                // </Typography>
                              )}
                            {field.name === "linkedInProfile" && (
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  color: "#9c9c9c",
                                  textAlign: "left",
                                  paddingLeft: "30px",
                                }}
                              >
                                e.g: https://linkedin.com/company/companyName OR
                                https://www.linkedin.com/company/companyName
                              </Typography>
                            )}
                            {field.name === "twitterProfile" && (
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  color: "#9c9c9c",
                                  textAlign: "left",
                                  paddingLeft: "30px",
                                }}
                              >
                                e.g: https://twitter.com/username
                              </Typography>
                            )}
                          </React.Fragment>
                        )
                      )}
                      <div className={classes.submit}>
                        <Button
                          disabled={activeStep === 0}
                          variant="contained"
                          color="primary"
                          onClick={(e) =>
                            setActiveStep((prevActiveStep) => prevActiveStep - 1)
                          }
                          style={{ marginRight: "40px" }}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "0px" }}
                        >
                          {activeStep === tabs.length - 1 ? "Sign Up" : "Next"}
                        </Button>
                      </div>
                      <Link to={LOGIN} className={classes.link}>
                        Already have an account? Sign in
                      </Link>
                    </form>
                  </>
                )}
                <Box mt={2}>
                  <Copyright />
                </Box>
                <Snackbar
                  autoHideDuration={5 * 1000}
                  open={toastFlag}
                  message={errorMessage}
                  onClose={() => setToastFlag(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
