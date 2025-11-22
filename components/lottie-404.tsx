"use client"

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export function Lottie404() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://lottie.host/embed/9866e4f6-f3cd-4476-863d-28f129285123/2j5X252222.json')
      .then(response => {
          // The embed URL returns HTML, we need the direct JSON or just use a known JSON url.
          // Let's use a reliable public JSON for 404.
          return fetch('https://assets2.lottiefiles.com/packages/lf20_kcsr6fcp.json');
      })
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load lottie animation", err));
  }, []);

  if (!animationData) return <div className="h-64 w-64 bg-muted/20 animate-pulse rounded-lg" />;

  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
