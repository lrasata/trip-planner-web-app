import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/shared/store/redux/AuthSlice";
import { RootState } from "@/shared/store/redux";
import ProfileContainer from "./ProfileContainer";
import { IRole, IUser } from "@/types";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

// Mock store
const createMockStore = (initialState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      // @ts-ignore
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        status: "idle",
        ...initialState?.auth,
      },
    },
  });

const mockUser: IUser = {
  fullName: "John Doe",
  email: "john@example.com",
  password: "",
  role: { name: "ROLE_ADMIN", description: "Standard User" },
};

const mockRoles: IRole[] = [
  { name: "ROLE_ADMIN", description: "Administrator" },
  { name: "ROLE_PARTICIPANT", description: "Standard User" },
];

describe("ProfileContainer", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <ProfileContainer user={mockUser} roles={mockRoles} />
      </Provider>,
    );

    expect(screen.getByText("User profile")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByTestId("profile-user-name-input")).toHaveValue(
      "John Doe",
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByTestId("profile-user-email-input")).toHaveValue(
      "john@example.com",
    );
    expect(screen.getByText("Reset password")).toBeInTheDocument();
    expect(screen.getByTestId("profile-user-password-input")).toHaveValue("");
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByTestId("profile-user-role")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("updates inputs and triggers dispatch on save", async () => {
    render(
      <Provider store={createMockStore()}>
        <ProfileContainer user={mockUser} roles={mockRoles} />
      </Provider>,
    );

    const nameInput = screen.getByTestId(
      "profile-user-name-input",
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId(
      "profile-user-email-input",
    ) as HTMLInputElement;

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Jane Doe");

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "jane@example.com");

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(typeof mockDispatch.mock.calls[0][0]).toBe("function"); // Confirm it's a thunk
  });

  it("renders role select with correct value", async () => {
    render(
      <Provider store={createMockStore()}>
        <ProfileContainer user={mockUser} roles={mockRoles} />
      </Provider>,
    );

    // Open the Select
    const selectButton = screen.getByRole("combobox");
    await userEvent.click(selectButton);

    const roleSelect = screen.getByRole("option", { name: "Standard User" });
    expect(roleSelect).toBeInTheDocument();
  });
});
