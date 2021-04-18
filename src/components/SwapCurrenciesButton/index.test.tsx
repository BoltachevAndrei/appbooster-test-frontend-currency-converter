import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { AppStore, AppStoreContext } from "../../stores/app";
import { SwapCurrenciesButton } from "./index";

const mockAppStore = new AppStore();

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

describe("SwapCurrenciesButton works correctly", () => {
  beforeEach(() => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <SwapCurrenciesButton />
        </AppStoreContext.Provider>,
        container
      );
    });
  });
  it("pressing button swap 'from' and 'to' values", () => {
    const button: HTMLButtonElement | null | undefined = container?.querySelector("[data-testid='swap-button']");
    expect(button).toBeTruthy();
    if (button) {
      expect(mockAppStore.to).toBe("RUB");
      expect(mockAppStore.from).toBe("");
      Simulate.click(button, { bubbles: true });
      expect(mockAppStore.to).toBe("");
      expect(mockAppStore.from).toBe("RUB");
    }
  });
});
