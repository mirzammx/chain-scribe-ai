import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Brain, Loader2, Copy, ExternalLink } from "lucide-react";

interface TransactionSummary {
  txHash: string;
  summary: string;
  analysis: string;
  timestamp: string;
}

const TransactionAnalyzer = () => {
  const [txHash, setTxHash] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const { toast } = useToast();

  const analyzTransaction = async () => {
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
      // Simulate API call to analyze transaction
      // In a real implementation, this would call your LLM API
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

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Transaction Input
            </CardTitle>
            <CardDescription>
              Provide transaction details and API credentials for analysis.
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
              <Label htmlFor="apiKey">LLM API Key</Label>
              <Input
                id="apiKey"
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
              onClick={analyzTransaction} 
              disabled={isAnalyzing || !txHash || !apiKey}
              className="w-full"
              variant="glow"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
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