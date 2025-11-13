import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import AnimatedTitle from "./AnimatedTitle";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center", //triger 800px after it passes the center
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });
  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Polymarket 101
        </h2>
        <AnimatedTitle
          title=" Trade on real world events with USDC"
          containerClass="mt-5 !text-black text-center"
        />
        <div className="about-subtext">
          <p>Buy and sell YES/NO shares—prices reflect crowd probabilities.</p>
          <p>
            Example: buy a $0.65 "Yes" ticket today; you can sell anytime to
            lock profits or cut losses. Settlement is automatic on-chain.
          </p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.png"
            alt="Background"
            className="absolutee left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
