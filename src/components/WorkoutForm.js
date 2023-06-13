import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, sets, reps, load };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setSets("");
      setReps("");
      setLoad("");
      console.log("New workout added");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Sets:</label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
      />
      <label>Reps:</label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <label>Load (in kg):</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <button type="submit">Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
