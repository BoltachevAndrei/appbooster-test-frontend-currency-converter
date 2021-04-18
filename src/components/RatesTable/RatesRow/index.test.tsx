import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { AppStore, AppStoreContext } from "../../../stores/app";
import { RatesRow } from "./index";
import { act, Simulate } from "react-dom/test-utils";
import { RatesRowProps } from "./interfaces";

const mockAppStore = new AppStore();

const mockRatesRowProps: RatesRowProps = {
  code: "USD",
  rate: 1.1,
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

describe("RatesRow works correctly", () => {
  beforeEach(() => {
    act(() => {
      const { code, rate } = mockRatesRowProps;
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <table>
            <tbody>
              <RatesRow code={code} rate={rate} />
            </tbody>
          </table>
        </AppStoreContext.Provider>,
        container
      );
    });
  });
  it("renders correctly with mockRatesRowProps", () => {
    const { code, rate } = mockRatesRowProps;
    const ratesCode: HTMLTableCellElement | null | undefined = container?.querySelector("[data-testid='rates-code']");
    const ratesRate: HTMLTableCellElement | null | undefined = container?.querySelector("[data-testid='rates-rate']");
    expect(ratesCode).toBeTruthy();
    if (ratesCode) {
      expect(ratesCode.innerHTML).toBe(code);
    }
    expect(ratesRate).toBeTruthy();
    if (ratesRate) {
      expect(ratesRate.innerHTML).toBe(String(rate));
    }
  });
  it("click on non-favorite currency checkbox make this currency favorite", () => {
    const ratesRow: HTMLTableRowElement | null | undefined = container?.querySelector("[data-testid='rates-row']");
    expect(ratesRow).toBeTruthy();
    const ratesFavorite: HTMLInputElement | null | undefined = container?.querySelector(
      "[data-testid='rates-favorite']"
    );
    expect(ratesFavorite).toBeTruthy();
    if (ratesRow && ratesFavorite) {
      mockAppStore.setFavoriteCurrencies([]);
      expect(ratesFavorite.checked).toBe(false);
      expect(mockAppStore.favoriteCurrencies.length).toBe(0);
      Simulate.change(ratesFavorite);
      expect(ratesFavorite.checked).toBe(true);
      expect(mockAppStore.favoriteCurrencies.length).toBe(1);
      expect(mockAppStore.favoriteCurrencies).toContain(mockRatesRowProps.code);
    }
  });
  it("click on favorite currency checkbox make this currency non-favorite", () => {
    const ratesRow: HTMLTableRowElement | null | undefined = container?.querySelector("[data-testid='rates-row']");
    expect(ratesRow).toBeTruthy();
    const ratesFavorite: HTMLInputElement | null | undefined = container?.querySelector(
      "[data-testid='rates-favorite']"
    );
    expect(ratesFavorite).toBeTruthy();
    if (ratesRow && ratesFavorite) {
      mockAppStore.setFavoriteCurrencies([mockRatesRowProps.code]);
      expect(ratesFavorite.checked).toBe(true);
      expect(mockAppStore.favoriteCurrencies.length).toBe(1);
      expect(mockAppStore.favoriteCurrencies).toContain(mockRatesRowProps.code);
      Simulate.change(ratesFavorite);
      expect(ratesFavorite.checked).toBe(false);
      expect(mockAppStore.favoriteCurrencies.length).toBe(0);
    }
  });
  it("favorite currency has 'lightblue' background color", () => {
    const ratesRow: HTMLTableRowElement | null | undefined = container?.querySelector("[data-testid='rates-row']");
    expect(ratesRow).toBeTruthy();
    const ratesFavorite: HTMLInputElement | null | undefined = container?.querySelector(
      "[data-testid='rates-favorite']"
    );
    expect(ratesFavorite).toBeTruthy();
    if (ratesRow && ratesFavorite) {
      mockAppStore.setFavoriteCurrencies([mockRatesRowProps.code]);
      expect(ratesFavorite.checked).toBe(true);
      expect(mockAppStore.favoriteCurrencies.length).toBe(1);
      expect(getComputedStyle(ratesRow)).toHaveProperty("background-color", "lightblue");
    }
  });
  it("non-favorite currency has 'white' background color", () => {
    const ratesRow: HTMLTableRowElement | null | undefined = container?.querySelector("[data-testid='rates-row']");
    expect(ratesRow).toBeTruthy();
    const ratesFavorite: HTMLInputElement | null | undefined = container?.querySelector(
      "[data-testid='rates-favorite']"
    );
    expect(ratesFavorite).toBeTruthy();
    if (ratesRow && ratesFavorite) {
      mockAppStore.setFavoriteCurrencies([]);
      expect(ratesFavorite.checked).toBe(false);
      expect(mockAppStore.favoriteCurrencies.length).toBe(0);
      expect(getComputedStyle(ratesRow)).toHaveProperty("background-color", "white");
    }
  });
});
