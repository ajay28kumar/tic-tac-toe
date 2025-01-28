import { create } from "zustand";

const useStore = create((set) => ({
  boxData: {},
  boxIds: [],
  setInitialBoxData: (initData) =>
    set(() => {
      const boxIds = [];
      const boxData = {};
      initData.forEach((itm) => {
        boxIds.push(itm.id);
        boxData[itm.id] = itm;
      });
      return {
        boxData,
        boxIds,
      };
    }),
  updateBoxData: (id, data) =>
    set(({ boxData }) => ({
      boxData: {
        ...boxData,
        [id]: {...data},
      },
    })),
}));

export default useStore;
