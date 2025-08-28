// SwipeWithFade.tsx
"use client";

import React, { useState } from "react";
import SwipeCards from "./SwipeCard";
import FadeIn from "./FadeIn";

const SwipeWithFade = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="flex items-start mt-[-45px] ml-auto">
        <FadeIn activeIndex={activeIndex} />
      </div>
      <div className="flex items-center justify-center p-4 w-[700px] h-[100px] ml-auto">
        <SwipeCards setActiveIndex={setActiveIndex} />
      </div>
    </>
  );
};

export default SwipeWithFade;
