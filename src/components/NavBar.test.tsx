import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

jest.mock("../hooks/useLogout");
jest.mock("../hooks/useAuthContext");

describe("<NavBar/>", () => {
  beforeEach(() => {
    const mockLogout = jest.fn();
    (useLogout as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
    (useAuthContext as jest.Mock).mockReturnValue({
      userState: {
        user: { email: "test@example.com" },
      },
    });
  });
  test("renders the user info in navbar", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test("calls logout function when Log out button is clicked", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button", { name: /Log out/i });
    fireEvent.click(logoutButton);
    expect(useLogout().logout).toHaveBeenCalled();
  });
  test("renders the navbar without user info", () => {
    (useAuthContext as jest.Mock).mockReturnValue({
      userState: {
        user: null,
      },
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.queryByText("test@example.com")).toBeNull();
    expect(screen.queryByText("Log out")).toBeNull();

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});
