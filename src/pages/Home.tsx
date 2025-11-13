import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Blockchain-Powered Credentials
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Secure Academic
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Credentials on Chain
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Issue, verify, and manage academic credentials using blockchain technology and IPFS storage.
              Immutable, transparent, and forever accessible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/issue">
                <Button size="lg" className="gap-2">
                  <FileCheck className="h-5 w-5" />
                  Issue Credential
                </Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" variant="outline" className="gap-2">
                  <Shield className="h-5 w-5" />
                  Verify Credential
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-card hover:shadow-glow transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Blockchain Security</CardTitle>
              <CardDescription>
                Credentials stored on Ethereum blockchain, ensuring immutability and transparency
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>IPFS Storage</CardTitle>
              <CardDescription>
                Documents stored on IPFS via Pinata, distributed and permanently accessible
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Instant Verification</CardTitle>
              <CardDescription>
                Verify credentials instantly with on-chain data and IPFS document retrieval
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
                <p className="text-muted-foreground">
                  Upload the academic credential document (PDF, certificate, transcript) to IPFS for permanent storage.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Issue on Blockchain</h3>
                <p className="text-muted-foreground">
                  Link the IPFS hash (CID) to the student's wallet address on Ethereum blockchain.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verify Anytime</h3>
                <p className="text-muted-foreground">
                  Anyone can verify the credential using the credential ID, retrieving both on-chain data and the original document.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
