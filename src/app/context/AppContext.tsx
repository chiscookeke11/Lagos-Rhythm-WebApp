"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PopulationTypeInterface } from "@/Types/UserDataType";
import { BlogDataType } from "@/Types/blogTypes";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../config/firebaseClient";
import { ClerkUser } from "@/Types/UserType";






interface AppContextProps {
  populationType: PopulationTypeInterface;
  setPopulationType: React.Dispatch<React.SetStateAction<PopulationTypeInterface>>;

  populationAmount: number;
  setPopulationAmount: React.Dispatch<React.SetStateAction<number>>;

  participantsCount: number;
  setParticipantsCount: React.Dispatch<React.SetStateAction<number>>;

  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;


  blogs: BlogDataType[] | null;
  setBlogs: React.Dispatch<React.SetStateAction<BlogDataType[] | null>>

  users: ClerkUser[] | null;
  setUsers: React.Dispatch<React.SetStateAction<ClerkUser[] | null>>



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
  const [participantsCount, setParticipantsCount] = useState<number>(1)


  const [selectedTheme, setSelectedTheme] = useState<string>(
    getFromLocalStorage("selectedTheme", "")
  );

  const [blogs, setBlogs] = useState<BlogDataType[] | null>(null);

  const [users, setUsers] = useState<ClerkUser[] | null>([])



  useEffect(() => {
    localStorage.setItem("populationType", JSON.stringify(populationType));
  }, [populationType]);

  useEffect(() => {
    localStorage.setItem("populationAmount", JSON.stringify(populationAmount));
  }, [populationAmount]);


  useEffect(() => {
    localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
  }, [selectedTheme]);


  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "blogs"));
        const items: BlogDataType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            text: data.text,
            image: data.image,
            author: data.author,
            createdAt: data.createdAt?.toDate().toDateString() || "",
          };
        });
        setBlogs(items);
      }
      catch (error) {
        console.error("error fetching data:", error)
      }

    }
    fetchBlogData()
  }, [])


  console.log(blogs)


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
        blogs,
        setBlogs,
        users,
        setUsers
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
