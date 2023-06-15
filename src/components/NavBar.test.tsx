import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

test("<NavBar/>", () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  const linkElement = screen.getByText(/Workout Tracker/i);
  expect(linkElement).toBeInTheDocument();
});