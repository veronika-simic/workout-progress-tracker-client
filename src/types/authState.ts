export interface UserState {
  user: User;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  token?: string;
}

export const initialAuthState: UserState = {
  user: null
};
