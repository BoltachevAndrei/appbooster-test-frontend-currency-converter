import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { RatesCell } from "./index";

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

describe("RatesCell works correctly", () => {
  it("renders children correctly", () => {
    const mockData: string = "test";
    act(() => {
      render(
        <table>
          <tbody>
            <tr>
              <RatesCell>{mockData}</RatesCell>
            </tr>
          </tbody>
        </table>,
        container
      );
    });
    const cell: HTMLTableCellElement | null | undefined = container?.querySelector("td");
    expect(cell).toBeTruthy();
    if (cell) {
      expect(cell.innerHTML).toBe(mockData);
    }
  });
});
