import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ILocation } from "@/types.ts";
import TripCard from "./TripCard.tsx";

// Sample data
const departureLocation: ILocation = {
  city: "Paris",
  region: "Île-de-France",
  country: "France",
  countryCode: "FR",
};

const arrivalLocation: ILocation = {
  city: "Rome",
  region: "Lazio",
  country: "Italy",
  countryCode: "IT",
};

describe("TripCard", () => {
  it("renders name and description", () => {
    render(
      <TripCard
        name="My Europe Trip"
        description="A wonderful journey"
        departureLocation={departureLocation}
        arrivalLocation={arrivalLocation}
        departureDate="2025-08-01"
        returnDate="2025-08-15"
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("My Europe Trip")).toBeInTheDocument();
    expect(screen.getByText("A wonderful journey")).toBeInTheDocument();
  });

  it("renders formatted departure and return dates", () => {
    render(
      <TripCard
        name="Summer Trip"
        description=""
        departureLocation={departureLocation}
        arrivalLocation={arrivalLocation}
        departureDate="2025-08-01"
        returnDate="2025-08-15"
        onClick={() => {}}
      />,
    );
    // Check for formatted date text: "01 August 2025 - 15 August 2025"
    expect(
      screen.getByText(/01 August 2025 - 15 August 2025/),
    ).toBeInTheDocument();
  });

  it("renders departure and arrival locations with labels", () => {
    render(
      <TripCard
        name="City Hopping"
        description=""
        departureLocation={departureLocation}
        arrivalLocation={arrivalLocation}
        departureDate="2025-08-01"
        returnDate="2025-08-15"
        onClick={() => {}}
      />,
    );
    expect(screen.getByText(/Departure:/i).parentElement).toHaveTextContent(
      "Paris, Île-de-France, France",
    );
    expect(screen.getByText(/Arrival:/i).parentElement).toHaveTextContent(
      "Rome, Lazio, Italy",
    );
  });

  it("calls onClick when Manage button is clicked", () => {
    const handleClick = vi.fn();

    render(
      <TripCard
        name="Clickable Trip"
        description=""
        departureLocation={departureLocation}
        arrivalLocation={arrivalLocation}
        departureDate="2025-08-01"
        returnDate="2025-08-15"
        onClick={handleClick}
      />,
    );
    const button = screen.getByRole("button", { name: /manage/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
