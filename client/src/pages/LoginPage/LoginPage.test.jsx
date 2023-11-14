import React from "react"
import { describe, it, expect, beforeEach, afterEach, test } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";



import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import LoginPage from ".";
import { UsernameForm } from "../../components";

describe("LoginPage", () => {
    beforeEach(
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        ))
    afterEach(() => {
        cleanup()
    })

    test("renders the login page with the correct elements", () => {
        // Ensure key elements are present on the page
        expect(screen.getByTestId("welcome")).toBeInTheDocument();
        expect(screen.getByTestId("login-request")).toBeInTheDocument();
        //expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByTestId("no-account")).toBeInTheDocument();
      });
      /*
      test("updates state when input fields are changed", () => {
        // Simulate user input and check if state is updated
        userEvent.type(screen.getByLabelText("Username"), "testuser");
        userEvent.type(screen.getByLabelText("Password"), "testpassword");
    
        expect(screen.getByLabelText("Username")).toHaveValue("testuser");
        expect(screen.getByLabelText("Password")).toHaveValue("testpassword");
      });
    
      test("redirects to signup page when 'Create one here!' link is clicked", () => {
        // Simulate user clicking the link and check if the route changes
        userEvent.click(screen.getByText("Create one here!"));
        expect(window.location.pathname).toBe("/signup");
      });
      
      test("handles form submission correctly", () => {
        // Simulate user filling out the form and submitting
        userEvent.type(screen.getByLabelText("Username"), "testuser");
        userEvent.type(screen.getByLabelText("Password"), "testpassword");
        userEvent.click(screen.getByRole("button", { name: "Login" }));
    
      });
    */
})