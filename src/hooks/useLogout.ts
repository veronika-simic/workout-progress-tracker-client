import { useAuthContext } from "./useAuthContext";
import { AuthActionType } from "../types/authAction";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { ActionType } from "../types/workoutAction";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: AuthActionType.Logout, payload: null });
    workoutsDispatch({ type: ActionType.SetWorkouts, payload: null });
  };
  return { logout };
};
