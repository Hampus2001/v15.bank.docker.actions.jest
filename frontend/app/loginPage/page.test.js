import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import loginPage from "./page";

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1 }]) })
);

test("calls login with correct data", async () => {
  render(<loginPage />);

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
});
