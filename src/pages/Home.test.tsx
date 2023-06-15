import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { Workout } from "../types/workoutState";

jest.mock("../hooks/useWorkoutsContext", () => ({
  useWorkoutsContext: jest.fn(),
}));

const mockResponse = [{_id: "1", title: "Bench press", sets: 2, reps: 10, load: 20}]
const mockFetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });
  (global as any).fetch = mockFetch;

describe("<Home/>", () => {
    test("renders workouts", async() => {
        
        const mockState: {workouts: Workout[]} = {workouts: []}
        const mockDispatch  = jest.fn() as jest.Mock
        (useWorkoutsContext as jest.Mock).mockReturnValue({
            state: mockState,
            dispatch: mockDispatch,
        })
        render (<Home/>)
        expect(screen.getByText("Exercise Title:")).toBeInTheDocument()
       /*  await waitFor(() => screen.findByText("Bench press"))
        expect(screen.getByText("Bench press")).toBeInTheDocument() 
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SetWorkouts",
            payload: mockResponse
        }) */
    })
} )