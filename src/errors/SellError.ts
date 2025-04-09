export class SellError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'SellError';
    this.code = code;

    Object.setPrototypeOf(this, SellError.prototype);
  }
}
