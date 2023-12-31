import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Workout } from "../types/workoutState";
import { ActionType } from "../types/workoutAction";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tooltip } from "react-tooltip";
interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  const { dispatch } = useWorkoutsContext();
  const { userState } = useAuthContext();
  const handleClick = async () => {
    if (!userState.user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userState.user.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: ActionType.DeleteWorkout, payload: json });
    }
  };
  
  const createdAtDate = workout.createdAt instanceof Date ? workout.createdAt : new Date();

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load:</strong>
        {workout.load}
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(createdAtDate, { addSuffix: true })}
      </p>

      <span
        data-tooltip-id="delete-tooltip"
        data-tooltip-content="Delete workout"
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>

      <Tooltip id="delete-tooltip" />
    </div>
  );
};

export default WorkoutDetails;
