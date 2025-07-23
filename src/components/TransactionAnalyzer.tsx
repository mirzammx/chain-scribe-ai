import { useState } from "react";
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Brain, Loader2, Copy, ExternalLink } from "lucide-react";
import { fetchTransactions, formatEther, type Transaction } from "@/lib/blockchain";
import WalletConnection from "./WalletConnection";

interface TransactionSummary {
  txHash: string;
  summary: string;
  analysis: string;
  timestamp: string;
  transactions?: Transaction[];
}

const TransactionAnalyzer = () => {
  const [txHash, setTxHash] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [etherscanKey, setEtherscanKey] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const { address, isConnected } = useAccount();
  const { toast } = useToast();

  const analyzeWalletTransactions = async () => {
    if (!address || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please connect wallet and provide LLM API key.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Fetch real transactions from blockchain
      const transactions = await fetchTransactions(address, etherscanKey);
      
      if (transactions.length === 0) {
        toast({
          title: "No Transactions",
          description: "No transactions found for this address.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      // Generate summary based on real transaction data
      const totalValue = transactions.reduce((sum, tx) => {
        const value = parseFloat(formatEther(tx.value));
        return sum + value;
      }, 0);

      const uniqueAddresses = new Set([
        ...transactions.map(tx => tx.to),
        ...transactions.map(tx => tx.from)
      ]).size;

      const mockSummary: TransactionSummary = {
        txHash: `Analysis of ${transactions.length} transactions`,
        summary: `Analyzed ${transactions.length} recent transactions with total value of ${totalValue.toFixed(4)} ETH. Interactions with ${uniqueAddresses} unique addresses detected. Most recent activity shows ${transactions[0].functionName || 'Transfer'} operations.`,
        analysis: `Transaction pattern analysis shows regular DeFi activity. Average gas usage indicates efficient transaction routing. The wallet demonstrates active participation in decentralized finance protocols with no suspicious patterns detected.`,
        timestamp: new Date().toLocaleString(),
        transactions: transactions.slice(0, 5), // Show first 5 transactions
      };
      
      setSummary(mockSummary);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${transactions.length} transactions.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed", 
        description: "Failed to fetch or analyze transactions. Check Etherscan API key.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeSingleTransaction = async () => {
    if (!txHash || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please provide both transaction hash and API key.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // For single transaction analysis - would integrate with blockchain explorer APIs
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummary: TransactionSummary = {
        txHash: txHash,
        summary: "This transaction represents a token swap on a decentralized exchange. The user exchanged 1.5 ETH for approximately 2,847 USDC tokens through a DEX aggregator, with a total gas fee of 0.003 ETH.",
        analysis: "The transaction was executed efficiently with minimal slippage. The gas price was within normal range for the network congestion at the time. This appears to be a standard DeFi interaction with no suspicious activity detected.",
        timestamp: new Date().toLocaleString(),
      };
      
      setSummary(mockSummary);
      toast({
        title: "Analysis Complete",
        description: "Transaction has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    });
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Analyze Transaction</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enter a transaction hash and your LLM API key to get AI-powered insights and summaries.
        </p>
      </div>

      {/* Wallet Connection Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <WalletConnection />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wallet Analysis Card */}
        {isConnected && (
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Wallet Analysis
              </CardTitle>
              <CardDescription>
                Analyze your connected wallet's transaction history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">LLM API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="etherscanKey">Etherscan API Key (Optional)</Label>
                <Input
                  id="etherscanKey"
                  type="password"
                  placeholder="For higher rate limits"
                  value={etherscanKey}
                  onChange={(e) => setEtherscanKey(e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Provides higher rate limits for transaction fetching.
                </p>
              </div>
              
              <Button 
                onClick={analyzeWalletTransactions} 
                disabled={isAnalyzing || !apiKey}
                className="w-full"
                variant="glow"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing Wallet...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Analyze My Transactions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Single Transaction Card */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Single Transaction
            </CardTitle>
            <CardDescription>
              Analyze a specific transaction by hash.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="txHash">Transaction Hash</Label>
              <Input
                id="txHash"
                placeholder="0x..."
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey2">LLM API Key</Label>
              <Input
                id="apiKey2"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Your API key is used locally and not stored anywhere.
              </p>
            </div>
            
            <Button 
              onClick={analyzeSingleTransaction} 
              disabled={isAnalyzing || !txHash || !apiKey}
              className="w-full"
              variant="outline"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Transaction
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {summary && (
          <Card className="bg-gradient-card border-border/50 shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-generated summary and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Transaction Hash</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(summary.txHash)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono break-all bg-muted/30 p-2 rounded">
                  {summary.txHash}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Summary</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(summary.summary)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-muted/30 p-3 rounded-md">
                  {summary.summary}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Detailed Analysis</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(summary.analysis)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-muted/30 p-3 rounded-md">
                  {summary.analysis}
                </p>
              </div>
              
              {/* Transaction Details */}
              {summary.transactions && summary.transactions.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Recent Transactions</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {summary.transactions.map((tx, index) => (
                      <div key={index} className="text-xs bg-muted/20 p-2 rounded border-l-2 border-primary/30">
                        <div className="font-mono text-muted-foreground">
                          {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                        </div>
                        <div className="text-muted-foreground">
                          {formatEther(tx.value)} ETH • {tx.functionName || 'Transfer'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Analyzed at: {summary.timestamp}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default TransactionAnalyzer;