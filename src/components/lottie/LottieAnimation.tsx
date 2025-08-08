import React from "react";
import Lottie from "lottie-react";
import animationData from "@/animation/Contactus.json"; // adjust the path

const LottieAnimation = () => {
  return (
    <div className=""> {/* Set width/height as needed */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
