export interface SignupRequestInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  telegramHandle?: string | null;
  linkedInHandle?: string | null;
  alternateContact: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    mobileNumber: string | null;
    telegramHandle: string | null;
    linkedInHandle: string | null;
  };
  companyInformation: {
    entityName: string;
    tradeName?: string | null;
    country: string;
    ethAddresses?: [] | null;
    ethAddress?: string | null;
    industry?: string | null;
    website?: string | null;
    linkedInProfile?: string | null;
    twitterProfile?: string | null;
    companyDescription?: string | null;
  };
  companyLogo: any;
}

export interface SignUpDataInterface {
  primaryFirstName: string;
  primaryLastName: string;
  primaryMobileNo: string;
  primaryEmail: string;
  primaryTelegramHandle: string;
  primaryLinkedInProfile: string;
  password: string;
  confirmPassword: string;
  alternateFirstName: string;
  alternateLastName: string;
  alternateMobileNo: string;
  alternateEmail: string;
  alternateTelegramHandle: string;
  alternateLinkedInProfile: string;
  borrowerEntityName: string;
  tradeName: string;
  borrowerCountry: string;
  ethAddresses: [];
  ethAddress: string;
  industry: string;
  website: string;
  linkedInProfile: string;
  twitterProfile: string;
  companyDescription: string;
  companyLogo: any;
}

export interface SignUpErrorDataInterface {
  primaryFirstNameError: boolean;
  primaryLastNameError: boolean;
  primaryMobileNoError: boolean;
  primaryEmailError: boolean;
  primaryTelegramHandleError: boolean;
  primaryLinkedInProfileError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
  alternateFirstNameError: boolean;
  alternateLastNameError: boolean;
  alternateMobileNoError: boolean;
  alternateEmailError: boolean;
  companyDescriptionError: boolean;
  alternateTelegramHandleError: boolean;
  alternateLinkedInProfileError: boolean;
  // borrowerEntityNameError: boolean;
  // tradeNameError: boolean;
  borrowerCountryError: boolean;
  // ethAddressError: boolean;
  industryError: boolean;
  // websiteError: boolean;
  twitterProfileError: boolean;
  linkedInProfileError: boolean;
}

export interface SignUpHelperTextDataInterface {
  primaryFirstNameHelperText: string;
  primaryLastNameHelperText: string;
  primaryMobileNoHelperText: string;
  primaryEmailHelperText: string;
  primaryTelegramHandleHelperText: string;
  primaryLinkedInProfileHelperText: string;
  passwordHelperText: string;
  confirmPasswordHelperText: string;
  alternateFirstNameHelperText: string;
  alternateLastNameHelperText: string;
  alternateMobileNoHelperText: string;
  alternateEmailHelperText: string;
  alternateTelegramHandleHelperText: string;
  alternateLinkedInProfileHelperText: string;
  // borrowerEntityNameHelperText: string;
  // tradeNameHelperText: string;
  borrowerCountryHelperText: string;
  // ethAddressHelperText: string;
  industryHelperText: string;
  // websiteHelperText: string;
  twitterProfileHelperText: string;
  linkedInProfileHelperText: string;
}
