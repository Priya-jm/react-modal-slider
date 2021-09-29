export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface ForgotPasswordRequestInterface {
  email: string;
}

export interface ValidateResetPasswordTokenRequestInterface {
  token: string;
}

export interface ChangePasswordRequestInterface {
  token: string;
  password: string;
}
export interface LoginResponseInterface {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginResponseBeforeTokenInterface {
  id: string;
  qrCode: string;
}

export interface TokenValidateInterface {
  token: string;
  userId: string;
}
