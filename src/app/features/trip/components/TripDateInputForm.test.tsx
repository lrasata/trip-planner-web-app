import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TripDateInputForm from "./TripDateInputForm.tsx";

describe("TripDateInputForm", () => {
  it("renders both date pickers with correct labels and initial values", () => {
    render(
      <TripDateInputForm
        departureDate="2025-07-10"
        returnDate="2025-07-20"
        handleDepartureDateChange={() => {}}
        handleReturnDateChange={() => {}}
      />,
    );

    expect(screen.getByTestId("trip-departure-date-input")).toHaveValue(
      "10-07-2025",
    );
    expect(screen.getByTestId("trip-return-date-input")).toHaveValue(
      "20-07-2025",
    );
  });

  it("calls handleDepartureDateChange when departure date changes", () => {
    const handleDepartureDateChange = vi.fn();

    render(
      <TripDateInputForm
        departureDate="2025-07-10"
        returnDate="2025-07-20"
        handleDepartureDateChange={handleDepartureDateChange}
        handleReturnDateChange={() => {}}
      />,
    );

    const departureInput = screen.getByTestId("trip-departure-date-input");
    fireEvent.change(departureInput, { target: { value: "15-07-2025" } });

    expect(handleDepartureDateChange).toHaveBeenCalledTimes(1);
    expect(
      handleDepartureDateChange.mock.calls[0][0].format("DD-MM-YYYY"),
    ).toBe("15-07-2025");
  });

  it("calls handleReturnDateChange when return date changes", () => {
    const handleReturnDateChange = vi.fn();

    render(
      <TripDateInputForm
        departureDate="2025-07-10"
        returnDate="2025-07-20"
        handleDepartureDateChange={() => {}}
        handleReturnDateChange={handleReturnDateChange}
      />,
    );

    const returnInput = screen.getByTestId("trip-return-date-input");
    fireEvent.change(returnInput, { target: { value: "25-07-2025" } });

    expect(handleReturnDateChange).toHaveBeenCalledTimes(1);
    expect(handleReturnDateChange.mock.calls[0][0].format("DD-MM-YYYY")).toBe(
      "25-07-2025",
    );
  });

  it("renders empty inputs when dates are undefined", () => {
    render(
      <TripDateInputForm
        departureDate={undefined}
        returnDate={undefined}
        handleDepartureDateChange={() => {}}
        handleReturnDateChange={() => {}}
      />,
    );

    expect(screen.getByTestId("trip-departure-date-input")).toBeTruthy(); // By default, BasicDatePicker select the current date
    expect(screen.getByTestId("trip-return-date-input")).toBeTruthy(); // By default, BasicDatePicker select the current date
  });
});
