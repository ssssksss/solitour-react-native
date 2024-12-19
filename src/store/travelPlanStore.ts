import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 1. 상태 인터페이스 정의
interface TravelPlanState {
  gender: string;
  region: string;
  startDate: string;
  endDate: string;
  movementType: string;
  themeType: string;
  activityType: string;
  groupType: string;
  relationship: string;
}

// 2. 액션 인터페이스 정의
interface TravelPlanActions {
  initialize: () => void;
  setTravelPlan: (data: Partial<TravelPlanState>) => void;
}

// 3. 초기 상태 정의
const initialState: TravelPlanState = {
  gender: '',
  region: '',
  startDate: '',
  endDate: '',
  movementType: '',
  themeType: '',
  activityType: '',
  groupType: '',
  relationship: '',
};

// 4. 상태 및 액션 생성
const TravelPlanStore: StateCreator<TravelPlanState & TravelPlanActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setTravelPlan: data =>
    set(() => ({
      ...data,
    })),
});

const useTravelPlanStore = create<TravelPlanState & TravelPlanActions>()<any>(
  process.env.NODE_ENV === 'development' ? devtools(TravelPlanStore) : TravelPlanStore,
);

export type useTravelPlanStoreType = TravelPlanState & TravelPlanActions;

export default useTravelPlanStore;
