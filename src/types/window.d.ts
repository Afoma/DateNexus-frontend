interface Window {
  ethereum?: any;
  appInstallEvent: Event;
  deferredPrompt: any;
  installPWA: () => Promise<void>;
}

export {};
