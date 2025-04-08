import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "./page";
import { HandleAccountContext } from "@/context/AccountContext";

// Mock useRouter from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(), // Mock the push function
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1 }]),
  })
);

test("calls login with correct data", async () => {
  const mockSetSession = jest.fn(); // Mock setSession function

  render(
    <HandleAccountContext.Provider
      value={{ session: null, setSession: mockSetSession }}
    >
      <LoginPage />
    </HandleAccountContext.Provider>
  );

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText("username"), {
    target: { value: "testUser" },
  });
  fireEvent.change(screen.getByPlaceholderText("password"), {
    target: { value: "testPassword" },
  });

  // Simulate button click
  fireEvent.click(screen.getByText("Log in"));

  // Assert fetch was called with correct arguments
  expect(fetch).toHaveBeenCalledWith("http://13.60.77.158:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "testUser", password: "testPassword" }),
  });

  // Assert setSession was called with the correct data
  expect(mockSetSession).toHaveBeenCalledWith([{ id: 1 }]);
});
