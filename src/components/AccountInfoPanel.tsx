import React from 'react';
import { X, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AccountInfo } from '../types';

interface AccountInfoPanelProps {
  accountInfo: AccountInfo | null;
  onClose: () => void;
}

const AccountInfoPanel: React.FC<AccountInfoPanelProps> = ({ accountInfo, onClose }) => {
  if (!accountInfo) return null;

  const scrollToPanel = () => {
    const panel = document.getElementById('account-info-panel');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      id="account-info-panel" 
      className="bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-8 animate-[fadeIn_0.3s_ease-out] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Account Information</h2>
            <button
              id="account-nav-arrow"
              onClick={scrollToPanel}
              className="text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-1 text-sm mt-1 group"
            >
              <span>Click to view details</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
      </div>

      <div className="grid gap-4">
        <InfoItem label="📍 Account Address" value={accountInfo.account} isAddress />
        <InfoItem label="💰 Current Balance" value={`${accountInfo.balance} XRP`} isBalance />
        <InfoItem label="🔢 Sequence Number" value={accountInfo.sequence.toString()} />
        <InfoItem label="📊 Account Type" value={accountInfo.ledgerEntryType} />
        <InfoItem label="🌐 Network" value="XRP Ledger Testnet" isNetwork />
        {accountInfo.regularKey && (
          <InfoItem label="🔑 Regular Key" value={accountInfo.regularKey} isAddress />
        )}
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  isAddress?: boolean;
  isBalance?: boolean;
  isNetwork?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, isAddress, isBalance, isNetwork }) => {
  return (
    <div className="flex justify-between items-center p-5 bg-gray-900/90 border border-gray-700 rounded-2xl">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className={`text-right font-semibold ${
        isAddress ? 'font-mono text-xs sm:text-sm bg-green-400/10 text-green-400 px-3 py-1 rounded-lg border border-green-400/20' :
        isBalance ? 'text-green-400 text-lg' :
        isNetwork ? 'text-blue-400' :
        'text-white'
      }`}>
        {isAddress && value.length > 20 ? `${value.substring(0, 12)}...${value.substring(-6)}` : value}
      </span>
    </div>
  );
};

export default AccountInfoPanel;