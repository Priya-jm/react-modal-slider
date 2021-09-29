import { TOKEN } from '../constants/text';
import { getItemFromLocalStorage } from './localstorage';

export const checkIfAccesstokenIsValid = (): boolean => {
  const tokenObj = JSON.parse(getItemFromLocalStorage(TOKEN) as any);

  if (tokenObj) {
    const currentTime = new Date().getTime();

    if (currentTime > tokenObj.expiresIn) {
      return false;
    }
    return true;
  }
  return false;
};

export const validateName = (name: string) => {
  const re = /^[a-zA-Z][a-zA-Z -]*[a-zA-Z]{1,30}$/;
  return re.test(name.trim());
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateLinkedIn = (url: string) => {
  const regex = new RegExp(
    '(https?:\\/\\/(www.)?linkedin.com\\/(mwlite\\/|m\\/)?in\\/[a-zA-Z0-9_.-]+\\/?)'
  );
  return regex.test(url);
};

export const validateCompanyLinkedIn = (url: string) => {
  const regex = new RegExp(
    '(https?:\\/\\/(www.)?linkedin.com\\/company\\/[a-zA-Z0-9_.-]+\\/?)'
  );
  return regex.test(url);
};

export const validateTelegram = (telegramHandle: string) => {
  return (
    (telegramHandle.startsWith('https://t.me/') &&
      telegramHandle.replace('https://t.me/', '').length) ||
    (telegramHandle.startsWith('http://t.me/') &&
      telegramHandle.replace('http://t.me/', '').length) ||
    (telegramHandle.startsWith('@') && telegramHandle.replace('@', '').length)
  );
};

export const validateMobileNo = (mobileNo: string) => {
  const re = /^(?:\+\d{1,3}[- ])\d{6,11}[0-9]$/;
  return re.test(mobileNo);
};

export const validateTwitter = (url: string) => {
  const regex = /https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+)/;
  return regex.test(url);
};

export const validateEthAddress = (add: string) => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(add);
}