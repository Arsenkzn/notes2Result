import { createContext, useContext, useMemo } from "react";

type AppContextType = {
  state: any;
  dispatch: React.Dispatch<any>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProviders({
  children,
  state,
  dispatch,
}: {
  children: React.ReactNode;
  state: any;
  dispatch: React.Dispatch<any>;
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
