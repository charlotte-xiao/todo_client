import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../src/App";

test("render Thoughtodo Title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Thoughtodo/i);
  expect(linkElement).toBeInTheDocument();
});
