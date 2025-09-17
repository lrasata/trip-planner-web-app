import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---- Mocks ----
// Keep a mutable state that useSelector will read
let mockState: { filter: { searchKeyword: string } } = {
  filter: { searchKeyword: "" },
};

// Capture dispatch calls
const mockDispatch = vi.fn();

// Mock react-redux hooks
vi.mock("react-redux", () => {
  return {
    useDispatch: () => mockDispatch,
    useSelector: (selector: any) => selector(mockState),
  };
});

// Mock the constants
vi.mock("@/constants/constants.ts", () => ({
  SEARCH_QUERY_PARAMETER: "search", // or whatever your app uses
}));

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

vi.mock("@/components/SearchBar.tsx", () => {
  return {
    __esModule: true,
    default: ({ inputSearchText, handleSearch }: any) => (
      <div>
        <div data-testid="searchbar-value">{inputSearchText}</div>
        <button onClick={() => handleSearch("new value")}>
          trigger-search
        </button>
        <button onClick={() => handleSearch("")}>trigger-clear</button>
      </div>
    ),
  };
});

// SUT
import SearchBarContainer from "./SearchBarContainer";

// ---- Helpers ----

function setupContainer(overrides?: {
  handleFilterChange?: (s: string) => void;
}) {
  const handleFilterChange = vi.fn();
  render(
    <SearchBarContainer
      handleFilterChange={overrides?.handleFilterChange ?? handleFilterChange}
    />,
  );
  return { handleFilterChange };
}

beforeEach(() => {
  mockDispatch.mockClear();
  mockGetQueryParamByKey.mockReset();
  mockSetQueryParam.mockReset();
  mockRemoveQueryParamByKey.mockReset();
  mockState = { filter: { searchKeyword: "" } };
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SearchBarContainer", () => {
  it("on mount, uses search keyword from URL when present", async () => {
    // URL has a value
    mockGetQueryParamByKey.mockReturnValue("rome");
    const handleFilterChange = vi.fn();

    setupContainer({ handleFilterChange });

    // Effect should have run:
    // 1) dispatch(updateSearchKeyword({ searchKeyword: 'rome' }))
    expect(mockDispatch).toHaveBeenCalled();
    const dispatched = mockDispatch.mock.calls[0][0];
    expect(dispatched).toHaveProperty("payload.searchKeyword", "rome");

    // 2) Parent callback called with 'rome'
    expect(handleFilterChange).toHaveBeenCalledWith("rome");

    // 3) Input value propagated to child SearchBar
    expect(screen.getByTestId("searchbar-value").textContent).toBe("rome");

    // No URL set/remove in this path (just reading)
    expect(mockSetQueryParam).not.toHaveBeenCalled();
    expect(mockRemoveQueryParamByKey).not.toHaveBeenCalled();
  });

  it("when URL is empty and Redux has a value, it pushes it to URL and callbacks", async () => {
    // URL empty, store has 'paris'
    mockGetQueryParamByKey.mockReturnValue("");
    mockState.filter.searchKeyword = "paris";

    const { handleFilterChange } = setupContainer();

    // handleInputSearch(searchKeyword) should have been called by effect:
    // - dispatch(updateSearchKeyword({ searchKeyword: 'paris' }))
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty(
      "payload.searchKeyword",
      "paris",
    );

    // - parent callback
    expect(handleFilterChange).toHaveBeenCalledWith("paris");

    // - URL set
    expect(mockSetQueryParam).toHaveBeenCalledWith("search", "paris");
    expect(mockRemoveQueryParamByKey).not.toHaveBeenCalled();

    // - input reflected to child
    expect(screen.getByTestId("searchbar-value").textContent).toBe("paris");
  });

  it("user triggers a non-empty search: dispatches, calls parent, and sets URL param", async () => {
    mockGetQueryParamByKey.mockReturnValue(""); // start empty

    const { handleFilterChange } = setupContainer();

    // Simulate clicking the stub's 'trigger-search' button
    await userEvent.click(screen.getByText("trigger-search"));

    // Dispatch called with payload 'new value'
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch.mock.calls.slice(-1)[0][0]).toHaveProperty(
      "payload.searchKeyword",
      "new value",
    );

    // Parent callback
    expect(handleFilterChange).toHaveBeenCalledWith("new value");

    // URL set to 'new value'
    expect(mockSetQueryParam).toHaveBeenCalledWith("search", "new value");
    expect(mockRemoveQueryParamByKey).not.toHaveBeenCalled();

    // Child receives updated input
    expect(screen.getByTestId("searchbar-value").textContent).toBe("new value");
  });

  it("user clears search: dispatches, calls parent, and removes URL param", async () => {
    // Start with some value in URL to ensure we test removal path
    mockGetQueryParamByKey.mockReturnValue("start");
    const { handleFilterChange } = setupContainer();

    // Clear via stub
    await userEvent.click(screen.getByText("trigger-clear"));

    // Dispatch called with empty payload
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch.mock.calls.slice(-1)[0][0]).toHaveProperty(
      "payload.searchKeyword",
      "",
    );

    // Parent callback with ""
    expect(handleFilterChange).toHaveBeenCalledWith("");

    // URL param removed
    expect(mockRemoveQueryParamByKey).toHaveBeenCalledWith("search");
    expect(mockSetQueryParam).not.toHaveBeenCalled();

    // Child reflects empty input
    expect(screen.getByTestId("searchbar-value").textContent).toBe("");
  });
});
