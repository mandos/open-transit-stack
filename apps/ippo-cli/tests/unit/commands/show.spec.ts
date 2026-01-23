import { showCommand } from "../../../src/commands/show.js";
import { consoleOutput } from "../../../src/common.js";

describe.todo("showCommand", () => {
  it("should show list all files in package", async () => {
    await expect(showCommand.run(["show"], consoleOutput)).resolves.toBe(0);
  });
});
