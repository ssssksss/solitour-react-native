import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 1. 상태 인터페이스 정의
interface ModalState {
  isOpen: boolean,
  navigate: string,
}

// 2. 액션 인터페이스 정의
interface ModalActions {
  initialize: () => void;
  setModal: (data: Partial<ModalState>) => void;
}

// 3. 초기 상태 정의
const initialState: ModalState = {
  isOpen: false,
  navigate: '',
};

// 4. 상태 및 액션 생성
const ModalStore: StateCreator<ModalState & ModalActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setModal: data =>
    set(() => ({
      ...data,
    })),
});

const useModalStore = create<ModalState & ModalActions>()<any>(
  process.env.NODE_ENV === 'development' ? devtools(ModalStore) : ModalStore,
);

export type useModalStoreType = ModalState & ModalActions;

export default useModalStore;
