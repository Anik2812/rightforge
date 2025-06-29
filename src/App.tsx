import React, { useState, useEffect, useRef } from 'react';
import { Client, Wallet, dropsToXrp, xrpToDrops } from 'xrpl';
import TopNavigation from './components/TopNavigation';
import WalletSection from './components/WalletSection';
import ChatInterface from './components/ChatInterface';
import QuickActions from './components/QuickActions';
import AccountInfoPanel from './components/AccountInfoPanel';
import TransactionHistoryPanel from './components/TransactionHistoryPanel';
import TransactionModal from './components/TransactionModal';
import { WalletState, Message, TransactionData, AccountInfo, TransactionHistory } from './types';

const App: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    wallet: null,
    isConnected: false,
    balance: '0',
    address: ''
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🚀 <strong>Welcome to QuantumXRP!</strong> Your advanced AI-powered XRP transaction assistant.<br><br><strong>🎯 Try these natural commands:</strong><br>• "Send <strong>15.5 XRP</strong> to <strong>rN7n7otELRKCpo4KJkNgSfCxp4oTajWjZn</strong>"<br>• "Transfer <strong>100 XRP</strong> to <strong>rPEPPER...</strong> with destination tag <strong>12345</strong>"<br>• "Pay <strong>25 XRP</strong> to <strong>rUCzEr...</strong> with memo \'<strong>Invoice #1234</strong>\'"<br><br><em>Connect your wallet to get started! 💫</em>',
      type: 'system',
      timestamp: Date.now()
    }
  ]);

  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const [pendingTransaction, setPendingTransaction] = useState<TransactionData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clientRef = useRef<Client | null>(null);

  const initializeClient = async () => {
    if (!clientRef.current) {
      clientRef.current = new Client('wss://s.altnet.rippletest.net:51233');
      try {
        await clientRef.current.connect();
        console.log('XRPL client connected.');
      } catch (error) {
        console.error('Failed to connect XRPL client:', error);
        addMessage('❌ Failed to connect to XRP Ledger. Please check your network connection.', 'system');
        throw error;
      }
    } else if (!clientRef.current.isConnected()) {
      try {
        await clientRef.current.connect();
        console.log('XRPL client reconnected.');
      } catch (error) {
        console.error('Failed to reconnect XRPL client:', error);
        addMessage('❌ Failed to reconnect to XRP Ledger. Please check your network connection.', 'system');
        throw error;
      }
    }
  };

  const addMessage = (text: string, type: 'user' | 'system') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const createWallet = async () => {
    try {
      setIsLoading(true);
      addMessage('🔄 <strong>Creating new wallet...</strong>', 'system');
      await initializeClient();
      
      addMessage('💰 <strong>Generating wallet and funding with test XRP...</strong>', 'system');
      const wallet = Wallet.generate();
      
      if (clientRef.current) {
        await clientRef.current.fundWallet(wallet);
        
        await updateWalletState(wallet);
        addMessage(`🎉 <strong>Wallet created successfully!</strong><br><br>📍 <strong>Address:</strong> <span style="background: var(--accent-soft); padding: 0.5rem 1rem; border-radius: var(--radius-md); border: 1px solid rgba(0, 255, 136, 0.2); font-family: var(--font-mono); color: var(--accent-primary); font-size: 0.85rem;">${wallet.address}</span><br><br>🔑 <strong>⚠️ Save your seed phrase:</strong><br><code style="background: rgba(255, 68, 68, 0.1); color: var(--error); padding: 0.75rem; border-radius: 8px; display: block; margin: 0.5rem 0; font-family: var(--font-mono);">${wallet.seed}</code><br><small style="color: var(--text-muted);">⚠️ For testing only - never share in production!</small>`, 'system');
      }
    } catch (error: any) {
      addMessage(`❌ <strong>Error creating wallet:</strong> ${error.message}`, 'system');
      console.error("Wallet creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    const seed = prompt('🔑 Enter your wallet seed phrase (starts with s...):');
    if (!seed) {
      addMessage('❌ Connection cancelled.', 'system');
      return;
    }
    
    try {
      setIsLoading(true);
      addMessage('🔄 <strong>Connecting wallet...</strong>', 'system');
      await initializeClient();
      
      const wallet = Wallet.fromSeed(seed);
      
      await updateWalletState(wallet);
      addMessage('✅ <strong>Wallet connected successfully!</strong> 🎉', 'system');
      
    } catch (error: any) {
      addMessage(`❌ <strong>Error connecting wallet:</strong> ${error.message}`, 'system');
      console.error("Wallet connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    if (clientRef.current && clientRef.current.isConnected()) {
      await clientRef.current.disconnect();
    }
    
    setWalletState({
      wallet: null,
      isConnected: false,
      balance: '0',
      address: ''
    });
    
    setShowAccountInfo(false);
    setShowTransactionHistory(false);
    setAccountInfo(null);
    setTransactionHistory([]);
    
    addMessage('👋 <strong>Wallet disconnected.</strong> Connect or create a new wallet to continue.', 'system');
  };

  const updateWalletState = async (wallet: Wallet) => {
    if (!clientRef.current) return;

    try {
      const response = await clientRef.current.request({
        command: 'account_info',
        account: wallet.address,
        ledger_index: 'validated'
      });
      const balance = dropsToXrp(response.result.account_data.Balance);
      
      setWalletState({
        wallet,
        isConnected: true,
        balance,
        address: wallet.address
      });
    } catch (error) {
      setWalletState({
        wallet,
        isConnected: true,
        balance: '0',
        address: wallet.address
      });
      console.error("Error fetching balance:", error);
    }
  };

  const refreshBalance = async () => {
    if (!walletState.wallet || !clientRef.current) return;
    
    try {
      const response = await clientRef.current.request({
        command: 'account_info',
        account: walletState.wallet.address,
        ledger_index: 'validated'
      });
      const balance = dropsToXrp(response.result.account_data.Balance);
      
      setWalletState(prev => ({ ...prev, balance }));
      addMessage(`💰 <strong>Balance updated:</strong> ${balance} XRP`, 'system');
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const getAccountInfo = async () => {
    if (!walletState.wallet || !clientRef.current) {
      addMessage('❌ Please connect your wallet first.', 'system');
      return;
    }
    
    try {
      setIsLoading(true);
      addMessage('🔄 <strong>Fetching account information...</strong>', 'system');
      const response = await clientRef.current.request({
        command: 'account_info',
        account: walletState.wallet.address
      });
      const data = response.result.account_data;
      
      const info: AccountInfo = {
        account: data.Account,
        balance: dropsToXrp(data.Balance),
        sequence: data.Sequence,
        ledgerEntryType: data.LedgerEntryType,
        regularKey: data.RegularKey
      };
      
      setAccountInfo(info);
      setShowAccountInfo(true);
      setShowTransactionHistory(false);
      addMessage('✅ <strong>Account information loaded successfully!</strong> <span style="color: var(--accent-primary); cursor: pointer;" onclick="document.getElementById(\'account-nav-arrow\').click()">↗️ View Details</span>', 'system');
    } catch (error: any) {
      addMessage(`❌ <strong>Error fetching account info:</strong> ${error.message}`, 'system');
      console.error("Account info error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionHistory = async () => {
    if (!walletState.wallet || !clientRef.current) {
      addMessage('❌ Please connect your wallet first.', 'system');
      return;
    }
    
    try {
      setIsLoading(true);
      addMessage('🔄 <strong>Fetching transaction history...</strong>', 'system');
      const response = await clientRef.current.request({
        command: 'account_tx',
        account: walletState.wallet.address,
        limit: 20
      });
      
      const history: TransactionHistory[] = [];
      
      if (response.result.transactions && response.result.transactions.length > 0) {
        response.result.transactions.forEach((entry: any) => {
          const tx = entry.tx || entry.tx_json;
          const meta = entry.meta;

          if (!tx || !meta) return;

          let type = tx.TransactionType;
          let amount = '-';
          let relatedAddress = '';
          let amountClass = '';
          let hash = tx.hash || '';
          
          if (tx.TransactionType === 'Payment') {
            if (tx.Amount) {
              if (typeof tx.Amount === 'string') {
                amount = `${dropsToXrp(tx.Amount)} XRP`;
              } else if (typeof tx.Amount === 'object' && tx.Amount.value) {
                amount = `${tx.Amount.value} ${tx.Amount.currency}`;
              }
            }
            
            if (tx.Destination && tx.Destination !== walletState.wallet!.address) {
              relatedAddress = tx.Destination;
              type = 'Sent Payment';
              amount = '-' + amount;
              amountClass = 'negative';
            } else if (tx.Account && tx.Account !== walletState.wallet!.address) {
              relatedAddress = tx.Account;
              type = 'Received Payment';
              amount = '+' + amount;
              amountClass = 'positive';
            }
          }

          const date = tx.date ? new Date((tx.date + 946684800) * 1000).toLocaleDateString() : 'N/A';

          history.push({
            type,
            amount,
            amountClass,
            relatedAddress,
            date,
            hash
          });
        });
        
        setTransactionHistory(history);
        setShowTransactionHistory(true);
        setShowAccountInfo(false);
        addMessage('✅ <strong>Transaction history loaded successfully!</strong> <span style="color: var(--accent-primary); cursor: pointer;" onclick="document.getElementById(\'history-nav-arrow\').click()">↗️ View History</span>', 'system');
      } else {
        setTransactionHistory([]);
        setShowTransactionHistory(true);
        setShowAccountInfo(false);
        addMessage('ℹ️ <strong>No transaction history found</strong> for this account.', 'system');
      }
    } catch (error: any) {
      addMessage(`❌ <strong>Error fetching transaction history:</strong> ${error.message}`, 'system');
      console.error("Transaction history error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseTransaction = (input: string): TransactionData | null => {
    const result: Partial<TransactionData> = {};

    const amountMatch = input.match(/(?:send|transfer|pay)\s+(\d+(?:\.\d+)?)\s*xrp/i);
    if (amountMatch) {
      result.amount = parseFloat(amountMatch[1]);
    }

    const destMatch = input.match(/(?:to|destination)\s+([rR][a-zA-Z0-9]{24,34})/i);
    if (destMatch) {
      result.destination = destMatch[1];
    }

    const tagMatch = input.match(/(?:tag|destination\s+tag)\s+(\d+)/i);
    if (tagMatch) {
      result.destinationTag = parseInt(tagMatch[1], 10);
    }

    const memoMatch = input.match(/(?:memo|note|message)\s+['"](.*?)['"]|(?:memo|note|message)\s+(\S+)/i);
    if (memoMatch) {
      result.memo = memoMatch[1] || memoMatch[2];
    }
    
    return (result.amount && result.destination) ? result as TransactionData : null;
  };

  const handleSendMessage = (input: string) => {
    addMessage(input, 'user');

    if (!walletState.isConnected) {
      addMessage('❌ <strong>Please connect your wallet first</strong> to send transactions.', 'system');
      return;
    }
    
    if (input.toLowerCase().includes('account info') || input.toLowerCase().includes('balance')) {
      getAccountInfo();
      return;
    }
    
    if (input.toLowerCase().includes('transaction history') || input.toLowerCase().includes('past transactions')) {
      getTransactionHistory();
      return;
    }

    const parsedData = parseTransaction(input);
    
    if (!parsedData) {
      addMessage('❌ <strong>I couldn\'t understand your request.</strong><br><br>Please specify both the <strong>amount</strong> (e.g., "10 XRP") and the <strong>destination address</strong> (e.g., "rN7n7otELRKCpo4KJkNgSfCxp4oTajWjZn").<br><br><em>💡 Try: "Send 25 XRP to rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY"</em>', 'system');
    } else {
      setPendingTransaction(parsedData);
      setShowModal(true);
    }
  };

  const confirmTransaction = async () => {
    if (!pendingTransaction || !walletState.wallet || !clientRef.current) {
      addMessage('❌ No pending transaction to confirm.', 'system');
      setShowModal(false);
      return;
    }

    const data = { ...pendingTransaction };
    setShowModal(false);

    try {
      setIsLoading(true);
      addMessage('🔄 <strong>Processing transaction...</strong> Please wait...', 'system');
      
      const payment: any = {
        TransactionType: 'Payment',
        Account: walletState.wallet.address,
        Amount: xrpToDrops(data.amount),
        Destination: data.destination
      };
      
      if (data.destinationTag) {
        payment.DestinationTag = data.destinationTag;
      }
      
      if (data.memo) {
        payment.Memos = [{
          Memo: {
            MemoData: Buffer.from(data.memo, 'utf8').toString('hex').toUpperCase()
          }
        }];
      }
      
      const prepared = await clientRef.current.autofill(payment);
      const signed = walletState.wallet.sign(prepared);
      const result = await clientRef.current.submitAndWait(signed.tx_blob);
      
      if (result.result.meta.TransactionResult === 'tesSUCCESS') {
        addMessage(`🎉 <strong>Transaction Successful!</strong><br><br>📋 <strong>Hash:</strong> <a href="https://testnet.xrpl.org/transactions/${result.result.hash}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: none;">${result.result.hash.substring(0, 20)}... <span style="font-size: 0.8em;">🔗</span></a><br>💸 <strong>Sent:</strong> ${data.amount} XRP<br>📍 <strong>To:</strong> <span style="background: var(--accent-soft); padding: 0.25rem 0.75rem; border-radius: var(--radius-md); border: 1px solid rgba(0, 255, 136, 0.2); font-family: var(--font-mono); color: var(--accent-primary); font-size: 0.85rem;">${data.destination}</span>`, 'system');
        
        await refreshBalance();
      } else {
        addMessage(`❌ <strong>Transaction failed:</strong> ${result.result.meta.TransactionResult}`, 'system');
      }
      
    } catch (error: any) {
      addMessage(`❌ <strong>Transaction error:</strong> ${error.message}`, 'system');
      console.error("Transaction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelTransaction = () => {
    addMessage('❌ <strong>Transaction cancelled.</strong>', 'system');
    setShowModal(false);
    setPendingTransaction(null);
  };

  useEffect(() => {
    initializeClient().catch(console.error);

    return () => {
      if (clientRef.current && clientRef.current.isConnected()) {
        clientRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <TopNavigation 
        walletState={walletState}
        onCopyAddress={() => {
          if (walletState.address) {
            navigator.clipboard.writeText(walletState.address);
            addMessage('📋 <strong>Address copied to clipboard!</strong>', 'system');
          }
        }}
      />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_300px] gap-6 lg:gap-8 py-8">
          <WalletSection
            walletState={walletState}
            isLoading={isLoading}
            onCreateWallet={createWallet}
            onConnectWallet={connectWallet}
            onDisconnectWallet={disconnectWallet}
          />
          
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            isConnected={walletState.isConnected}
            onSendMessage={handleSendMessage}
          />
          
          <QuickActions
            isConnected={walletState.isConnected}
            onGetAccountInfo={getAccountInfo}
            onGetTransactionHistory={getTransactionHistory}
            onRefreshBalance={refreshBalance}
          />
        </div>

        {(showAccountInfo || showTransactionHistory) && (
          <div className="pb-8">
            {showAccountInfo && (
              <AccountInfoPanel 
                accountInfo={accountInfo}
                onClose={() => setShowAccountInfo(false)}
              />
            )}
            
            {showTransactionHistory && (
              <TransactionHistoryPanel 
                transactions={transactionHistory}
                onClose={() => setShowTransactionHistory(false)}
              />
            )}
          </div>
        )}
      </main>

      {showModal && pendingTransaction && (
        <TransactionModal
          transaction={pendingTransaction}
          onConfirm={confirmTransaction}
          onCancel={cancelTransaction}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;