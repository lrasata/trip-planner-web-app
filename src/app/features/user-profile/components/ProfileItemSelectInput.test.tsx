import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { IRole } from "@/types";
import ProfileItemSelectInput from "./ProfileItemSelectInput";
import { userEvent } from "@testing-library/user-event";

describe("ProfileItemSelectInput", () => {
  const roles: IRole[] = [
    { name: "ROLE_ADMIN", description: "Administrator" },
    { name: "ROLE_PARTICIPANT", description: "Standard User" },
  ];

  const onChangeMock = vi.fn();

  it("renders the label", () => {
    render(
      <ProfileItemSelectInput
        id="role-select"
        label="Role"
        value="ROLE_ADMIN"
        options={roles}
        onChange={onChangeMock}
      />,
    );

    expect(screen.getByText("Role")).toBeInTheDocument();
  });

  it("renders the selected role description", () => {
    render(
      <ProfileItemSelectInput
        id="role-select"
        label="Role"
        value="ROLE_PARTICIPANT"
        options={roles}
        onChange={onChangeMock}
      />,
    );

    expect(screen.getByText("Standard User")).toBeInTheDocument();
  });

  it("renders all menu options when opened", async () => {
    render(
      <ProfileItemSelectInput
        id="role-select"
        label="Role"
        value="ROLE_ADMIN"
        options={roles}
        onChange={onChangeMock}
        disabled={false}
      />,
    );

    // Open the Select
    const selectButton = screen.getByRole("combobox");
    await userEvent.click(selectButton);

    // Now the menu options should be visible
    const menuItems = await screen.findAllByRole("option");
    expect(menuItems).toHaveLength(2);
    expect(menuItems[0]).toHaveTextContent("Administrator");
    expect(menuItems[1]).toHaveTextContent("Standard User");
  });
});
