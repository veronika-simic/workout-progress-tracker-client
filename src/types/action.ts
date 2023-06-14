import { Workout } from "./workoutState";

export enum ActionType {
  SetWorkouts,
  CreateWorkout,
  DeleteWorkout,
}

export interface SetWorkouts {
  type: ActionType.SetWorkouts;
  payload: Workout[];
}

export interface CreateWorkout {
  type: ActionType.CreateWorkout;
  payload: Workout;
}

export interface DeleteWorkout {
  type: ActionType.DeleteWorkout;
  payload: Workout;
}

export type WorkoutActions = SetWorkouts | CreateWorkout | DeleteWorkout;