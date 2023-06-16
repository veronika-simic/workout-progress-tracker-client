import { User } from "./authState";

export enum AuthActionType {
  Login = "LOGIN",
  SignUp = "SIGN_UP",
  Logout = "LOG_OUT"
}

export interface Login {
  type: AuthActionType.Login;
  payload: User;
}

export interface SignUp {
  type: AuthActionType.SignUp;
  payload: User;
}

export interface Logout {
    type: AuthActionType.Logout;
    payload: null
}

export type AuthActions = Login | SignUp | Logout;
