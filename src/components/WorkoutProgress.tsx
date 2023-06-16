import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ActionType } from "../types/workoutAction";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WorkoutProgress = () => {
    const { workoutState, dispatch } = useWorkoutsContext();
    const workouts = Array.from(workoutState.workouts);
    const data: Number[] = []
    
    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch("/api/workouts");
        const json = await response.json();
  
        if (response.ok) {
          dispatch({ type: ActionType.SetWorkouts, payload: json });
        }
      };
  
      fetchWorkouts();
    }, [dispatch]);
  return (
    <>

    {workouts && workouts.map((workout) => {
        if (workout.title === "Chest press") {
           data.push(workout.load)
        }

    })}
    <Line
      datasetIdKey="id"
      data={{
        labels: labels,
        datasets: [
          {
            label: "Chest press",
            data: data,
          },
        ],
      }}
    />
    </>
  );
};

export default WorkoutProgress;
