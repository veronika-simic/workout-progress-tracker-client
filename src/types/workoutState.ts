export interface WorkoutState {
  workouts: Workout[];
}

export interface Workout {
  _id: string;
  title: string;
  sets: number;
  reps: number;
  load: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const initialWorkoutState: WorkoutState = {
  workouts: [],
};
