import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../reducers/loaderSlice';
import { setStatus } from '../../reducers/useStatusSlice';
import {
  Grid,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Card,
  CardContent,
  Divider,
  StepButton,
  CardHeader,
} from '@material-ui/core';

import { LooseObjectInterface } from '../../interfaces/LooseObjectInterface';
import {
  SignUpErrorDataInterface,
  SignUpHelperTextDataInterface,
} from '../../interfaces/SignupInterface';
import { ProfileDataInterface } from '../../interfaces/ProfileInterface';
import { getUserProfile, updateUserProfile } from '../../services/Api/profile';
import Summary from '../Summary';
import { QUESTIONS } from '../../constants/routes';
import FileUploadWithDragDrop from '../FileUploadWithDragDrop';
import {
  validateName,
  validateEmail,
  validateMobileNo,
  validateTelegram,
  validateLinkedIn,
  validateTwitter,
  validateCompanyLinkedIn,
} from '../../utils';
import MultiInput from '../../components/MultiInput';
import DialogBox from '../../components/DialogBox';

// import { Chart } from 'react-charts';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '50px',
  },
  cardroot: {
    marginBottom: '20px',
    boxShadow: 'none',
    border: '1px solid #ccc',
  },
  subGridLeft: {
    paddingRight: '60px',
  },
  stepperStyle: {
    width: '100%',
  },
  btn: {
    marginRight: '40px',
  },
  cardStyle: { minHeight: 545 },
  cardContentDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& strong': {
      fontWeight: 500,
    },
  },
  cardcontent: {
    padding: '5px',
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignSelf: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
    '&:active': {
      color: '#3f51b5',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  field: {
    width: '90%',
  },
  table: {
    minWidth: 650,
  },
  bgcolor: {
    backgroundColor: 'rgb(248, 249, 251)',
    color: 'black',
  },
  ethAddWrapper: {
    border: '1px solid #c4c4c4',
    marginTop: '15px',
    width: '90%',
    marginLeft: '5%',
    borderRadius: '5px',
  },
}));

type ProfileProps = {
  setCompanyLogoUrl: React.Dispatch<React.SetStateAction<string>>;
};

const Profile: React.FC<ProfileProps> = (props): JSX.Element => {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobileNumber: '',
      telegramHandle: '',
      linkedInHandle: '',
      status: '',
      alternateContact: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        telegramHandle: '',
        linkedInHandle: '',
      },
      companyInformation: {
        entityName: '',
        tradeName: '',
        country: '',
        ethAddress: '',
        ethAddresses: [],
        industry: '',
        website: '',
        linkedInProfile: '',
        twitterProfile: '',
        companyDescription: '',
        logoUrl: '',
      },
    },
    isSubmissionExists: false,
  } as ProfileDataInterface);

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
    alternateTelegramHandleError: false,
    alternateLinkedInProfileError: false,
    // borrowerEntityNameError: false,
    // tradeNameError: false,
    borrowerCountryError: false,
    // ethAddressError: false,
    industryError: false,
    // websiteError: false,
    linkedInProfileError: false,
    twitterProfileError: false,
  });

  const [helperTextFields, setHelperTextFields] = useState({
    primaryFirstNameHelperText: '',
    primaryLastNameHelperText: '',
    primaryMobileNoHelperText: '',
    primaryEmailHelperText: '',
    primaryTelegramHandleHelperText: '',
    primaryLinkedInProfileHelperText: '',
    passwordHelperText: '',
    confirmPasswordHelperText: '',
    alternateFirstNameHelperText: '',
    alternateLastNameHelperText: '',
    alternateMobileNoHelperText: '',
    alternateEmailHelperText: '',
    alternateTelegramHandleHelperText: '',
    alternateLinkedInProfileHelperText: '',
    // borrowerEntityNameHelperText: '',
    // tradeNameHelperText: '',
    borrowerCountryHelperText: '',
    // ethAddressHelperText: '',
    industryHelperText: '',
    // websiteHelperText: '',
    linkedInProfileHelperText: '',
    twitterProfileHelperText: '',
  });

  const [fileData, setFileData] = useState({ companyLogo: {} }) as any;
  const [toastFlag, setToastFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [primaryEth, setPrimaryEth] = useState() as any;
  const [editableEthAddress, setEditableEthAddress] = useState([]);
  const [isPrimaryEthChanged, setIsPrimaryEthChanged] = useState(false);

  const formFields = [
    [
      {
        value: userData?.profile?.firstName,
        type: 'text',
        label: 'First Name',
        required: true,
        name: 'firstName',
        needTooltip: false,
        errorFlag: errorFields.primaryFirstNameError,
        helperText: helperTextFields.primaryFirstNameHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.lastName,
        type: 'text',
        label: 'Last Name',
        required: true,
        name: 'lastName',
        needTooltip: false,
        errorFlag: errorFields.primaryLastNameError,
        helperText: helperTextFields.primaryLastNameHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.email,
        type: 'email',
        label: 'Email Address',
        required: true,
        name: 'email',
        needTooltip: false,
        errorFlag: errorFields.primaryEmailError,
        helperText: helperTextFields.primaryEmailHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.mobileNumber,
        type: 'tel',
        label: 'Mobile Number',
        required: false,
        name: 'mobileNumber',
        needTooltip: false,
        errorFlag: errorFields.primaryMobileNoError,
        helperText: helperTextFields.primaryMobileNoHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.telegramHandle,
        type: 'text',
        label: 'Telegram Handle',
        required: false,
        name: 'telegramHandle',
        needTooltip: false,
        errorFlag: errorFields.primaryTelegramHandleError,
        helperText: helperTextFields.primaryTelegramHandleHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.linkedInHandle,
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'linkedInHandle',
        needTooltip: false,
        errorFlag: errorFields.primaryLinkedInProfileError,
        helperText: helperTextFields.primaryLinkedInProfileHelperText,
        disabled: false,
      },
    ],
    [
      {
        value: userData?.profile?.alternateContact?.firstName || '',
        type: 'text',
        label: 'First Name',
        required: false,
        name: 'firstName',
        needTooltip: false,
        errorFlag: errorFields.alternateFirstNameError,
        helperText: helperTextFields.alternateFirstNameHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.alternateContact?.lastName || '',
        type: 'text',
        label: 'Last Name',
        required: false,
        name: 'lastName',
        needTooltip: false,
        errorFlag: errorFields.alternateLastNameError,
        helperText: helperTextFields.alternateLastNameHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.alternateContact?.email || '',
        type: 'email',
        label: 'Email Address',
        required: false,
        name: 'email',
        needTooltip: false,
        errorFlag: errorFields.alternateEmailError,
        helperText: helperTextFields.alternateEmailHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.alternateContact?.mobileNumber || '',
        type: 'tel',
        label: 'Mobile Number',
        required: false,
        name: 'mobileNumber',
        needTooltip: false,
        errorFlag: errorFields.alternateMobileNoError,
        helperText: helperTextFields.alternateMobileNoHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.alternateContact?.telegramHandle || '',
        type: 'text',
        label: 'Telegram Handle',
        required: false,
        name: 'telegramHandle',
        needTooltip: false,
        errorFlag: errorFields.alternateTelegramHandleError,
        helperText: helperTextFields.alternateTelegramHandleHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.alternateContact?.linkedInHandle || '',
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'linkedInHandle',
        needTooltip: false,
        errorFlag: errorFields.alternateLinkedInProfileError,
        helperText: helperTextFields.alternateLinkedInProfileHelperText,
        disabled: false,
      },
    ],
    [
      {
        value: userData?.profile?.companyInformation?.entityName,
        type: 'text',
        label: 'Borrower Entity Name',
        required: false,
        name: 'entityName',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.tradeName || '',
        type: 'text',
        label: 'Trade Name/DBA',
        required: false,
        name: 'tradeName',
        needTooltip: true,
        toolTipNote: 'Informal business name  for commercial purposes.',
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.country,
        type: 'text',
        label: 'Borrower Country',
        required: true,
        name: 'country',
        needTooltip: false,
        toolTipNote:
          'This field is not editable, it is populated by response from question in the attestation.',
        errorFlag: errorFields.borrowerCountryError,
        helperText: helperTextFields.borrowerCountryHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.ethAddress || '',
        type: 'text',
        label: 'Primary ETH Address',
        required: false,
        name: 'ethAddress',
        needTooltip: true,
        toolTipNote:
          'ETH Address associated with your on-chain credit score. Please note changing this address may negatively impact your credit score.',
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.ethAddresses || [],
        type: 'text',
        label: 'ETH Addresses',
        required: false,
        name: 'ethAddresses',
        needTooltip: true,
        toolTipNote:
          'ETH Address associated with your on-chain credit score. Please note changing this address may negatively impact your credit score.',
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.industry || '',
        type: 'text',
        label: 'Industry',
        required: false,
        name: 'industry',
        needTooltip: false,
        toolTipNote:
          'This field is not editable, it is populated by response from question in the attestation.',
        errorFlag: errorFields.industryError,
        helperText: helperTextFields.industryHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.website || '',
        type: 'url',
        label: 'Website',
        required: false,
        name: 'website',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.linkedInProfile || '',
        type: 'url',
        label: 'LinkedIn Profile',
        required: false,
        name: 'linkedInProfile',
        needTooltip: false,
        errorFlag: errorFields.linkedInProfileError,
        helperText: helperTextFields.linkedInProfileHelperText,
        disabled: false,
      },
      {
        value: userData?.profile?.companyInformation?.twitterProfile || '',
        type: 'url',
        label: 'Twitter Profile',
        required: false,
        name: 'twitterProfile',
        needTooltip: false,
        disabled: false,
        errorFlag: errorFields.twitterProfileError,
        helperText: helperTextFields.twitterProfileHelperText,
      },
      {
        value: userData?.profile?.companyInformation?.companyDescription || '',
        type: 'text',
        label: 'Company Description',
        required: false,
        name: 'companyDescription',
        needTooltip: false,
        errorFlag: false,
        disabled: false,
      },
      {
        type: 'file',
        label: 'Company Logo',
        required: true,
        name: 'companyLogo',
        value: fileData.companyLogo,
      },
    ],
  ];

  const history = useHistory();
  const dispatch = useDispatch();

  const tabs = ['Primary Contact', 'Alternate Contact', 'Company Information'];

  const fetchUserProfile = async (): Promise<void> => {
    dispatch(showLoading());
    try {
      const res = await getUserProfile();
      props.setCompanyLogoUrl(res?.profile?.companyInformation?.logoUrl || '');
      dispatch(setStatus(res?.profile?.status || 'inactive'));
      setUserData(res);
      let tempEthAddress: any = [];
      res?.ethAddressesDetails?.forEach((add: any) => {
        if (add.isEditable) {
          tempEthAddress.push({ label: add.ethAddress, value: add.ethAddress });
        }
      });
      setEditableEthAddress(tempEthAddress);
      setPrimaryEth(res?.profile?.companyInformation?.ethAddress);
    } catch (err) {
      console.log(err);
    }
    dispatch(hideLoading());
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line
  }, []);

  const handlePrimaryEthChange = (event: any) => {
    setIsPrimaryEthChanged(true);
    setPrimaryEth(event.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const data = { ...userData } as unknown as LooseObjectInterface;
    switch (activeStep) {
      case 0:
        data['profile'][name] = e.target.value.trimLeft();
        break;
      case 1:
        data['profile']['alternateContact'][name] = e.target.value.trimLeft();
        break;
      case 2:
        data['profile']['companyInformation'][name] = e.target.value.trimLeft();
        break;
    }
    setUserData({ ...(data as unknown as ProfileDataInterface) });
  };

  const handleValidation = () => {
    let validateFlag = true;
    let errorData = { ...errorFields } as LooseObjectInterface;
    let helperTextData = { ...helperTextFields } as LooseObjectInterface;

    switch (activeStep) {
      case 0:
        if (validateName(userData['profile']['firstName'])) {
          errorData['primaryFirstNameError'] = false;
          helperTextData['primaryFirstNameHelperText'] = '';
        } else if (userData['profile']['firstName'].trim().length === 1) {
          errorData['primaryFirstNameError'] = true;
          helperTextData['primaryFirstNameHelperText'] =
            'Valid first name contains 2-30 characters';
          validateFlag = false;
        } else {
          errorData['primaryFirstNameError'] = true;
          helperTextData['primaryFirstNameHelperText'] =
            'Please enter a valid first name. Valid first name contains only alphabets';
          validateFlag = false;
        }

        if (validateName(userData['profile']['lastName'])) {
          errorData['primaryLastNameError'] = false;
          helperTextData['primaryLastNameHelperText'] = '';
        } else if (userData['profile']['lastName'].trim().length === 1) {
          errorData['primaryLastNameError'] = true;
          helperTextData['primaryLastNameHelperText'] =
            'Valid last name contains 2-30 characters';
          validateFlag = false;
        } else {
          errorData['primaryLastNameError'] = true;
          helperTextData['primaryLastNameHelperText'] =
            'Please enter a valid last name. Valid last name contains only alphabets';
          validateFlag = false;
        }

        if (validateEmail(userData['profile']['email'])) {
          errorData['primaryEmailError'] = false;
          helperTextData['primaryEmailHelperText'] = '';
        } else {
          errorData['primaryEmailError'] = true;
          helperTextData['primaryEmailHelperText'] =
            'Please enter a valid email address.';
          validateFlag = false;
        }

        if (
          userData['profile']['mobileNumber'] &&
          !validateMobileNo(userData['profile']['mobileNumber'])
        ) {
          errorData['primaryMobileNoError'] = true;
          helperTextData['primaryMobileNoHelperText'] =
            'Please enter a valid mobile no.';
          validateFlag = false;
        } else {
          errorData['primaryMobileNoError'] = false;
          helperTextData['primaryMobileNoHelperText'] = '';
        }

        if (
          userData['profile']['telegramHandle'] &&
          !validateTelegram(userData['profile']['telegramHandle'])
        ) {
          errorData['primaryTelegramHandleError'] = true;
          helperTextData['primaryTelegramHandleHelperText'] =
            'Please enter a valid telegram URL.';
          validateFlag = false;
        } else {
          errorData['primaryTelegramHandleError'] = false;
          helperTextData['primaryTelegramHandleHelperText'] = '';
        }

        if (
          userData['profile']['linkedInHandle'] &&
          !validateLinkedIn(userData['profile']['linkedInHandle'])
        ) {
          errorData['primaryLinkedInProfileError'] = true;
          helperTextData['primaryLinkedInProfileHelperText'] =
            'Please enter a valid LinkedIn URL.';
          validateFlag = false;
        } else {
          errorData['primaryLinkedInProfileError'] = false;
          helperTextData['primaryLinkedInProfileHelperText'] = '';
        }

        userData['profile']['firstName'] =
          userData['profile']['firstName'].trim();
        userData['profile']['lastName'] =
          userData['profile']['lastName'].trim();

        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        return validateFlag;

      case 1:
        if (
          validateName(userData.profile.alternateContact.firstName || '') ||
          !userData.profile.alternateContact.firstName
        ) {
          errorData['alternateFirstNameError'] = false;
          helperTextData['alternateFirstNameHelperText'] = '';
        } else if (
          userData.profile.alternateContact.firstName &&
          userData.profile.alternateContact.firstName.trim().length === 1
        ) {
          errorData['alternateFirstNameError'] = true;
          helperTextData['alternateFirstNameHelperText'] =
            'Valid first name contains 2-30 characters';
          validateFlag = false;
        } else {
          errorData['alternateFirstNameError'] = true;
          helperTextData['alternateFirstNameHelperText'] =
            'Please enter a valid first name. Valid first name contains only alphabets';
          validateFlag = false;
        }

        if (
          validateName(userData.profile.alternateContact.lastName || '') ||
          !userData.profile.alternateContact.lastName
        ) {
          errorData['alternateLastNameError'] = false;
          helperTextData['alternateLastNameHelperText'] = '';
        } else if (
          userData.profile.alternateContact.lastName &&
          userData.profile.alternateContact.lastName.trim().length === 1
        ) {
          errorData['alternateLastNameError'] = true;
          helperTextData['alternateLastNameHelperText'] =
            'Valid last name contains 2-30 characters';
          validateFlag = false;
        } else {
          errorData['alternateLastNameError'] = true;
          helperTextData['alternateLastNameHelperText'] =
            'Please enter a valid last name. Valid  name contains only alphabets';
          validateFlag = false;
        }

        if (
          userData.profile.alternateContact.email &&
          !validateEmail(userData.profile.alternateContact.email)
        ) {
          errorData['alternateEmailError'] = true;
          helperTextData['alternateEmailHelperText'] =
            'Please enter a valid email address.';
          validateFlag = false;
        } else {
          errorData['alternateEmailError'] = false;
          helperTextData['alternateEmailHelperText'] = '';
        }

        if (
          userData.profile.alternateContact.mobileNumber &&
          !validateMobileNo(userData.profile.alternateContact.mobileNumber)
        ) {
          errorData['alternateMobileNoError'] = true;
          helperTextData['alternateMobileNoHelperText'] =
            'Please enter a valid mobile no.';
          validateFlag = false;
        } else {
          errorData['alternateMobileNoError'] = false;
          helperTextData['alternateMobileNoHelperText'] = '';
        }

        if (
          userData.profile.alternateContact.telegramHandle &&
          !validateTelegram(userData.profile.alternateContact.telegramHandle)
        ) {
          errorData['alternateTelegramHandleError'] = true;
          helperTextData['alternateTelegramHandleHelperText'] =
            'Please enter a valid telegram URL.';
          validateFlag = false;
        } else {
          errorData['alternateTelegramHandleError'] = false;
          helperTextData['alternateTelegramHandleHelperText'] = '';
        }

        if (
          userData.profile.alternateContact.linkedInHandle &&
          !validateLinkedIn(userData.profile.alternateContact.linkedInHandle)
        ) {
          errorData['alternateLinkedInProfileError'] = true;
          helperTextData['alternateLinkedInProfileHelperText'] =
            'Please enter a valid LinkedIn URL.';
          validateFlag = false;
        } else {
          errorData['alternateLinkedInProfileError'] = false;
          helperTextData['alternateLinkedInProfileHelperText'] = '';
        }

        userData['profile']['alternateContact']['firstName'] = (
          userData['profile']['alternateContact']['firstName'] || ''
        ).trim();
        userData['profile']['alternateContact']['lastName'] = (
          userData['profile']['alternateContact']['lastName'] || ''
        ).trim();

        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        return validateFlag;

      case 2:
        if (
          userData.profile.companyInformation.twitterProfile &&
          !validateTwitter(userData.profile.companyInformation.twitterProfile)
        ) {
          errorData['twitterProfileError'] = true;
          helperTextData['twitterProfileHelperText'] =
            'Please enter a valid Twitter url';
          validateFlag = false;
        } else {
          errorData['twitterProfileError'] = false;
          helperTextData['twitterProfileHelperText'] = '';
        }
        if (
          userData.profile.companyInformation.linkedInProfile &&
          !validateCompanyLinkedIn(
            userData.profile.companyInformation.linkedInProfile
          )
        ) {
          errorData['linkedInProfileError'] = true;
          helperTextData['linkedInProfileHelperText'] =
            'Please enter a valid LinkedIn URL.';
          validateFlag = false;
        } else {
          errorData['linkedInProfileError'] = false;
          helperTextData['linkedInProfileHelperText'] = '';
        }

        if (
          userData.profile.companyInformation.country &&
          !validateName(userData.profile.companyInformation.country)
        ) {
          errorData['borrowerCountryError'] = true;
          helperTextData['borrowerCountryHelperText'] =
            'Please enter valid Country name';
          validateFlag = false;
        } else {
          errorData['linkedInProfileError'] = false;
          helperTextData['linkedInProfileHelperText'] = '';
        }

        setErrorFields({
          ...(errorData as unknown as SignUpErrorDataInterface),
        });
        setHelperTextFields({
          ...(helperTextData as unknown as SignUpHelperTextDataInterface),
        });
        userData.profile.companyInformation.country =
          userData.profile.companyInformation.country.trim();
        return validateFlag;
    }
  };

  const prepareDataObj = () => {
    const formData = new FormData();
    const filesList = Object.entries(fileData['companyLogo']);
    filesList.forEach((file: any) =>
      formData.append(`companyLogo`, file[1], file[1].name)
    );
    if (userData?.profile?.firstName)
      formData.append('firstName', userData?.profile?.firstName);
    if (userData?.profile?.lastName)
      formData.append('lastName', userData?.profile?.lastName);
    if (userData?.profile?.email)
      formData.append('email', userData?.profile?.email);
    if (userData?.profile?.password)
      formData.append('password', userData?.profile?.password);
    if (userData?.profile?.mobileNumber)
      formData.append('mobileNumber', userData?.profile?.mobileNumber);

    if (userData?.profile?.telegramHandle)
      formData.append('telegramHandle', userData?.profile?.telegramHandle);
    if (userData?.profile?.linkedInHandle)
      formData.append('linkedInHandle', userData?.profile?.linkedInHandle);

    //alternate contact
    if (
      userData?.profile?.alternateContact?.firstName ||
      userData?.profile?.alternateContact?.lastName ||
      userData?.profile?.alternateContact?.email ||
      userData?.profile?.alternateContact?.mobileNumber ||
      userData?.profile?.alternateContact?.telegramHandle ||
      userData?.profile?.alternateContact?.linkedInHandle
    ) {
      if (userData?.profile?.alternateContact?.firstName)
        formData.append(
          'alternateContact[firstName]',
          userData?.profile?.alternateContact?.firstName
        );
      if (userData?.profile?.alternateContact?.lastName)
        formData.append(
          'alternateContact[lastName]',
          userData?.profile?.alternateContact?.lastName
        );
      if (userData?.profile?.alternateContact?.email)
        formData.append(
          'alternateContact[email]',
          userData?.profile?.alternateContact?.email
        );
      if (userData?.profile?.alternateContact?.mobileNumber)
        formData.append(
          'alternateContact[mobileNumber]',
          userData?.profile?.alternateContact?.mobileNumber
        );
      if (userData?.profile?.alternateContact?.telegramHandle)
        formData.append(
          'alternateContact[telegramHandle]',
          userData?.profile?.alternateContact?.telegramHandle
        );
      if (userData?.profile?.alternateContact?.linkedInHandle)
        formData.append(
          'alternateContact[linkedInHandle]',
          userData?.profile?.alternateContact?.linkedInHandle
        );
    }

    if (userData?.profile?.companyInformation?.entityName)
      formData.append(
        'companyInformation[entityName]',
        userData?.profile?.companyInformation?.entityName
      );
    if (userData?.profile?.companyInformation?.country)
      formData.append(
        'companyInformation[country]',
        userData?.profile?.companyInformation?.country
      );
    formData.append(
      'companyInformation[companyDescription]',
      userData?.profile?.companyInformation?.companyDescription || ''
    );
    if (userData?.profile?.companyInformation?.tradeName)
      formData.append(
        'companyInformation[tradeName]',
        userData?.profile?.companyInformation?.tradeName
      );
    if (primaryEth)
      formData.append('companyInformation[ethAddress]', primaryEth);
    if (userData?.profile?.companyInformation?.industry)
      formData.append(
        'companyInformation[industry]',
        userData?.profile?.companyInformation?.industry
      );
    if (userData?.profile?.companyInformation?.website)
      formData.append(
        'companyInformation[website]',
        userData?.profile?.companyInformation?.website
      );
    if (userData?.profile?.companyInformation?.linkedInProfile)
      formData.append(
        'companyInformation[linkedInProfile]',
        userData?.profile?.companyInformation?.linkedInProfile
      );
    if (userData?.profile?.companyInformation?.twitterProfile)
      formData.append(
        'companyInformation[twitterProfile]',
        userData?.profile?.companyInformation?.twitterProfile
      );
    if (userData?.profile?.companyInformation?.ethAddresses) {
      const ethArray = [
        ...(userData?.ethAddressesDetails || [])
          .filter((val: any) => val.isEditable !== true)
          .map((val: any) => val.ethAddress),
        ...editableEthAddress.map((val: any) => val.value),
      ];
      const uniqueEthArray = ethArray.filter(
        (c, index) => ethArray.indexOf(c) === index
      );
      uniqueEthArray.map((val: any, key: number) =>
        formData.append(`companyInformation[ethAddresses][${key}]`, val)
      );
    }

    return formData;
  };

  const handleSave = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (handleValidation()) {
      // if (activeStep === tabs.length - 1) {
      dispatch(showLoading());
      try {
        const formDataObj = prepareDataObj();
        await updateUserProfile(formDataObj);
        fetchUserProfile();
        setFileData({ companyLogo: {} });
        setIsEdit(false);
        setActiveStep(0);
      } catch (err: any) {
        setToastFlag(true);
        setErrorMessage(
          err?.response?.data?.message || 'Internal Server Error'
        );
      } finally {
        dispatch(hideLoading());
      }
      // } else {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
    }
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleDialogueClose = () => {
    setIsPrimaryEthChanged(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setActiveStep(0);
    fetchUserProfile();
  };

  const extensionSupported = {
    'image/svg+xml': 1,
    'image/png': 1,
    'image/jpeg': 1,
  } as any;
  const fileMaxSize = 25;
  const handleFileChange = (fileData: any) => {
    setErrorMessage('');
    if (
      fileData.length &&
      extensionSupported[fileData[0].type] &&
      fileData[0].size <= fileMaxSize * 1000000
    ) {
      setFileData({ companyLogo: fileData });
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
    setFileData({ companyLogo: {} });
  };

  const handleDeleteFile = () => resetCompanyLogo();

  const ethArray = [
    ...(userData?.profile?.companyInformation?.ethAddresses || []),
    ...editableEthAddress.map((val: any) => val.value),
  ];
  const uniqueEthArray = ethArray.filter(
    (c, index) => ethArray.indexOf(c) === index
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6} lg={6} className={classes.subGridLeft}>
        <Summary />
        <br />
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => history.push(QUESTIONS)}
        >
          {userData.isSubmissionExists
            ? 'Complete existing attestation'
            : 'Start new attestation'}
        </Button>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        {isEdit ? (
          <div className={classes.paper}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              nonLinear
              className={classes.stepperStyle}
            >
              {tabs.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={handleStep(index)}>
                    <StepLabel>{label}</StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <form className={classes.form} onSubmit={handleSave}>
              {formFields[activeStep].map((field: any, index) =>
                field.needTooltip ? (
                  <>
                    {!(
                      field.name === 'ethAddress' ||
                      field.name === 'ethAddresses'
                    ) && (
                      <Tooltip title={field.toolTipNote || ''}>
                        <TextField
                          value={field.value}
                          type={field.type}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, field.name)
                          }
                          variant='outlined'
                          margin='normal'
                          required={field.required}
                          fullWidth
                          label={field.label}
                          disabled={field.disabled}
                          className={classes.field}
                          {...(field.errorFlag && {
                            error: true,
                            helperText: field.helperText,
                          })}
                        />
                      </Tooltip>
                    )}
                    {field.name === 'ethAddress' && (
                      <FormControl variant='outlined' className={classes.field} style={{marginTop:'10px'}}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          style={{ textAlign: 'left' }}
                          value={primaryEth}
                          onChange={handlePrimaryEthChange}
                          label={field.label}
                          disabled={uniqueEthArray.length === 0}
                        >
                          {uniqueEthArray.map((val: string) => (
                            <MenuItem
                              value={val}
                              selected={
                                val ===
                                userData?.profile?.companyInformation
                                  ?.ethAddress
                              }
                            >
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {field.name === 'ethAddresses' && (
                      <div className={classes.ethAddWrapper}>
                        {userData?.ethAddressesDetails
                          .filter((val: any) => val.isEditable !== true)
                          .map((val: any) => (
                            <div
                              style={{
                                marginTop: '5px',
                                color: '#7f7f87',
                                textAlign: 'left',
                                paddingLeft: '20px',
                                paddingTop: '5px',
                              }}
                            >
                              {val.ethAddress}
                            </div>
                          ))}
                        <MultiInput
                          label={field.label}
                          className={classes.field}
                          value={editableEthAddress}
                          setValue={setEditableEthAddress}
                        />
                      </div>
                    )}
                  </>
                ) : field.type === 'file' ? (
                  <React.Fragment key={index}>
                    <FileUploadWithDragDrop
                      fileData={fileData}
                      handleChange={handleFileChange}
                      handleDelete={handleDeleteFile}
                    />
                  </React.Fragment>
                ) : (
                  <>
                    <TextField
                      value={field.value || ''}
                      type={field.type}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, field.name)
                      }
                      variant='outlined'
                      margin='normal'
                      required={field.required}
                      fullWidth
                      label={field.label}
                      disabled={field.disabled}
                      className={classes.field}
                      {...(field.errorFlag && {
                        error: true,
                        helperText: field.helperText,
                      })}
                    />
                    {field.type === 'tel' && (
                      <Typography
                        variant='caption'
                        display='block'
                        gutterBottom
                        style={{
                          color: '#9c9c9c',
                          textAlign: 'left',
                          paddingLeft: '5%',
                        }}
                      >
                        e.g: +00-00000000, Country code is required.
                      </Typography>
                    )}
                    {field.name === 'telegramHandle' && (
                      <Typography
                        variant='caption'
                        display='block'
                        gutterBottom
                        style={{
                          color: '#9c9c9c',
                          textAlign: 'left',
                          paddingLeft: '5%',
                        }}
                      >
                        e.g: https://t.me/userName OR http://t.me/userName OR
                        @userName
                      </Typography>
                    )}
                    {field.name === 'linkedInHandle' && (
                      <Typography
                        variant='caption'
                        display='block'
                        gutterBottom
                        style={{
                          color: '#9c9c9c',
                          textAlign: 'left',
                          paddingLeft: '5%',
                        }}
                      >
                        e.g: https://linkedin.com/in/userName OR
                        https://www.linkedin.com/in/userName OR
                        https://linkedin.com/m/in/userName OR
                        https://linkedin.com/mwlite/in/userName.
                      </Typography>
                    )}
                    {field.name === 'linkedInProfile' && (
                      <Typography
                        variant='caption'
                        display='block'
                        gutterBottom
                        style={{
                          color: '#9c9c9c',
                          textAlign: 'left',
                          paddingLeft: '5%',
                        }}
                      >
                        e.g: https://linkedin.com/company/companyName OR
                        https://www.linkedin.com/company/companyName
                      </Typography>
                    )}
                    {field.name === 'twitterProfile' && (
                      <Typography
                        variant='caption'
                        display='block'
                        gutterBottom
                        style={{
                          color: '#9c9c9c',
                          textAlign: 'left',
                          paddingLeft: '5%',
                        }}
                      >
                        e.g: https://twitter.com/username
                      </Typography>
                    )}
                  </>
                )
              )}
              <div className={classes.submit}>
                {/* <Button
                  disabled={activeStep === 0}
                  variant='contained'
                  color='primary'
                  onClick={(e) => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                  className={classes.btn}
                >
                  Back
                </Button> */}
                {/* <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.btn}
                >
                  {activeStep === tabs.length - 1 ? 'Save' : 'Next'}
                </Button> */}
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.btn}
                >
                  Save
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleCancel}
                  style={{ marginRight: '40px' }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Card className={classes.cardroot}>
              <CardHeader
                title='Company Information'
                className={classes.bgcolor}
              />
              <CardContent className={classes.cardcontent}>
                <div style={{ marginBottom: '-25px' }}>
                  {formFields[2].map((field: any, index) => (
                    <div key={index}>
                      <div className={classes.cardContentDiv}>
                        <p style={{ paddingLeft: '8px', textAlign: 'left' }}>
                          <strong>{field.label}</strong>
                        </p>
                        {field.type === 'file' ? (
                          <Avatar
                            src={
                              userData?.profile?.companyInformation?.logoUrl ||
                              ''
                            }
                            alt='Company Logo'
                          />
                        ) : (
                          <>
                            {field.name === 'ethAddresses' ? (
                              <div style={{ padding: '12px 0' }}>
                                {field.value.map((val: string) => (
                                  <div
                                    style={{
                                      paddingRight: '8px',
                                      textAlign: 'right',
                                      wordBreak: 'break-word',
                                      paddingLeft: '100px',
                                      marginTop: '5px',
                                    }}
                                  >
                                    {val}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p
                                style={{
                                  paddingRight: '8px',
                                  textAlign: 'right',
                                  wordBreak: 'break-word',
                                  paddingLeft: '100px',
                                }}
                              >
                                {field.value}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <Divider />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className={classes.cardroot}>
              <CardHeader title='Primary Contact' className={classes.bgcolor} />
              <CardContent className={classes.cardcontent}>
                <div style={{ marginBottom: '-25px' }}>
                  {formFields[0].map((field: any) => (
                    <div>
                      <div className={classes.cardContentDiv}>
                        <p style={{ paddingLeft: '8px' }}>
                          <strong>{field.label}</strong>
                        </p>
                        <p style={{ paddingRight: '8px' }}>{field.value}</p>
                      </div>
                      <Divider />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className={classes.cardroot}>
              <CardHeader
                title='Alternate Contact'
                className={classes.bgcolor}
              />
              <CardContent className={classes.cardcontent}>
                <div style={{ marginBottom: '-25px' }}>
                  {formFields[1].map((field: any) => (
                    <div>
                      <div className={classes.cardContentDiv}>
                        <p style={{ paddingLeft: '8px' }}>
                          <strong>{field.label}</strong>
                        </p>
                        <p style={{ paddingRight: '8px' }}>{field.value}</p>
                      </div>
                      <Divider />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <br />
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                setIsEdit(true);
                setActiveStep(0);
              }}
            >
              Edit
            </Button>
          </div>
        )}
        <DialogBox
          open={isPrimaryEthChanged}
          handleClose={handleDialogueClose}
          text={
            "Please note that a generated credit score is associated with the provided ETH address. Adding a new primary ETH address will have no affect on the original primary ETH address' credit score.  Credit scores are unique to each ETH address."
          }
        />
        <Snackbar
          autoHideDuration={5 * 1000}
          open={toastFlag}
          message={errorMessage}
          onClose={() => setToastFlag(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
