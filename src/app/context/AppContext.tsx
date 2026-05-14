'use client'

import React, { createContext, useContext, useEffect, useState, SetStateAction } from "react";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { fireDB } from "@/app/config/firebaseClient";
import { PopulationTypeInterface } from "@/Types/UserDataType";
import { BlogDataType } from "@/Types/blogTypes";
import { ClerkUser } from "@/Types/UserType";
import { galleryTypes } from "@/Types/galleryType";
import { ProfileDataType } from "@/Types/ProfileDataType";
import { LocationResourceDataType } from "@/Types/LocationResourceDataType";
import { StreetRhythmRouteBundle } from "@/Types/StreetRhythmRouteType";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { buildStreetRhythmRouteBundle } from "@/lib/street-rhythm";

// ====================== Context Interface ======================
interface AppContextProps {
  // --- General app state ---
  populationType: PopulationTypeInterface;
  setPopulationType: React.Dispatch<React.SetStateAction<PopulationTypeInterface>>;
  populationAmount: number;
  setPopulationAmount: React.Dispatch<React.SetStateAction<number>>;
  participantsCount: number;
  setParticipantsCount: React.Dispatch<React.SetStateAction<number>>;
  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;

  // --- Blogs ---
  blogs: BlogDataType[] | null;
  setBlogs: React.Dispatch<React.SetStateAction<BlogDataType[] | null>>;

  // --- Users ---
  users: ClerkUser[] | null;
  setUsers: React.Dispatch<React.SetStateAction<ClerkUser[] | null>>;

  // --- Gallery ---
  galleryImages: galleryTypes[] | null;
  setGalleryImages: React.Dispatch<React.SetStateAction<galleryTypes[] | null>>;

  // --- User profile ---
  userData: ProfileDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<ProfileDataType | null>>;
  email?: string;
  fetchUserData: (email: string) => void;

  // --- Pricing / Packages ---
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  inpersonTourPackage: string;
  setInpersonTourPackage: React.Dispatch<SetStateAction<string>>;
  selectedInpersonTheme: string;
  setSelectedInpersonTheme: React.Dispatch<SetStateAction<string>>;

  // --- Search / Directions ---
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  results: LocationResourceDataType[] | null;
  selectedRoute: StreetRhythmRouteBundle | null;
  videoResults: LocationResourceDataType[] | null;
  textResults: LocationResourceDataType[] | null;
  soundResults: LocationResourceDataType[] | null;
  imageResults: LocationResourceDataType[] | null;
  AIResults: LocationResourceDataType[] | null;
  currentTab: "Videos" | "Text" | "AI direction" | "Sound recording" | "image";
  setCurrentTab: React.Dispatch<React.SetStateAction<"Videos" | "Text" | "AI direction" | "Sound recording" | "image">>;
  loading: boolean;
  findDirection: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  locationInWords: string | null;
  hasSearched: boolean,
  setHasSearched: React.Dispatch<SetStateAction<boolean>>
}

// ====================== Context Creation ======================
const AppContext = createContext<AppContextProps | undefined>(undefined);

// ====================== Helper ======================
const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// ====================== Provider ======================
export const LagosRhythmProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  // ---------------------- App / Profile State ----------------------
  const [populationType, setPopulationType] = useState<PopulationTypeInterface>(getFromLocalStorage("populationType", "1-3 (circle)"));
  const [populationAmount, setPopulationAmount] = useState<number>(getFromLocalStorage("populationAmount", 0));
  const [participantsCount, setParticipantsCount] = useState<number>(1);
  const [selectedTheme, setSelectedTheme] = useState<string>(getFromLocalStorage("selectedTheme", ""));
  const [blogs, setBlogs] = useState<BlogDataType[] | null>(null);
  const [users, setUsers] = useState<ClerkUser[] | null>([]);
  const [galleryImages, setGalleryImages] = useState<galleryTypes[] | null>(null);
  const [userData, setUserData] = useState<ProfileDataType | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [inpersonTourPackage, setInpersonTourPackage] = useState<string>(getFromLocalStorage("inpersonPackage", ""));
  const [selectedInpersonTheme, setSelectedInpersonTheme] = useState<string>(getFromLocalStorage("selectedPersonTheme", ""));

  // ---------------------- Search / Directions State ----------------------
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LocationResourceDataType[] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<StreetRhythmRouteBundle | null>(null);
  const [videoResults, setVideoResults] = useState<LocationResourceDataType[] | null>([]);
  const [textResults, setTextResults] = useState<LocationResourceDataType[] | null>([]);
  const [soundResults, setSoundResults] = useState<LocationResourceDataType[] | null>([]);
  const [imageResults, setImageResults] = useState<LocationResourceDataType[] | null>([]);
  const [AIResults, setAIResults] = useState<LocationResourceDataType[] | null>([]);
  const [currentTab, setCurrentTab] = useState<"Videos" | "Text" | "AI direction" | "Sound recording" | "image">("Videos");
  const [locationInWords, setLocationInWords] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false)

  const normalizeText = (text: string) => text.toLowerCase().trim();
  const fromNormalized = normalizeText(from);
  const toNormalized = normalizeText(to);

  const matchesSegmentStop = (resource: LocationResourceDataType, searchValue: string) => {
    const normalizedSearch = normalizeText(searchValue);

    return resource.segment_stops?.some((stop) => {
      const stopName = normalizeText(stop.normalized_stop_name ?? stop.stop_name);
      return stopName === normalizedSearch || stopName.includes(normalizedSearch);
    }) ?? false;
  };

  const router  = useRouter()

  // ---------------------- Local Storage Effects ----------------------
  useEffect(() => { localStorage.setItem("populationType", JSON.stringify(populationType)); }, [populationType]);
  useEffect(() => { localStorage.setItem("populationAmount", JSON.stringify(populationAmount)); }, [populationAmount]);
  useEffect(() => { localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme)); }, [selectedTheme]);
  useEffect(() => { localStorage.setItem("inpersonPackage", JSON.stringify(inpersonTourPackage)); }, [inpersonTourPackage]);
  useEffect(() => { localStorage.setItem("selectedPersonTheme", JSON.stringify(selectedInpersonTheme)); }, [selectedInpersonTheme]);

  // ---------------------- Fetch Blogs ----------------------
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const q = query(collection(fireDB, "blogs"), orderBy("addedAt", "desc"));
        const snapshot = await getDocs(q);
        const items: BlogDataType[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, title: data.title, text: data.text, image: data.image, author: data.author, addedAt: data.addedAt?.toDate().toDateString() || "" };
        });
        setBlogs(items);
      } catch (err) { console.error("Error fetching blogs:", err); }
    };
    fetchBlogData();
  }, []);

  // ---------------------- Fetch Gallery ----------------------
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, "gallery"));
        const items: galleryTypes[] = snapshot.docs.map(doc => ({ id: doc.id, image: doc.data().image, text: doc.data().title }));
        setGalleryImages(items);
      } catch (err) { console.error("Error fetching gallery images:", err); }
    };
    fetchGalleryImages();
  }, []);

  // ---------------------- Fetch User Data ----------------------
  const fetchUserData = async (email: string) => {
    if (!email) return;
    try {
      const docSnap = await getDoc(doc(fireDB, "user_profile", email));
      if (docSnap.exists()) {
        const data = docSnap.data() as ProfileDataType;
        setUserData(data);
      }
    } catch (err) { console.error("Error fetching user data:", err); }
  };
  useEffect(() => { if (email) fetchUserData(email); }, [email]);

  // ---------------------- Geolocation ----------------------
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
      const data = await res.json();
      setLocationInWords(data.display_name);
    });
  }, []);

  // ---------------------- Search / Directions ----------------------
  const findDirection = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);

    let nextResults: LocationResourceDataType[] = [];

    try {
      const q1 = query(collection(fireDB, "routes_resources"), where("from_keywords", "array-contains-any", [fromNormalized]));
      const q2 = query(collection(fireDB, "routes_resources"), where("to_keywords", "array-contains-any", [toNormalized]));
      const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

      const data1 = snapshot1.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<LocationResourceDataType, "id">) }));
      const data2 = snapshot2.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<LocationResourceDataType, "id">) }));

      const mergedData = data1.filter(r => data2.some(x => x.id === r.id));

      if (mergedData.length > 0) {
        nextResults = mergedData;
        setResults(nextResults);
        setCurrentTab("Videos");
        return;
      }

      const allSnapshot = await getDocs(collection(fireDB, "routes_resources"));
      const allResources = allSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<LocationResourceDataType, "id">) }));

      const matchedRouteKeys = new Set<string>();

      for (const resource of allResources) {
        if (!resource.segment_stops || resource.segment_stops.length < 1) continue;

        const fromStopMatch = matchesSegmentStop(resource, fromNormalized);
        const toStopMatch = matchesSegmentStop(resource, toNormalized);

        if (fromStopMatch && toStopMatch) {
          matchedRouteKeys.add(resource.route_key);
        }
      }

      const fallbackResults = matchedRouteKeys.size > 0
        ? allResources.filter((resource) => matchedRouteKeys.has(resource.route_key))
        : [];

      nextResults = fallbackResults;
      setResults(nextResults);
      setCurrentTab("Videos");
    } catch (err) {
      console.error("Error finding direction:", err);
    } finally {
      setLoading(false);
      setHasSearched(true)
      router.push(`/street-rhythm/${nextResults.length > 0 ? "#route" : "#no-route-found"}`)
    }
  };

  // ---------------------- Filter Results ----------------------
  useEffect(() => {
    if (!results || results.length < 1) {
      setSelectedRoute(null);
      setVideoResults([]);
      setTextResults([]);
      setImageResults([]);
      setSoundResults([]);
      setAIResults([]);
      return;
    }

    const routeBundle = buildStreetRhythmRouteBundle(results);
    setSelectedRoute(routeBundle);
    setVideoResults(routeBundle?.videos ?? []);
    setTextResults(routeBundle?.overviews ?? []);
    setImageResults(routeBundle?.landmarks ?? []);
    setSoundResults(routeBundle?.audioGuides ?? []);
    setAIResults(routeBundle?.aiDirections ?? []);
  }, [results]);

  return (
    <AppContext.Provider value={{
      populationType, setPopulationType,
      populationAmount, setPopulationAmount,
      participantsCount, setParticipantsCount,
      selectedTheme, setSelectedTheme,
      blogs, setBlogs,
      users, setUsers,
      galleryImages, setGalleryImages,
      userData, setUserData,
      email,
      fetchUserData,
      price, setPrice,
      inpersonTourPackage, setInpersonTourPackage,
      selectedInpersonTheme, setSelectedInpersonTheme,
      from, setFrom,
      to, setTo,
      selectedRoute,
      results, videoResults, textResults, soundResults, imageResults, AIResults,
      currentTab, setCurrentTab,
      loading,
      findDirection,
      locationInWords,
      hasSearched,
      setHasSearched
    }}>
      {children}
    </AppContext.Provider>
  );
};

// ====================== Hook ======================
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within a LagosRhythmProvider");
  return context;
};
