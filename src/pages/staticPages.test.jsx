import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

function withRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("static pages render", () => {
  it("Home shows the brand and categories", () => {
    withRouter(<Home />);
    expect(screen.getByText("🍣 Esthan Sushi")).toBeInTheDocument();
    expect(screen.getByText("Temakis")).toBeInTheDocument();
  });

  it("Login renders the form", () => {
    withRouter(<Login />);
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("Dashboard renders the admin heading", () => {
    withRouter(<Dashboard />);
    expect(screen.getByText("Painel Administrativo")).toBeInTheDocument();
  });

  it("NotFound renders a 404", () => {
    withRouter(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
