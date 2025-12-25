import { useEffect, useRef, useState } from "react";
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function ARScene() {
  const [isReady, setIsReady] = useState(false);

  const videoRef = useRef(null);
  const targetRef = useRef(null);
  const planeRef = useRef(null);

  
  useEffect(() => {
    // Check if libraries are loaded
    const checkLibraries = () => {
      console.log('Checking libraries...');
      if (typeof AFRAME !== 'undefined') {
        console.log('A-Frame loaded via npm:', AFRAME.version);
      } else {
        console.error('A-Frame not loaded');
      }

      if (typeof window.MINDAR !== 'undefined') {
        console.log('MindAR loaded via npm');
      } else {
        console.error('MindAR not loaded');
      }
    };

    // Check after a short delay to allow imports to load
    setTimeout(checkLibraries, 1000);

    const sceneEl = document.querySelector('a-scene');

    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        console.log('A-Frame scene loaded');
      });

      sceneEl.addEventListener('mindar-loaded', () => {
        console.log('MindAR loaded successfully');
      });

      sceneEl.addEventListener('mindar-error', (event) => {
        console.error('MindAR error:', event.detail);
      });
    }
  }, []);

  
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
