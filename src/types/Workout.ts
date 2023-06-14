export interface Workout {
    _id: string,
    title: string,
    sets: number,
    reps: number,
    load: number,
    createdAt?: Date
    updatedAt?: Date
}