import { showCommand } from "./show.js";

describe("showCommand", () => {
  it("should show list all files in package", () => {
    showCommand.run({ command: "show", args: [] });
  });
});
