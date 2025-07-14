import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const Hero = () => {
  const totalVideos = 4;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [nextVideoIndex, setNextVideoIndex] = useState(2);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const previewVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  // Update next index whenever current changes
  useEffect(() => {
    setNextVideoIndex((currentVideoIndex % totalVideos) + 1);
  }, [currentVideoIndex]);

  // For loading the videos
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVideo = () => {
    setHasClicked(true);
    setCurrentVideoIndex(nextVideoIndex);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  useGSAP(
    () => {
      console.log("enter the useGsap effect");
      if (hasClicked) {
        console.log("enter the animation");
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          width: "100%",
          height: "100%",
          scale: 1,
          duration: 1,
          ease: "power1.out",
          onStart: () => previewVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
          onStart: () => console.log("animtion start"),
        });
      }
    },
    { dependencies: [currentVideoIndex], revertOnUpdate: true }
  );

  // For Scroll animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      {/* Background Video and Next Video */}
      <div id="video-frame" className="relative h-dvh w-screen">
        <div className="">
          {" "}
          {/* Mini Preview Video */}
          <div
            className="mask-clip-path absolute-center absolute size-64 cursor-pointer overflow-hidden rounded-lg group z-50"
            onClick={handleMiniVideo}
          >
            {/* Mini Video plays next video */}
            <video
              id="current-video"
              ref={previewVideoRef}
              src={getVideoSrc(nextVideoIndex)}
              autoPlay
              loop
              muted
              onLoadedData={handleVideoLoad}
              className="size-64 origin-center scale-50 opacity-0 transition-all duration-500 ease-in group-hover:opacity-100 group-hover:scale-100 object-cover"
            />
          </div>
          {/* Animate to Full Screen */}
          <video
            ref={previewVideoRef}
            src={getVideoSrc(currentVideoIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          {/* Primary Background Video */}
          <video
            src={getVideoSrc(currentVideoIndex)}
            autoPlay
            loop
            muted
            className="absolute inset-0 h-full w-full object-cover"
            onLoadedData={handleVideoLoad}
          />
        </div>
        {/* Heading and Text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-blue-75 z-40">
          G<b>A</b>MING
        </h1>

        {/* Text */}
        <div className="absolute left-0 top-0 size-full z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 ">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black -z-10">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
