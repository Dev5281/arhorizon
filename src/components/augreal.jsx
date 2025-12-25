import { useEffect, useRef, useState } from "react";

export default function ARScene() {
  const [isReady, setIsReady] = useState(false);

  const videoRef = useRef(null);
  const targetRef = useRef(null);
  const planeRef = useRef(null);

  
  useEffect(() => {
    if (!isReady) return;

    const video = videoRef.current;
    const target = targetRef.current;
    const plane = planeRef.current;

    if (!video || !target || !plane) return;

    const handleTargetFound = async () => {
      plane.setAttribute("visible", "true");
      try {
        await video.play();
      } catch (err) {
        console.warn("Video play blocked:", err);
      }
    };

    const handleTargetLost = () => {
      video.pause();
      video.currentTime = 0;
      plane.setAttribute("visible", "false");
    };

    target.addEventListener("targetFound", handleTargetFound);
    target.addEventListener("targetLost", handleTargetLost);

    return () => {
      target.removeEventListener("targetFound", handleTargetFound);
      target.removeEventListener("targetLost", handleTargetLost);
    };
  }, [isReady]);

  
  const Media = async () => {
    const sceneEl = document.querySelector("a-scene");
    const video = videoRef.current;
    if (!sceneEl || !video) return;

    try {
      video.muted = true;
      await video.play();
      video.pause();
      video.muted = false;
      setIsReady(true);
    } catch (err) {
      console.warn("Media unlock failed:", err);
    }
  };

  return (
    <>
     {!isReady && (
  <div className="christmas-overlay" onClick={Media}>
    <h1>🎄 Christmas AR 🎄</h1>

    <div className="play-button">
      <span className="play-icon"></span>
      Tap & Play
    </div>

    <p className="launch-hint">
      Point your camera at the marker
    </p>
  </div>
)}


      <a-scene
        mindar-image="imageTargetSrc: /targets.mind"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        renderer="colorManagement: true"
      >
        <a-assets>
          <video
            ref={videoRef}
            id="arVideo"
            src="/video.mp4"
            preload="auto"
            loop
            playsInline
            webkit-playsinline="true"
            crossOrigin="anonymous"
          />
        </a-assets>

        <a-camera look-controls="enabled:false" />

        <a-entity
          ref={targetRef}
          mindar-image-target="targetIndex: 0"
        />
          <a-video
            ref={planeRef}
            src="#arVideo"
            width="1"
            height="0.56"
            position="0 0 0"
            visible="false"
            material="shader: flat"
          />
      </a-scene>
    </>
  );
}
