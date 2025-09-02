"use client";

import { Provider } from "react-redux";
import appStore from "./appStore";

interface Props {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
  return <Provider store={appStore}>{children}</Provider>;
}
