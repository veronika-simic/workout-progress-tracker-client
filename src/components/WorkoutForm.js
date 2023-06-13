import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  return (
    <form className="create">
      <h3>Add a New Workout</h3>
      <label>Exercise Title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
      <label>Sets:</label>
      <input type="number" onChange={(e) => setSets(e.target.value)} value={sets}/>
      <label>Reps:</label>
      <input type="text" onChange={(e) => setReps(e.target.value)} value={reps}/>
      <label>Load (in kg):</label>
      <input type="text" onChange={(e) => setLoad(e.target.value)} value={load}/>
      <button>Add workout</button>
    </form>
  );
};
