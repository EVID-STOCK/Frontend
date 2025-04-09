import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
import { atom } from 'recoil';

interface SelectedCompanyStock {
  id: number | null; // 회사 id
  companyName: string; // 회사명
  inStock?: number; // 보유중인 주식
  firstMenuPrice: number; // 평균 매입가/전 라운드 가격
  secondMenuPrice: number; // 현 라운드 가격
  difference: number; // 가격 차이
  percent: number; // 가격 변동 수치
}

// 모달창 안에 들어있는 값 관련 내용 - 종목명, 전 라운드 가격, 현 라운드 가격, 안내 멘트
export const selectedCompanyStockState = atom<SelectedCompanyStock>({
  key: 'selectedCompanyStockState',
  default: {
    id: null,
    companyName: '',
    firstMenuPrice: 0,
    secondMenuPrice: 0,
    difference: 0,
    percent: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export interface ModalState {
  [key: string]: { isOpen: boolean; state: string | null };
}

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const SlidingPanelState = atom<string | null>({
  key: 'slidingPaneleState',
  default: null,
});
