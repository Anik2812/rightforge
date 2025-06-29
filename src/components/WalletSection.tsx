import React from 'react';
import { Link, Plus, LogOut, Unlink } from 'lucide-react';
import { WalletState } from '../types';

interface WalletSectionProps {
  walletState: WalletState;
  isLoading: boolean;
  onCreateWallet: () => void;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

const WalletSection: React.FC<WalletSectionProps> = ({
  walletState,
  isLoading,
  onCreateWallet,
  onConnectWallet,
  onDisconnectWallet
}) => {
  return (
    <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-green-400/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-400/10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="p-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-8 p-6 bg-gray-900/90 rounded-2xl border border-gray-700">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
            walletState.isConnected
              ? 'bg-green-400 text-black animate-[pulse-success_2s_infinite]'
              : 'bg-red-400 text-white animate-[pulse-error_2s_infinite]'
          }`}>
            {walletState.isConnected ? (
              <Link className="w-6 h-6" />
            ) : (
              <Unlink className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="text-xl font-semibold">
              {walletState.isConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {walletState.isConnected ? 'Ready to transact' : 'Connect to start trading'}
            </div>
          </div>
        </div>

        {!walletState.isConnected ? (
          <div className="space-y-4">
            <button
              onClick={onCreateWallet}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:from-green-500 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-[left] duration-500 group-hover:left-[100%]" />
              <Plus className="w-5 h-5" />
              Create New Wallet
              {isLoading && <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin ml-2" />}
            </button>
            <button
              onClick={onConnectWallet}
              disabled={isLoading}
              className="w-full bg-transparent text-white font-semibold py-4 px-6 rounded-xl border border-gray-600 transition-all duration-200 hover:bg-white/5 hover:border-green-400 hover:text-green-400 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-[left] duration-500 group-hover:left-[100%]" />
              <Link className="w-5 h-5" />
              Connect Existing Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-left bg-gray-900/90 rounded-2xl p-6 border border-gray-700 space-y-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-gray-400">Address</span>
                <span className="font-mono text-xs sm:text-sm bg-green-400/10 text-green-400 px-3 py-1 rounded-lg border border-green-400/20">
                  {walletState.address ? `${walletState.address.substring(0, 12)}...${walletState.address.substring(-6)}` : ''}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-gray-400">Balance</span>
                <span className="text-green-400 font-bold text-lg">{walletState.balance} XRP</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Network</span>
                <span className="text-blue-400">Testnet</span>
              </div>
            </div>
            
            <button
              onClick={onDisconnectWallet}
              disabled={isLoading}
              className="w-full bg-transparent text-red-400 font-semibold py-4 px-6 rounded-xl border border-red-400 transition-all duration-200 hover:bg-red-400 hover:text-white hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transition-[left] duration-500 group-hover:left-[100%]" />
              <LogOut className="w-5 h-5" />
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSection;