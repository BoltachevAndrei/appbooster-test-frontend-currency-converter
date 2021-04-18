import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import { FavoriteButton } from "./index";
import { AppStore, AppStoreContext } from "../../stores/app";

const mockAppStore = new AppStore();

const resetMockAppStoreToDefaults = (): void => {
  mockAppStore.setFavoriteCurrency("RUB");
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

describe("FavoriteButton works correctly", () => {
  beforeEach(() => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <FavoriteButton />
        </AppStoreContext.Provider>,
        container
      );
    });
    resetMockAppStoreToDefaults();
  });
  it("if 'to' === 'favoriteCurrency' then FavoriteButton is disabled", () => {
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='favorite-button']");
    expect(button).toBeTruthy();
    if (button) {
      expect(button.hasAttribute("disabled")).toBe(true);
    }
  });
  it("if 'to' !== 'favoriteCurrency' then FavoriteButton is enabled", () => {
    mockAppStore.setFavoriteCurrency("USD");
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='favorite-button']");
    expect(button).toBeTruthy();
    if (button) {
      expect(button.hasAttribute("disabled")).toBe(false);
    }
  });
  it("clicking FavoriteButton makes it disabled and change 'favoriteCurrency' === 'to'", () => {
    mockAppStore.setTo("USD");
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='favorite-button']");
    expect(button).toBeTruthy();
    if (button) {
      Simulate.click(button, { bubbles: true });
      expect(button.hasAttribute("disabled")).toBe(true);
      expect(mockAppStore.favoriteCurrency).toBe("USD");
    }
  });
});
