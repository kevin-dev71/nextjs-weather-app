import Home from "@/src/pages/index";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders HOMEPAGE text", () => {
    render(<Home />);

    const heading = screen.getByText("HOMEPAGE");

    expect(heading).toBeInTheDocument();
  });
});
