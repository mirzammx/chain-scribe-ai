import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-24 px-4">
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-slide-up">
          <Zap className="h-4 w-4" />
          Powered by Advanced AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-6 animate-slide-up">
          OnChain Agent
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up">
          Analyze and summarize blockchain transactions with AI-powered insights. 
          Get human-readable explanations of complex on-chain activities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Start Analyzing
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;