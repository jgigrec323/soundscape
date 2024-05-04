"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListOfGenres from "./components/ListOfGenres";
import SuggestedSongs from "./components/SuggestedSongs";
import PopularArtists from "./components/PopularArtists";

function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="home">
      <div className="top">
        <div className="welcomeText">
          <h1>What's your mood !</h1>
          <p>Our recommendations based on your taste !</p>
        </div>
        <ListOfGenres></ListOfGenres>
      </div>
      <div className="bottom">
        <SuggestedSongs></SuggestedSongs>
        <PopularArtists></PopularArtists>
      </div>
    </div>
  );
}

export default Home;
