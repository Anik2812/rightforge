import React from 'react';
import { User, History, RefreshCw, Zap } from 'lucide-react';

interface QuickActionsProps {
  isConnected: boolean;
  onGetAccountInfo: () => void;
  onGetTransactionHistory: () => void;
  onRefreshBalance: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  isConnected,
  onGetAccountInfo,
  onGetTransactionHistory,
  onRefreshBalance
}) => {
  return (
    <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-8 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-green-400/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-400/10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black">
          <Zap className="w-4 h-4" />
        </div>
        <span className="text-xl font-bold text-white">Quick Actions</span>
      </div>
      
      <div className="space-y-4">
        <ActionCard
          icon={<User className="w-6 h-6" />}
          title="Account Info"
          description="View detailed account information and statistics"
          onClick={onGetAccountInfo}
          disabled={!isConnected}
        />
        
        <ActionCard
          icon={<History className="w-6 h-6" />}
          title="Transaction History"
          description="Browse your recent XRP transactions"
          onClick={onGetTransactionHistory}
          disabled={!isConnected}
        />
        
        <ActionCard
          icon={<RefreshCw className="w-6 h-6" />}
          title="Refresh Balance"
          description="Update your current XRP balance"
          onClick={onRefreshBalance}
          disabled={!isConnected}
        />
      </div>
    </div>
  );
};

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full p-6 bg-gray-900/90 border border-gray-700 rounded-2xl text-center transition-all duration-300 hover:bg-white/5 hover:border-green-400 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black mx-auto mb-4 group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>
      <div className="text-base font-semibold text-white mb-2">{title}</div>
      <div className="text-sm text-gray-400 leading-relaxed">{description}</div>
    </button>
  );
};

export default QuickActions;