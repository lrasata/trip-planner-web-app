import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AutoDismissAlert from "@/components/AutoDismissAlert";

describe("AutoDismissAlert", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders alert with correct severity and message", () => {
    render(<AutoDismissAlert severity="success" message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("clears timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");
    const { unmount } = render(
      <AutoDismissAlert
        severity="warning"
        message="Unmount test"
        duration={3000}
      />,
    );

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
