"use client";
import { useState, useEffect } from "react";
import { fetchRequestToken } from "./serverActions"; // adjust the path as needed

export default function SignInButton() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log("Message received:", event.data);
      if (event.data === "oauth_verifier_saved") {
        alert("OAuth verifier has been saved.");
        // Additional logic if needed
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const data = await fetchRequestToken();
      if (data.authUrl) {
        const popupFeatures = "width=600,height=400,left=100,top=100,noopener";
        const popup = window.open(data.authUrl, "DiscogsAuth", popupFeatures);
        if (!popup) {
          alert("Popup blocked! Please allow popups and try again.");
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSignIn} disabled={loading}>
      {loading ? "Signing In..." : "Sign In with Discogs"}
    </button>
  );
}
