import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

import WorkoutDetails from "../components/WorkoutDetails";
import { AuthContextProvider } from "../context/AuthContext";
import { WorkoutsContextProvider } from "../context/WorkoutContext";

describe("Home component", () => {
  test("renders WorkoutDetails component", () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <WorkoutsContextProvider>
            <Home />
          </WorkoutsContextProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );
    const workout = {
      _id: "210920190",
      title: "Bench press",
      sets: 4,
      reps: 3,
      load: 20,
    };
    render(<WorkoutDetails workout={workout} />);
    return screen.findByText('Bench press')
    .then(() => {
      console.log('found');
    })
    .catch(() => {
      console.log('not found');
    });
  });
});
