import React from "react"
import { describe, it, expect, beforeEach, afterEach, test } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import UsernameForm from ".";

describe("UsernameForm", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <UsernameForm
                inputUn=""
                setInputUn={() => {}}
                inputPw=""
                setInputPw={() => {}}
                button_Text="Login"
                setButtonText={() => {}} />
            </BrowserRouter>
        )
    })
    afterEach(() => {
        cleanup()
    })
    
    test("Form exists", () => {
        const form = screen.getByTestId("login-form")
        expect(form).toBeInTheDocument()
    })
    test('renders username input', () => {
        const usernameInput = screen.getByTestId('username');
        expect(usernameInput).toBeInTheDocument();
      });
    
      test('renders password input', () => {
        const passwordInput = screen.getByTestId('password');
        expect(passwordInput).toBeInTheDocument();
      });
    
      test('renders login button', () => {
        const loginButton = screen.getByTestId('submit');
        expect(loginButton).toBeInTheDocument();
      });
    
      test('handles input change for username', () => {
        const usernameInput = screen.getByTestId('username');
        userEvent.type(usernameInput, 'testuser');
        expect(usernameInput.value).toBe('testuser');
      });
    
      test('handles input change for password', () => {
        const passwordInput = screen.getByTestId('password');
        userEvent.type(passwordInput, 'testpassword');
        expect(passwordInput.value).toBe('testpassword');
      });
    
      test('toggles password visibility', () => {
        const passwordInput = screen.getByTestId('password');
        console.log(passwordInput)
        const togglePasswordButton = screen.getByTestId('toggle-password-button');
        expect(passwordInput.type).toBe("password")

        userEvent.click(togglePasswordButton);
        expect(passwordInput.type).toBe('text');
    
        userEvent.click(togglePasswordButton);
        expect(passwordInput.type).toBe('password');
      });
      /*
      test('submits form on button click', () => {
        const loginButton = screen.getByTestId('submit');
        const handleSubmitMock = jest.fn();
    
        render(
          <BrowserRouter>
            <UsernameForm
              inputUn=""
              setInputUn={() => {}}
              inputPw=""
              setInputPw={() => {}}
              button_Text="Login"
              setButtonText={() => {}}
              handleSubmit={handleSubmitMock}
            />
          </BrowserRouter>
        );
    
        userEvent.click(loginButton);
        expect(handleSubmitMock).toHaveBeenCalled();
      });*/
})

