import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom" 
import { JSDOM } from "jsdom"

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import UsernameForm from ".";
import { after } from "lodash";

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

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
                    setButtonText={() => {}}
                  />
            </BrowserRouter>
        )
    })
})

afterEach(() => {
    cleanup()
})

it("Renders the Username form without crashing", () => {
    const formElement = screen.getByTestId("login-form")
    expect(formElement).toBeInTheDocument()
})

