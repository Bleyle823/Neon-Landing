import React, { useCallback, useMemo, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID || "YOUR_PROJECT_ID";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });

const ConnectWallet = ({ containerClass = "" }) => {
  const [address, setAddress] = useState("");
  const shortAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
  }, [address]);

  const handleConnect = useCallback(async () => {
    try {
      await loadScript(
        "https://unpkg.com/@walletconnect/ethereum-provider@2/dist/index.umd.js"
      );
      // v2 UMD exposes WalletConnectEthereumProvider on window
      const EthereumProvider = window.WalletConnectEthereumProvider;
      if (!EthereumProvider) {
        console.error("WalletConnect Ethereum Provider not available");
        return;
      }
      const provider = await EthereumProvider.init({
        projectId: WC_PROJECT_ID,
        chains: [137], // Polygon for Polymarket
        showQrModal: true,
      });
      const accounts = await provider.enable();
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      }
      provider.on("accountsChanged", (accs) => {
        setAddress(accs?.[0] || "");
      });
    } catch (err) {
      console.error("Wallet connect failed", err);
    }
  }, []);

  return (
    <div className={containerClass}>
      <Button
        id="connect-wallet"
        title={shortAddress ? `Connected: ${shortAddress}` : "Connect Wallet"}
        rightIcon={<TiLocationArrow />}
        containerClass="bg-blue-50 flex-center gap-1"
        onClick={shortAddress ? undefined : handleConnect}
      />
    </div>
  );
};

export default ConnectWallet;

