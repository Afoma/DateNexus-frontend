import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const cbWalletConnector = coinbaseWallet({
  appName: "DateNexus",
  preference: "smartWalletOnly",
});

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [cbWalletConnector],
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
} 