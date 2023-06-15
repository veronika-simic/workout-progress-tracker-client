import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import WorkoutDetails from "./WorkoutDetails";
import { Workout } from "../types/workoutState";
import { ActionType } from "../types/action";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

jest.mock("../hooks/useWorkoutsContext", () => ({
  useWorkoutsContext: jest.fn(),
}));

const mockResponse =[ {
  _id: "owpqwopqeoqe1",
  title: "Bench press",
  sets: 2,
  reps: 10,
  load: 10,
  createdAt: new Date(),
}]
const mockFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue(mockResponse),
});
(global as any).fetch = mockFetch;
describe("<WorkoutDetails/>", () => {
  const workout: Workout = {
    _id: "owpqwopqeoqe1",
    title: "Bench press",
    sets: 2,
    reps: 10,
    load: 10,
    createdAt: new Date(),
  };

  test("renders workout details", async () => {
    const mockDispatch = jest.fn() as jest.Mock;
    (useWorkoutsContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
    render(<WorkoutDetails workout={workout} />);
    expect(screen.getByText(workout.title)).toBeInTheDocument();
    expect(screen.getByText(workout.sets)).toBeInTheDocument()
    expect(screen.getByText("delete")).toBeInTheDocument();
    fireEvent.click(screen.getByText("delete"));
    /* expect(mockDispatch).toHaveBeenLastCalledWith({
      type: ActionType.DeleteWorkout,
      payload: mockResponse,
    }); */
  });
});
