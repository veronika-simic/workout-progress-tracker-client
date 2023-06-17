import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "./SignUp";
import { useSignup } from "../hooks/useSignup";

jest.mock("../hooks/useSignup");

describe("<SignUp/>", () => {
  test("submits the form with correct email and password", async () => {
    const mockSignup = jest.fn();
    (useSignup as jest.Mock).mockReturnValue({
      signup: mockSignup,
      isLoading: false,
      error: null,
    });
    render(<SignUp />);
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(mockSignup).toHaveBeenCalledWith("test@example.com", "password123");
  });

  test("displays error message when sign up fails", async () => {
    const mockSignup = jest.fn();
    (useSignup as jest.Mock).mockReturnValue({
      signUp: mockSignup,
      isLoading: false,
      error: "Sign up failed",
    });
    render(<SignUp />);
    expect(screen.getByText("Sign up failed")).toBeInTheDocument();
  });
});
