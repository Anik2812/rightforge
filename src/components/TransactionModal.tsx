import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { TransactionData } from '../types';

interface TransactionModalProps {
  transaction: TransactionData;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  onConfirm,
  onCancel,
  isLoading
}) => {
  const networkFee = 0.00001;
  const totalAmount = transaction.amount + networkFee;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-black border border-gray-700 rounded-3xl p-8 w-full max-w-md animate-[modalSlide_0.3s_ease-out] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />
        
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white mb-2">🔐 Confirm Transaction</div>
          <div className="text-gray-400">Review all details before proceeding</div>
        </div>
        
        <div className="space-y-4 mb-8">
          <PreviewCard label="💸 Amount" value={`${transaction.amount} XRP`} accent />
          <PreviewCard 
            label="📍 To Address" 
            value={transaction.destination}
            isAddress 
          />
          {transaction.destinationTag && (
            <PreviewCard label="🏷️ Destination Tag" value={transaction.destinationTag.toString()} />
          )}
          {transaction.memo && (
            <PreviewCard label="📝 Memo" value={transaction.memo} />
          )}
          <PreviewCard label="⚡ Network Fee" value={`${networkFee} XRP`} />
          <PreviewCard 
            label="💳 Total Deduction" 
            value={`${totalAmount} XRP`} 
            total 
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:from-green-500 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            Confirm & Send
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-transparent text-white font-semibold py-4 px-6 rounded-2xl border border-gray-600 transition-all duration-200 hover:bg-white/5 hover:border-red-400 hover:text-red-400 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            <XCircle className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface PreviewCardProps {
  label: string;
  value: string;
  accent?: boolean;
  total?: boolean;
  isAddress?: boolean;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ label, value, accent, total, isAddress }) => {
  return (
    <div className={`p-4 rounded-2xl flex justify-between items-center ${
      total 
        ? 'border border-green-400 bg-green-400/5' 
        : 'bg-gray-900/90 border border-gray-700'
    }`}>
      <span className="text-gray-400 font-medium text-sm">{label}</span>
      <span className={`text-right font-semibold text-sm ${
        isAddress ? 'font-mono bg-green-400/10 text-green-400 px-2 py-1 rounded border border-green-400/20' :
        accent ? 'text-green-400' :
        total ? 'text-green-400 text-base' :
        'text-white'
      }`}>
        {isAddress && value.length > 20 ? `${value.substring(0, 10)}...${value.substring(-6)}` : value}
      </span>
    </div>
  );
};

export default TransactionModal;