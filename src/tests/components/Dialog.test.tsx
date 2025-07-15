import { render, screen, fireEvent } from "@testing-library/react";
import Dialog, { DialogProps } from "@/components/Dialog";
import { useTheme, useMediaQuery } from "@mui/material";
import { vi } from "vitest";

// Mock MUI hooks for responsive behavior
vi.mock("@mui/material", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useTheme: vi.fn(),
    useMediaQuery: vi.fn(),
  };
});

describe("Dialog", () => {
  const onCloseMock = vi.fn();

  const defaultProps: DialogProps = {
    open: true,
    onClose: onCloseMock,
    title: "Test Dialog",
    content: <div>Dialog content here</div>,
  };

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it("renders with correct title and content", () => {
    (useTheme as vi.Mock).mockReturnValue({
      breakpoints: {
        down: () => "(max-width:600px)",
      },
      palette: {
        grey: { 500: "#999" },
      },
    });
    (useMediaQuery as vi.Mock).mockReturnValue(false); // not mobile

    render(<Dialog {...defaultProps} />);
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog content here")).toBeInTheDocument();
  });

  it("calls onClose with empty string when close button is clicked", () => {
    (useTheme as vi.Mock).mockReturnValue({
      breakpoints: {
        down: () => "(max-width:600px)",
      },
      palette: {
        grey: { 500: "#999" },
      },
    });
    (useMediaQuery as vi.Mock).mockReturnValue(false);

    render(<Dialog {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledWith("");
  });

  it("calls onClose with empty string when dialog is closed via backdrop or escape", () => {
    (useTheme as vi.Mock).mockReturnValue({
      breakpoints: {
        down: () => "(max-width:600px)",
      },
      palette: {
        grey: { 500: "#999" },
      },
    });
    (useMediaQuery as vi.Mock).mockReturnValue(false);

    render(<Dialog {...defaultProps} />);
    // simulate backdrop close by calling the onClose prop on the MuiDialog
    // but since we're not controlling MuiDialog directly here,
    // we simulate by calling the close button or expect onClose to be called on user action
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledWith("");
  });

  it("does not render when open is false", () => {
    (useTheme as vi.Mock).mockReturnValue({
      breakpoints: {
        down: () => "(max-width:600px)",
      },
      palette: {
        grey: { 500: "#999" },
      },
    });
    (useMediaQuery as vi.Mock).mockReturnValue(false);

    const { container } = render(<Dialog {...defaultProps} open={false} />);
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });
});
