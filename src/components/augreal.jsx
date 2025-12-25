import { useEffect, useRef, useState } from "react";

export default function ARScene() {
  const [isReady, setIsReady] = useState(false);

  const videoRef = useRef(null);
  const targetRef = useRef(null);
  const planeRef = useRef(null);

  
  useEffect(() => {
    // Check camera permissions
    const checkCameraPermissions = async () => {
      try {
        console.log('Requesting camera permission...');
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        console.log('Camera permission granted');
        
        // Stop the test stream
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Camera permission denied:', error);
        alert('Camera access is required for AR. Please allow camera permissions.');
      }
    };

    // Check if MindAR is loaded
    const checkMindAR = () => {
      if (typeof window.MINDAR !== 'undefined') {
        console.log('MindAR is available');
      } else {
        console.error('MindAR is not loaded');
      }
    };

    checkCameraPermissions();
    checkMindAR();

    const sceneEl = document.querySelector('a-scene');

    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        console.log('A-Frame scene loaded');
      });

      sceneEl.addEventListener('mindar-loaded', () => {
        console.log('MindAR loaded successfully - camera should work now');
      });

      sceneEl.addEventListener('mindar-error', (event) => {
        console.error('MindAR error:', event.detail);
        alert('AR initialization failed: ' + event.detail);
      });

      // Add camera error handling
      sceneEl.addEventListener('camera-error', (event) => {
        console.error('Camera error:', event.detail);
        alert('Camera error: ' + event.detail);
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
        mindar-image="imageTargetSrc: /targets.mind; maxTrack: 1"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        renderer="colorManagement: true"
        camera="active: false"
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

        <a-camera
          mindar-image-target-camera
          position="0 0 0"
          look-controls="enabled: false"
        />

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
