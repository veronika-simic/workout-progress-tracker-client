import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { useLogin } from "../hooks/useLogin";

jest.mock("../hooks/useLogin");

describe("Login component", () => {
  test("submits the form with correct email and password", async () => {
    
    const mockLogin = jest.fn();
    (useLogin as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
    
    render(<Login />);

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByTestId("login-form"));

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  test("displays an error message when login fails", async () => {
   
    const mockLogin = jest.fn().mockRejectedValue(new Error("Login failed"));
    (useLogin as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: "Login failed",
    });


    render(<Login />);
    expect(screen.getByText("Login failed")).toBeInTheDocument();
  });


});