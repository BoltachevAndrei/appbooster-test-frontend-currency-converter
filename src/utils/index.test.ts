import { removeDuplicatesFromArray } from "./index";

describe("removeDuplicatesFromArray works correctly", () => {
  it("[1, 2, 1, 1, 3] should return [1, 2, 3]", () => {
    expect(removeDuplicatesFromArray([1, 2, 1, 1, 3])).toEqual([1, 2, 3]);
  });
  it("['a', 'a', 'c', 'a', 'b'] should return ['a', 'c', 'b']", () => {
    expect(removeDuplicatesFromArray(["a", "a", "c", "a", "b"])).toEqual(["a", "c", "b"]);
  });
});
