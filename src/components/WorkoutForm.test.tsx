import { render, screen, fireEvent } from "@testing-library/react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutForm from "../components/WorkoutForm";
import { ActionType } from "../types/action";

jest.mock("../hooks/useWorkoutsContext", () => ({
  useWorkoutsContext: jest.fn(),
}));

test("renders and submits workout form", () => {
  const mockDispatch = jest.fn();
  (useWorkoutsContext as jest.Mock).mockReturnValue({
    dispatch: mockDispatch,
  });

  render(<WorkoutForm />);

  fireEvent.change(screen.getByRole("textbox", { name: /Exercise Title/i }), {
    target: { value: "Bench Press" },
  });
  fireEvent.change(screen.getByRole("spinbutton", { name: /Sets:/i }), {
    target: { value: "3" },
  });
  fireEvent.change(screen.getByRole("spinbutton", { name: /Reps:/i }), {
    target: { value: "10" },
  });
  fireEvent.change(screen.getByRole("spinbutton", { name: /Load:/i }), {
    target: { value: "100" },
  });
  fireEvent.click(screen.getByText("Add workout"));
  expect(mockDispatch).toHaveBeenCalledWith({
    type: ActionType.SetWorkouts,
    payload: expect.objectContaining({
      title: "Bench Press",
      sets: "3",
      reps: "10",
      load: "100",
    }),
  });
});
