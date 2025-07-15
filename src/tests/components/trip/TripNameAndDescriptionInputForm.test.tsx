import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TripNameAndDescriptionInputForm from "@/components/trip/TripNameAndDescriptionInputForm.tsx";

describe("TripNameAndDescriptionInputForm", () => {
  it("renders name and description inputs with correct initial values", () => {
    render(
      <TripNameAndDescriptionInputForm
        name="Summer Trip"
        description="A wonderful journey"
        handleInputNameChange={() => {}}
        handleInputDescriptionChange={() => {}}
      />,
    );

    expect(screen.getByLabelText(/name of the trip/i)).toHaveValue(
      "Summer Trip",
    );
    expect(screen.getByLabelText(/name of the trip/i)).toBeRequired();
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "A wonderful journey",
    );
  });

  it("calls handleInputNameChange when name input changes", () => {
    const handleNameChange = vi.fn();

    render(
      <TripNameAndDescriptionInputForm
        name="Old Name"
        description=""
        handleInputNameChange={handleNameChange}
        handleInputDescriptionChange={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText(/name of the trip/i);
    fireEvent.change(nameInput, { target: { value: "New Name" } });

    expect(handleNameChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleInputDescriptionChange when description input changes", () => {
    const handleDescriptionChange = vi.fn();

    render(
      <TripNameAndDescriptionInputForm
        name="Trip"
        description="Old description"
        handleInputNameChange={() => {}}
        handleInputDescriptionChange={handleDescriptionChange}
      />,
    );

    const descInput = screen.getByLabelText(/description/i);
    fireEvent.change(descInput, { target: { value: "New description" } });

    expect(handleDescriptionChange).toHaveBeenCalledTimes(1);
  });

  it("shows error on name input if name is empty", () => {
    render(
      <TripNameAndDescriptionInputForm
        name=""
        description=""
        handleInputNameChange={() => {}}
        handleInputDescriptionChange={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText(/name of the trip/i);
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
  });
});
