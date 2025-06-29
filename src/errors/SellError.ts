const SELL_ERROR_MESSAGES = {
  NO_STOCK_INPUT: '몇 주를 팔지 입력해주세요.',
  NO_STOCK: '보유중인 주식이 부족합니다.',
  NO_COMPANY: '회사 정보가 없습니다.',
  NO_ROOM: '존재하지 않는 방입니다.',
};

export class SellError extends Error {
  code: keyof typeof SELL_ERROR_MESSAGES;

  constructor(code: keyof typeof SELL_ERROR_MESSAGES) {
    super(SELL_ERROR_MESSAGES[code]);
    this.name = 'SellError';
    this.code = code;

    Object.setPrototypeOf(this, SellError.prototype);
  }
}
