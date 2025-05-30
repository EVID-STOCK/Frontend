const PURCHASE_ERROR_MESSAGES = {
  NO_STOCK_INPUT: '몇 주를 살지 입력해주세요.',
  NO_ASSET: '잔액이 부족합니다.',
  NO_COMPANY: '회사 정보가 없습니다.',
  NO_ROOM: '존재하지 않는 방입니다.',
};

export class PurchaseError extends Error {
  code: keyof typeof PURCHASE_ERROR_MESSAGES;

  constructor(code: keyof typeof PURCHASE_ERROR_MESSAGES) {
    super(PURCHASE_ERROR_MESSAGES[code]);
    this.name = 'PurchaseError';
    this.code = code;

    Object.setPrototypeOf(this, PurchaseError.prototype);
  }
}
