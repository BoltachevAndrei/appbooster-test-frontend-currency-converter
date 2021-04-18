import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { AppStore, AppStoreContext } from "../../stores/app";
import { CurrencyPicker } from "./index";
import { FetchRatesResponse } from "../../interfaces";
import { act, Simulate } from "react-dom/test-utils";

const mockAppStore = new AppStore();

const mockFetchRatesResponse: FetchRatesResponse = {
  base: "RUB",
  date: "20210101",
  rates: {
    USD: 1.1,
    EUR: 1.2,
  },
};

mockAppStore.setFetchRatesResponse(mockFetchRatesResponse);

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

describe("CurrencyPicker works correctly", () => {
  it("'from' renders correctly with mockAppStore data", () => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <CurrencyPicker name="from" />
        </AppStoreContext.Provider>,
        container
      );
    });
    const options: NodeListOf<HTMLOptionElement> | null | undefined = container?.querySelectorAll(
      "[data-testid='picker-option']"
    );
    expect(options?.length).toBe(4);
  });
  it("change currency in 'from' component update 'from' in store", () => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <CurrencyPicker name="from" />
        </AppStoreContext.Provider>,
        container
      );
    });
    const select: HTMLSelectElement | null | undefined = container?.querySelector("[data-testid='picker-select']");
    expect(select).toBeTruthy();
    if (select) {
      expect(mockAppStore.from).toBe("");
      select.value = "USD";
      Simulate.change(select, { bubbles: true });
      expect(mockAppStore.from).toBe("USD");
    }
  });
  it("change currency in 'to' component update 'to' in store", () => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <CurrencyPicker name="to" />
        </AppStoreContext.Provider>,
        container
      );
    });
    const select: HTMLSelectElement | null | undefined = container?.querySelector("[data-testid='picker-select']");
    expect(select).toBeTruthy();
    if (select) {
      expect(mockAppStore.to).toBe("RUB");
      select.value = "USD";
      Simulate.change(select, { bubbles: true });
      expect(mockAppStore.to).toBe("USD");
    }
  });
});
