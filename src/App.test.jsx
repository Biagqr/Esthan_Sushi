import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders the home route by default", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /O sabor do Japão/ })
    ).toBeInTheDocument();
    // brand appears in the navbar
    expect(screen.getAllByText(/Esthan Sushi/).length).toBeGreaterThan(0);
  });
});
