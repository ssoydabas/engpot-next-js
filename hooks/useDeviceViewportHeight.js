import { useEffect } from "react";

function setDeviceViewportHeight() {
  if (typeof window !== "undefined") {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
}

function useDeviceViewportHeight() {
  setDeviceViewportHeight();

  useEffect(() => {
    function handleResize() {
      setDeviceViewportHeight();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
}

export default useDeviceViewportHeight;
