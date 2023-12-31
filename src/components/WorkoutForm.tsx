import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { ActionType } from "../types/workoutAction";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tooltip } from "react-tooltip";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { userState } = useAuthContext();
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userState.user) {
      setError("You must be logged in");
      return;
    }
    const workout = { title, sets, reps, load };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userState.user.token,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setSets("");
      setReps("");
      setLoad("");
      setEmptyFields([]);
      dispatch({ type: ActionType.CreateWorkout, payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label htmlFor="title">Exercise Title:</label>
      <input
        id="title"
        type="text"
        onChange={(e) =>
          setTitle(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          )
        }
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="sets">Sets:</label>
      <input
        id="sets"
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields.includes("sets") ? "error" : ""}
      />
      <label htmlFor="reps">Reps:</label>
      <input
        id="reps"
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <label htmlFor="load">Load:</label>
      <input
        id="load"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <button
        type="submit"
        data-tooltip-id="add-workout-tooltip"
        data-tooltip-content="Add workout"
      >
        Add workout
      </button>
      <Tooltip id="add-workout-tooltip"/>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
