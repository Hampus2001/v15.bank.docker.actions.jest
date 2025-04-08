import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import Home from "./page";
import { useRouter } from "next/navigation";

// Mock useRouter from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

test("renders Home page with correct content", () => {
  render(<Home />);

  // Check if the heading is rendered
  expect(screen.getByText("Home")).toBeInTheDocument();

  // Check if the "Create account" link is rendered
  const createAccountLink = screen.getByText("Create account");
  expect(createAccountLink).toBeInTheDocument();
  expect(createAccountLink).toHaveAttribute("href", "/createAccount");

  // Check if the deploy test message is rendered
  expect(screen.getByText("deploy test 2")).toBeInTheDocument();
});
