import { create } from 'zustand';
/**
  * 字段
  */
type State = {
  bears: number;
};

const stateField = {
  bears: 0,
};
/**
  * 方法
  */
type Action = {
  increase: () => void;
  increaseAsync: () => Promise<void>;
};

export type BearState = State & Action;

export const useBearStore = create<BearState>()((set, get) => ({
  ...stateField,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  increaseAsync: async () => {
    set({
      bears: get().bears + 1
    });
  }
}));

export const { setState } = useBearStore;
