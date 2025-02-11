import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenDetailsDataType } from '@/types/tokenDetailsDataTypes';
import { Button } from '../ui/button';

interface Props {
  tokenInfo: TokenDetailsDataType[];
}

const TradeTabs = ({ tokenInfo }: Props) => {
  const { connected, publicKey, wallet } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isJupiterLoaded, setIsJupiterLoaded] = useState(false);

  const loadJupiterScript = () => {
    if (!isJupiterLoaded) {
      const script = document.createElement('script');
      script.src = 'https://terminal.jup.ag/main-v3.js';
      script.async = true;
      script.onload = () => {
        setIsJupiterLoaded(true);
        openJupiterModal();
      };
      document.body.appendChild(script);
    } else {
      openJupiterModal();
    }
  };

  const openJupiterModal = () => {
    if (window.Jupiter) {
      window.Jupiter.init({
        displayMode: 'modal', // Jupiter's built-in modal
        endpoint: 'https://mainnet.helius-rpc.com/?api-key=5c27681d-fcca-4886-8584-51e89282bfe9', // Solana mainnet RPC
        formProps: {
          fixedOutputMint: false,
          swapMode: 'ExactIn',
          initialInputMint: 'So11111111111111111111111111111111111111112', // Solana mint
          initialOutputMint: tokenInfo[0]?.info.tokenContractAddress, // Token to trade
        },
      });
  
      // Ensure the modal has the highest z-index
      const observer = new MutationObserver(() => {
        const jupiterModal = document.querySelector('.jupiter-terminal-modal');
        if (jupiterModal) {
          (jupiterModal as HTMLElement).style.zIndex = '9999'; // Highest z-index
          observer.disconnect(); // Stop observing once applied
        }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      console.error('Jupiter is not available on the window object.');
    }
  };

  useEffect(() => {
    if (window.Jupiter && connected && publicKey) {
      window.Jupiter.syncProps({
        passthroughWalletContextState: { connected, publicKey, wallet },
      });
    }
  }, [connected, publicKey, wallet]);

  return (
    <div >
      <Button
        className="w-full h-20 font-bold"
        onClick={() => {
          setIsDialogOpen(true);
          loadJupiterScript();
        }}
      >
        Trade {tokenInfo[0]?.info.tokenSymbol || 'Token'}
      </Button>
    </div>
  );
};

export default TradeTabs;
