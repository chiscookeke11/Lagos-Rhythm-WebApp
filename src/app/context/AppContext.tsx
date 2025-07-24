"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PopulationTypeInterface } from "@/Types/UserDataType";


interface AppContextProps {
  populationType: PopulationTypeInterface;
  setPopulationType: React.Dispatch<React.SetStateAction<PopulationTypeInterface>>;

  populationAmount: number;
  setPopulationAmount: React.Dispatch<React.SetStateAction<number>>;

  participantsCount: number;
  setParticipantsCount: React.Dispatch<React.SetStateAction<number>>;

  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
}


const AppContext = createContext<AppContextProps | undefined>(undefined);


const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};


export const LagosRhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const [populationType, setPopulationType] = useState<PopulationTypeInterface>(
    getFromLocalStorage("populationType", "1-3 (circle)")
  );
  const [populationAmount, setPopulationAmount] = useState<number>(
    getFromLocalStorage("populationAmount", 0)
  );
  const [participantsCount, setParticipantsCount] = useState<number>(
    getFromLocalStorage("participantsCount", 1)
  );
  const [selectedTheme, setSelectedTheme] = useState<string>(
    getFromLocalStorage("selectedTheme", "")
  );


  useEffect(() => {
    localStorage.setItem("populationType", JSON.stringify(populationType));
  }, [populationType]);

  useEffect(() => {
    localStorage.setItem("populationAmount", JSON.stringify(populationAmount));
  }, [populationAmount]);

  useEffect(() => {
    localStorage.setItem("participantsCount", JSON.stringify(participantsCount));
  }, [participantsCount]);

  useEffect(() => {
    localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
  }, [selectedTheme]);

  return (
    <AppContext.Provider
      value={{
        populationType,
        setPopulationType,
        populationAmount,
        setPopulationAmount,
        participantsCount,
        setParticipantsCount,
        selectedTheme,
        setSelectedTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a LagosRhythmProvider");
  }
  return context;
};
