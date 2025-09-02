import appStore from "./appStore";


export default appStore;
export type StoreState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
