import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { AppStore, AppStoreContext } from "../../stores/app";
import { Result } from "./index";
import { act } from "react-dom/test-utils";

const mockAppStore = new AppStore();

let container: HTMLElement | null = null;

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

describe("Result works correctly", () => {
  beforeEach(() => {
    act(() => {
      render(
        <AppStoreContext.Provider value={mockAppStore}>
          <Result />
        </AppStoreContext.Provider>,
        container
      );
    });
  });
  it("change of 'result' works correctly", () => {
    const result: HTMLInputElement | null | undefined = container?.querySelector("[data-testid='result']");
    expect(result).toBeTruthy();
    if (result) {
      expect(result.value).toBe("");
      mockAppStore.setResult("1");
      expect(result.value).toBe("1");
    }
  });
});
