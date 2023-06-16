import { User } from "./authState";

export enum AuthActionType {
  Login = "LOGIN",
  SignUp = "SIGN_UP",
}

export interface Login {
  type: AuthActionType.Login;
  payload: User;
}

export interface SignUp {
  type: AuthActionType.SignUp;
  payload: User;
}

export type AuthActions = Login | SignUp;
