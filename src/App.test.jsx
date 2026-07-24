import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders the home route by default", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getByText("🍣 Esthan Sushi")).toBeInTheDocument();
  });
});
