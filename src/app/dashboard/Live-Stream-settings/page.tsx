"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { fireDB } from "@/app/config/firebaseClient";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

export default function Page() {
  const [tourId, setTourId] = useState("");
  const [currentTourId, setCurrentTourId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetching the current livestream ID when the component mounts
  useEffect(() => {
    const fetchTourId = async () => {
      try {
        const docRef = doc(fireDB, "livestream_details", "current");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentTourId(docSnap.data().tourId);
        } else {
          setCurrentTourId(null);
        }
      } catch (err) {
        console.error("Error fetching tour ID:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchTourId();
  }, []);

  //  Form submission function to keep updating the tour ID
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tourId.trim()) {
      alert("Please enter a tour ID");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(fireDB, "livestream_details", "current");

      // Overwrites the document with a new tourId and timestamp
      await setDoc(docRef, {
        tourId: tourId.trim(),
        updatedAt: serverTimestamp(),
      });

      setCurrentTourId(tourId.trim());
      setTourId("");
      toast.success("Livestream ID updated successfully");
    } catch (err) {
      console.error("Error updating livestream ID:", err);
      toast.error("Error updating livestream ID ");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#05073C] text-white">
        <p>Loading current livestream details...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-[#05073C] text-white p-4">
      <h1 className="text-2xl font-semibold mb-4 font-playfair">Manage Livestream</h1>

      <div className="mb-6 text-center">
        <p className="text-lg">
          <span className="font-semibold">Current Tour ID:</span>{" "}
          {currentTourId ? (
            <span className="text-[#EF8F57]">{currentTourId}</span>
          ) : (
            <span className="text-gray-400 italic">No tour ID set</span>
          )}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#EF8F57] max-w-2xl py-7 px-5 rounded-[20px] flex flex-col items-center gap-7 font-lato text-black "
      >
        <Input
          value={tourId}
          type="text"
          label="New Tour ID"
          name="tourId"
          onChange={(e) => setTourId(e.target.value)}
          placeholder="e.g. hfgi54784j"
          isRequired
        />

        <Button
          label={loading ? <Loader/> : "Update Tour ID"}
          ariaLabel="Update"
          type="submit"
          variant="outline"
          disabled={loading}
        />
      </form>
    </div>
  );
}
