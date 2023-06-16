import { useReducer, createContext, ReactNode, useEffect } from "react";
import { UserState, initialAuthState } from "../types/authState";
import { AuthActionType, AuthActions } from "../types/authAction";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<AuthActions>;
}>({ state: initialAuthState, dispatch: () => undefined });

export const authReducer = (
  state: UserState,
  action: AuthActions
): UserState => {
  switch (action.type) {
    case AuthActionType.Login:
      return {
        user: action.payload,
      };
    case AuthActionType.Logout:
      return {
        user: null,
      };
    case AuthActionType.SignUp:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: AuthActionType.Login, payload: user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
