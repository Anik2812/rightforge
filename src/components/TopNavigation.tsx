import React from 'react';
import { Copy, Wallet } from 'lucide-react';
import { WalletState } from '../types';

interface TopNavigationProps {
  walletState: WalletState;
  onCopyAddress: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ walletState, onCopyAddress }) => {
  const truncateAddress = (address: string, isMobile: boolean = false) => {
    if (!address) return 'Not Connected';
    if (isMobile) {
      return `${address.substring(0, 6)}...${address.substring(-4)}`;
    }
    return `${address.substring(0, 10)}...${address.substring(-6)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-xl border-b border-gray-800 z-50 animate-[slideDown_0.8s_ease-out]">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black font-bold text-lg animate-[pulse-glow_3s_ease-in-out_infinite]">
              Q
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">QuantumXRP</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-900/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-700">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-bold text-sm sm:text-base">
              {walletState.balance} XRP
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm text-gray-300">
                <span className="hidden sm:inline">
                  {truncateAddress(walletState.address)}
                </span>
                <span className="sm:hidden">
                  {truncateAddress(walletState.address, true)}
                </span>
              </span>
              {walletState.address && (
                <button
                  onClick={onCopyAddress}
                  className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
                  title="Copy address"
                >
                  <Copy className="w-3 h-3 text-gray-400 group-hover:text-green-400 transition-colors duration-200" />
                </button>
              )}
            </div>
            
            <div 
              className={`w-2 h-2 rounded-full ${
                walletState.isConnected 
                  ? 'bg-green-400 animate-[pulse-success_2s_infinite]' 
                  : 'bg-red-400 animate-[pulse-error_2s_infinite]'
              }`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;