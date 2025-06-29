import React from 'react';
import { X, List, ArrowUpRight, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { TransactionHistory } from '../types';

interface TransactionHistoryPanelProps {
  transactions: TransactionHistory[];
  onClose: () => void;
}

const TransactionHistoryPanel: React.FC<TransactionHistoryPanelProps> = ({ transactions, onClose }) => {
  const scrollToPanel = () => {
    const panel = document.getElementById('transaction-history-panel');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      id="transaction-history-panel" 
      className="bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-8 animate-[fadeIn_0.3s_ease-out] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black">
            <List className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Transaction History</h2>
            <button
              id="history-nav-arrow"
              onClick={scrollToPanel}
              className="text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-1 text-sm mt-1 group"
            >
              <span>Click to view history</span>
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

      <div className="max-h-[500px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent">
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <TransactionCard key={index} transaction={tx} />
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <List className="w-8 h-8 opacity-30" />
            </div>
            <div className="text-lg font-medium">No transactions found</div>
            <div className="text-sm mt-2">Your transaction history will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TransactionCardProps {
  transaction: TransactionHistory;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const handleHashClick = () => {
    if (transaction.hash) {
      window.open(`https://testnet.xrpl.org/transactions/${transaction.hash}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="p-6 bg-gray-900/90 border border-gray-700 rounded-2xl flex items-center gap-4 hover:bg-white/5 hover:border-gray-600 transition-all duration-200">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        transaction.amountClass === 'positive' 
          ? 'bg-green-400/10 text-green-400' 
          : 'bg-red-400/10 text-red-400'
      }`}>
        {transaction.amountClass === 'positive' ? (
          <ArrowDown className="w-5 h-5" />
        ) : (
          <ArrowUp className="w-5 h-5" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white mb-1">{transaction.type}</div>
        <div className="font-mono text-xs text-gray-400 truncate mb-1">
          {transaction.relatedAddress ? (
            `${transaction.relatedAddress.substring(0, 12)}...${transaction.relatedAddress.substring(-6)}`
          ) : (
            'N/A'
          )}
        </div>
        <div className="text-xs text-gray-500">{transaction.date}</div>
        {transaction.hash && (
          <button
            onClick={handleHashClick}
            className="text-xs text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-1 mt-2 group"
          >
            <span className="font-mono">{transaction.hash.substring(0, 16)}...</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        )}
      </div>
      
      <div className={`text-right font-bold text-lg ${
        transaction.amountClass === 'positive' ? 'text-green-400' : 'text-red-400'
      }`}>
        {transaction.amount}
      </div>
    </div>
  );
};

export default TransactionHistoryPanel;