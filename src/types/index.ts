import { Wallet } from 'xrpl';

export interface WalletState {
  wallet: Wallet | null;
  isConnected: boolean;
  balance: string;
  address: string;
}

export interface Message {
  id: string;
  text: string;
  type: 'user' | 'system';
  timestamp: number;
}

export interface TransactionData {
  amount: number;
  destination: string;
  destinationTag?: number;
  memo?: string;
}

export interface AccountInfo {
  account: string;
  balance: string;
  sequence: number;
  ledgerEntryType: string;
  regularKey?: string;
}

export interface TransactionHistory {
  type: string;
  amount: string;
  amountClass: string;
  relatedAddress: string;
  date: string;
  hash: string;
}