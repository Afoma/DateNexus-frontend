import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { cbWalletConnector } from "@/lib/wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import type { Hex } from "viem";
import axiosInstance from "@/services/api-client";

export function WalletConnect() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { connect } = useConnect({
    mutation: {
      onSuccess: async (data) => {
        try {
          const address = data.accounts[0];
          const chainId = data.chainId;
          const m = new SiweMessage({
            domain: document.location.host,
            address,
            chainId,
            uri: document.location.origin,
            version: "1",
            statement: "Sign in to DateNexus",
            nonce: Math.random().toString(36).substring(2),
          });
          
          const response = await axiosInstance.post("/auth/wallet-signin", {
            address,
            message: m.prepareMessage(),
          });
          
          localStorage.setItem("jwt", response.data.token);
          window.location.href = "/app/createProfile";
        } catch (error) {
          toast.error("Failed to sign in: " + (error as Error).message);
          setIsLoading(false);
        }
      },
      onError: (error) => {
        setIsLoading(false);
        toast.error("Failed to connect wallet: " + error.message);
      },
    },
  });

  const account = useAccount();
  const client = usePublicClient();
  const [signature, setSignature] = useState<Hex | undefined>(undefined);
  const { signMessage } = useSignMessage({
    mutation: { 
      onSuccess: (sig) => setSignature(sig),
      onError: (error) => {
        setIsLoading(false);
        toast.error("Failed to sign message: " + error.message);
      }
    },
  });
  const [message, setMessage] = useState<SiweMessage | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const handleWalletSignIn = async (address: string, signature: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/wallet-signin", {
        address,
        signature,
        message: message?.prepareMessage(),
      });
      
      // Store JWT token
      localStorage.setItem("jwt", response.data.token);
      
      // Always redirect to createProfile after successful wallet sign in
      window.location.href = "/app/createProfile";
      
    } catch (error) {
      toast.error("Failed to sign in with wallet: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkValid = useCallback(async () => {
    if (!signature || !account.address || !client || !message) return;

    try {
      const valid = await client.verifyMessage({
        address: account.address,
        message: message.prepareMessage(),
        signature,
      });
      setIsValid(valid);
      if (valid) {
        toast.success("Successfully connected wallet!");
        await handleWalletSignIn(account.address, signature);
      } else {
        toast.error("Invalid signature");
      }
    } catch (error) {
      toast.error("Failed to verify signature: " + (error as Error).message);
    }
  }, [signature, account, client, message]);

  useEffect(() => {
    checkValid();
  }, [signature, account, checkValid]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => {
          setIsLoading(true);
          connect({ connector: cbWalletConnector });
        }}
        disabled={isLoading}
        className="w-full bg-custom-gradient h-[44px] rounded-[12px]"
      >
        {isLoading ? "Connecting..." : "Sign in with Smart Wallet"}
      </Button>
      {account.isConnected && (
        <div className="text-sm text-gray-600">
          Connected: {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
        </div>
      )}
      {isValid !== undefined && (
        <div className="text-sm">
          Signature {isValid ? "Valid" : "Invalid"}
        </div>
      )}
    </div>
  );
} 