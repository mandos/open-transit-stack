
export class CommandNotFoundError extends Error {
  constructor(message: string, public command: string) {
    super(message);
    this.name = "WrongCommandError";
  }
}
