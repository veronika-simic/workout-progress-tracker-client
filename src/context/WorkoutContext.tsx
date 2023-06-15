import { ReactNode, createContext, useReducer } from "react";
import { WorkoutState, initialWorkoutState } from "../types/workoutState";
import { WorkoutActions, ActionType } from "../types/action";
interface Props {
  children?: ReactNode
  
}

export const WorkoutsContext = createContext<{
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutActions>;
}>({ state: initialWorkoutState, dispatch: () => undefined });

export const workoutsReducer = (
  state: WorkoutState,
  action: WorkoutActions
): WorkoutState => {
  switch (action.type) {
    case ActionType.SetWorkouts:
      return {
        workouts: action.payload,
      };
    case ActionType.CreateWorkout:
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case ActionType.DeleteWorkout:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children } : Props) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialWorkoutState);
  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
