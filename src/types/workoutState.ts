
export interface WorkoutState {
    workouts: Workout[]
}

export enum Action {
    SetWorkouts = 'SET_WORKOUTS',
    CreateWorkout = 'CREATE_WORKOUT',
    DeleteWorkout = 'DELETE_WORKOUT',
}

export interface Workout {
    _id: string,
    title: string,
    sets: number,
    reps: number,
    load: number,
    createdAt?: Date
    updatedAt?: Date
}

export const initialWorkoutState: WorkoutState = {
    workouts: []
}