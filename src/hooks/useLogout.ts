import { useAuthContext } from "./useAuthContext";
import { AuthActionType } from '../types/authAction';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({type: AuthActionType.Logout, payload: null})
  };
  return {logout}
};
