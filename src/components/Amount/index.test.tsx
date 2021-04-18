import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Amount } from "./index";
import { AppStore, AppStoreContext } from "../../stores/app";

const mockAppStore = new AppStore();

const resetMockAppStoreToDefaults = (): void => {
  mockAppStore.setAmount("1");
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

describe("Amount works correctly", () => {
  beforeEach(() => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <Amount />
        </AppStoreContext.Provider>,
        container
      );
    });
    resetMockAppStoreToDefaults();
  });
  it("paste '1111.1111' changes value from '1' to '1111.1111'", () => {
    const input: HTMLInputElement | null | undefined = container?.querySelector("[data-testid='amount']");
    expect(input).toBeTruthy();
    if (input) {
      input.value = "1111.1111";
      Simulate.change(input);
      expect(input.value).toBe("1111.1111");
    }
  });
  it("paste '11.11' changes value from '1' to '11.11'", () => {
    const input: HTMLInputElement | null | undefined = container?.querySelector("[data-testid='amount']");
    expect(input).toBeTruthy();
    if (input) {
      input.value = "11.11";
      Simulate.change(input);
      expect(input.value).toBe("11.11");
    }
  });
  it("paste 'a111.1111' dont change value from '1'", () => {
    const input: HTMLInputElement | null | undefined = container?.querySelector("[data-testid='amount']");
    expect(input).toBeTruthy();
    if (input) {
      input.value = "a111.1111";
      Simulate.change(input);
      expect(input.value).toBe("1");
    }
  });
  it("paste '1111.11111111' dont change value from '1'", () => {
    const input: HTMLInputElement | null | undefined = container?.querySelector("[data-testid='amount']");
    expect(input).toBeTruthy();
    if (input) {
      input.value = "1111.11111111";
      Simulate.change(input);
      expect(input.value).toBe("1");
    }
  });
  it("typing '1111.111111' changes value from '1' to '1111.1111'", () => {
    const input: HTMLInputElement | null | undefined = container?.querySelector("[data-testid='amount']");
    expect(input).toBeTruthy();
    if (input) {
      input.value = "11";
      Simulate.change(input);
      input.value = "111";
      Simulate.change(input);
      input.value = "1111";
      Simulate.change(input);
      input.value = "1111.";
      Simulate.change(input);
      input.value = "1111.1";
      Simulate.change(input);
      input.value = "1111.11";
      Simulate.change(input);
      input.value = "1111.111";
      Simulate.change(input);
      input.value = "1111.1111";
      Simulate.change(input);
      input.value = "1111.11111";
      Simulate.change(input);
      input.value = "1111.111111";
      Simulate.change(input);
      expect(input.value).toBe("1111.1111");
    }
  });
});
