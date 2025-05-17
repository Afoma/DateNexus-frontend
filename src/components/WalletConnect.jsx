import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { cbWalletConnector } from "@/lib/wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export function WalletConnect() {
  const { connect } = useConnect({
    mutation: {
      onSuccess: (data) => {
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
        setMessage(m);
        signMessage({ message: m.prepareMessage() });
      },
      onError: (error) => {
        toast.error("Failed to connect wallet: " + error.message);
      },
    },
  });

  const account = useAccount();
  const client = usePublicClient();
  const [signature, setSignature] = useState(undefined);
  const { signMessage } = useSignMessage({
    mutation: { 
      onSuccess: (sig) => setSignature(sig),
      onError: (error) => {
        toast.error("Failed to sign message: " + error.message);
      }
    },
  });
  const [message, setMessage] = useState(undefined);
  const [isValid, setIsValid] = useState(undefined);

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
      } else {
        toast.error("Invalid signature");
      }
    } catch (error) {
      toast.error("Failed to verify signature: " + error.message);
    }
  }, [signature, account, client, message]);

  useEffect(() => {
    checkValid();
  }, [signature, account, checkValid]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => connect({ connector: cbWalletConnector })}
        disabled={account.isConnected}
        className="w-full max-w-xs"
      >
        {account.isConnected ? "Connected" : "Connect Wallet"}
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