import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/routes";

declare global {
  interface Window {
    appInstallEvent: Event;
    deferredPrompt: any; 
    installPWA: () => Promise<void>;
  }
}

window.appInstallEvent = new Event('appInstallable');

window.deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e: Event) => {
  e.preventDefault();
  window.deferredPrompt = e;
  window.dispatchEvent(window.appInstallEvent);
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Function to trigger installation
window.installPWA = async (): Promise<void> => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    window.deferredPrompt = null;
  }
};