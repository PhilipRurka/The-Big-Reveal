import { createContext, ReactNode } from "react";

type ContextProviderType = {
  children: ReactNode;
};

export const initialState = {
  
};

const Context = createContext({})

export function ContextProvider({ children }: ContextProviderType) {
  const value = {}

  return (
    <Context.Provider value={value}>
        {children}
    </Context.Provider>
  );
}