import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Zap, Brain, Shield, Activity } from "lucide-react";
import TransactionAnalyzer from "@/components/TransactionAnalyzer";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-16 space-y-16">
        <TransactionAnalyzer />
        
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Why Use OnChain Agent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Advanced LLM technology analyzes complex transaction patterns and provides human-readable insights.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your transaction data is processed securely with no storage of sensitive information.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Insights</CardTitle>
                <CardDescription>
                  Get instant analysis and summaries of transaction data across multiple blockchain networks.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;