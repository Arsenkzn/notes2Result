import { createContext, useContext, useMemo } from "react";
import { AppContextType } from "../entities/note/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProviders({
  children,
  state,
  dispatch,
}: {
  children: React.ReactNode;
  state: string;
  dispatch: React.Dispatch<string>;
}) {
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
