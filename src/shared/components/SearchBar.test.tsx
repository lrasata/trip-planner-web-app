import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

vi.mock("@mui/material/styles", async () => {
  // Keep the real exports, override only useTheme
  const actual = await vi.importActual<typeof import("@mui/material/styles")>(
    "@mui/material/styles",
  );

  return {
    ...actual,
    useTheme: () =>
      ({
        palette: {
          background: { paper: "#ffffff" },
        },
      }) as any, // cast because we're returning a minimal theme
  };
});

describe("SearchBar", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // control debounce timing
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders initial inputSearchText", () => {
    const handleSearch = vi.fn();
    render(<SearchBar inputSearchText="Paris" handleSearch={handleSearch} />);

    // MUI OutlinedInput uses the provided placeholder
    const input = screen.getByPlaceholderText(
      "Enter a text to start searching...",
    ) as HTMLInputElement;

    expect(input.value).toBe("Paris");
  });

  it("updates input when inputSearchText prop changes", () => {
    const handleSearch = vi.fn();

    const { rerender } = render(
      <SearchBar inputSearchText="old" handleSearch={handleSearch} />,
    );

    const input = screen.getByPlaceholderText(
      "Enter a text to start searching...",
    ) as HTMLInputElement;
    expect(input.value).toBe("old");

    rerender(
      <SearchBar inputSearchText="new value" handleSearch={handleSearch} />,
    );

    expect(input.value).toBe("new value");
  });
});
