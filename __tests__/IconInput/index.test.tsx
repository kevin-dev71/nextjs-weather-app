import { IconInput } from "@/src/components/WeatherWidget/IconInput";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

// jest.mock("@/src/hooks/useLocale", () => {
//   return jest.fn(() => ({
//     t: () => "Weather Forecast",
//   }));
// });

describe("IconInput", () => {
  it("should renders an Input with 'Search a city' text as placeholder", () => {
    render(<IconInput placeholder="Search a city" />);

    const input = screen.queryByPlaceholderText(/Search a city/i);

    expect(input).toBeInTheDocument();
  });
});
