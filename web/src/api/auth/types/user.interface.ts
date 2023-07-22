export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
}

export interface IUserState {
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
