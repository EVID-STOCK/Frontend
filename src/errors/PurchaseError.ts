export class PurchaseError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'PurchaseError';
    this.code = code;

    Object.setPrototypeOf(this, PurchaseError.prototype);
  }
}
