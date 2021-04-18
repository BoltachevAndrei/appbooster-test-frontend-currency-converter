import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { ConvertButton } from "./index";
import { act, Simulate } from "react-dom/test-utils";
import { AppStore, AppStoreContext } from "../../stores/app";
import { FetchRatesResponse } from "../../interfaces";

const mockAppStore = new AppStore();

const resetMockAppStoreToDefaults = (): void => {
  mockAppStore.setFrom("");
  mockAppStore.setTo("RUB");
  mockAppStore.setIsFetchingData(false);
};

let container: Element | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

const mockResponse: FetchRatesResponse = {
  base: "RUB",
  date: "20210101",
  rates: {
    USD: 1.1,
  },
};

describe("ConvertButton works correctly", () => {
  beforeEach(() => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <ConvertButton />
        </AppStoreContext.Provider>,
        container
      );
    });
    resetMockAppStoreToDefaults();
  });
  it("button is disabled if 'from' is empty", () => {
    mockAppStore.setFrom("");
    mockAppStore.setTo("RUB");
    mockAppStore.setIsFetchingData(false);
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='convert-button']");
    expect(button).toBeTruthy();
    expect(button?.hasAttribute("disabled")).toBe(true);
  });
  it("button is disabled if 'to' is empty", () => {
    mockAppStore.setFrom("USD");
    mockAppStore.setTo("");
    mockAppStore.setIsFetchingData(false);
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='convert-button']");
    expect(button).toBeTruthy();
    expect(button?.hasAttribute("disabled")).toBe(true);
  });
  it("button is disabled if 'isFetchingData' is true", () => {
    mockAppStore.setFrom("USD");
    mockAppStore.setTo("RUB");
    mockAppStore.setIsFetchingData(true);
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='convert-button']");
    expect(button).toBeTruthy();
    expect(button?.hasAttribute("disabled")).toBe(true);
  });
  it("button is enabled if 'from' is not empty and 'to' is not empty and 'isFetchingData' is false", () => {
    mockAppStore.setFrom("USD");
    mockAppStore.setTo("RUB");
    mockAppStore.setIsFetchingData(false);
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='convert-button']");
    expect(button).toBeTruthy();
    expect(button?.hasAttribute("disabled")).toBe(false);
  });
  it("pressing button proceed currency convert", () => {
    mockAppStore.setFrom("USD");
    mockAppStore.setTo("RUB");
    mockAppStore.setAmount("1");
    mockAppStore.setResult("");
    mockAppStore.setFetchRatesResponse(mockResponse);
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='convert-button']");
    expect(button).toBeTruthy();
    if (button) {
      Simulate.click(button, { bubbles: true });
    }
    expect(mockAppStore.result).not.toBe("");
  });
});
