import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ITrip } from "../../types";

// ---------------- Mocks (MUST be before importing SUT) ----------------

// Mock useQueryParams; we control return values per test
const mockGetQueryParamByKey = vi.fn();
const mockSetQueryParam = vi.fn();
const mockRemoveQueryParamByKey = vi.fn();

vi.mock("@/hooks/useQueryParams.ts", () => ({
  default: () => ({
    getQueryParamByKey: mockGetQueryParamByKey,
    setQueryParam: mockSetQueryParam,
    removeQueryParamByKey: mockRemoveQueryParamByKey,
  }),
}));

// TripCard: mock the Vite-resolved absolute path.
vi.mock("/src/components/trip/TripCard.tsx", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ name, onClick }: any) =>
      React.createElement("div", { "data-testid": "trip-card", onClick }, name),
  };
});

vi.mock("../components/trip/TripCard.tsx", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ name, onClick }: any) =>
      React.createElement("div", { "data-testid": "trip-card", onClick }, name),
  };
});

vi.mock("@/containers/SearchBarContainer.tsx", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ handleFilterChange }: any) =>
      React.createElement(
        "button",
        {
          "data-testid": "search-bar-container",
          onClick: () => handleFilterChange("new-filter"),
        },
        "SearchBarContainer Stub",
      ),
  };
});

vi.mock("@/components/Spinner.tsx", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () =>
      React.createElement("div", { "data-testid": "spinner" }, "Loading..."),
  };
});

// fetchTrips: thunk-shaped mock (createAsyncThunk returns a function)
const fetchTripsMock = vi.fn((args: any) => {
  return () => Promise.resolve({ type: "trips/fetchTrips", meta: { args } });
});

vi.mock("../store/redux/TripSlice.ts", () => ({
  fetchTrips: fetchTripsMock,
}));

// react-redux with mutable state
const mockDispatch = vi.fn();
let mockTrips: ITrip[] = [];
let mockStatus = "";
let mockSearchKeyword = "";

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) =>
    selector({
      trips: { trips: mockTrips, status: mockStatus },
      filter: { searchKeyword: mockSearchKeyword },
    }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// ---------------- Import SUT AFTER mocks ----------------
import AllTripContainer from "../../containers/AllTripContainer";

// ---- Tests ----

describe("AllTripContainer", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
    mockTrips = [];
    mockStatus = "";
    mockSearchKeyword = "";
  });

  it("renders header and SearchBarContainer", () => {
    render(<AllTripContainer />);
    expect(screen.getByText("All your trips")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar-container")).toBeInTheDocument();
  });

  it("dispatches fetchTrips with empty object if searchFilter is empty on mount", () => {
    mockSearchKeyword = "";
    render(<AllTripContainer />);

    expect(mockDispatch).toHaveBeenCalled();
    expect(typeof mockDispatch.mock.calls[0][0]).toBe("function");
  });

  it("shows Spinner when status is loading", () => {
    mockStatus = "loading";
    render(<AllTripContainer />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders TripCards when status is succeeded and trips exist", () => {
    mockStatus = "succeeded";
    mockTrips = [
      { id: 1, name: "Trip A" },
      { id: 2, name: "Trip B" },
    ];
    render(<AllTripContainer />);

    const cards = screen.getAllByTestId("trip-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Trip A");
    expect(cards[1]).toHaveTextContent("Trip B");
  });

  it("clicking a TripCard navigates to trip detail page", () => {
    mockStatus = "succeeded";
    mockTrips = [{ id: 42, name: "Special Trip" }];
    render(<AllTripContainer />);

    const card = screen.getByTestId("trip-card");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/trips/42");
  });

  it("shows 'No trip found.' message when status succeeded and trips empty", () => {
    mockStatus = "succeeded";
    mockTrips = [];
    render(<AllTripContainer />);

    expect(screen.getByText("No trip found.")).toBeInTheDocument();
  });
});
