import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { Workout } from "../types/workoutState";
import { ActionType } from "../types/workoutAction";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { workoutState, dispatch } = useWorkoutsContext();
  const workouts = workoutState.workouts
    ? Array.from(workoutState.workouts)
    : [];
  const { userState } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: "Bearer " + userState.user.token,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: ActionType.SetWorkouts, payload: json });
      }
    };
    if (userState.user) {
      fetchWorkouts();
    }
  }, [dispatch, userState.user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
};
export default Home;
