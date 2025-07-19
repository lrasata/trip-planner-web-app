import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import ProfileItemTextInput from "../../../components/profile/ProfileItemTextInput";

describe("ProfileItemTextInput", () => {
  const defaultProps = {
    id: "username",
    label: "Username",
    value: "john_doe",
    type: "text",
    onChange: vi.fn(),
  };

  it("renders the label and input correctly", () => {
    render(<ProfileItemTextInput {...defaultProps} />);

    expect(screen.getByText("Username")).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("john_doe");
    expect(input).toHaveAttribute("id", "username");
    expect(input).toHaveAttribute("type", "text");
  });

  it("calls onChange when user types in input", () => {
    render(<ProfileItemTextInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new_value" } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("handles undefined value", () => {
    render(<ProfileItemTextInput {...defaultProps} value={undefined} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });
});
