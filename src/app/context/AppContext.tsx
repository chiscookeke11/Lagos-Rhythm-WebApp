"use client";

import { PopulationTypeInterface } from "@/Types/UserDataType";
import React, { createContext, useContext, useState } from "react";





// 1. Define the full shape of the context, including the state setters if needed.
interface AppContextProps {
  populationType: PopulationTypeInterface;
  setPopulationType: React.Dispatch<React.SetStateAction<PopulationTypeInterface>>;

  populationAmount: number;
  setPopulationAmount: React.Dispatch<React.SetStateAction<number>>;

  partcipantsCount: number;
  setParticipantsCount: React.Dispatch<React.SetStateAction<number>>;
}

// 2. Create the context with correct initial undefined type.
const AppContext = createContext<AppContextProps | undefined>(undefined);

// 3. Create the Provider with the full value passed to the context.
export const LagosRhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [populationType, setPopulationType] = useState<PopulationTypeInterface>("1-3 (circle)");
  const [populationAmount, setPopulationAmount] = useState(0);
  const [partcipantsCount, setParticipantsCount] = useState(1);

  return (
    <AppContext.Provider
      value={{
        populationType,
        setPopulationType,
        populationAmount,
        setPopulationAmount,
        partcipantsCount,
        setParticipantsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 4. Fix the conditional check: you're checking `AppContext` instead of `context`
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a LagosRhythmProvider");
  }
  return context;
};
