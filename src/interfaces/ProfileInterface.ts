import { SignupRequestInterface } from './SignupInterface';

export interface ProfileDataInterface {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    telegramHandle?: string | null;
    linkedInHandle?: string | null;
    status?: string | null;
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
      ethAddress?: string | null;
      ethAddresses?: [];
      industry?: string | null;
      website?: string | null;
      linkedInProfile?: string | null;
      twitterProfile?: string | null;
      companyDescription?: string | null;
      logoUrl?: string | null;
    };
  };
  isSubmissionExists: boolean;
  ethAddressesDetails: any;
}
