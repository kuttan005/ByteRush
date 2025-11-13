import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Loader2, CheckCircle2, XCircle, ExternalLink, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

interface Credential {
  id: string;
  studentAddress: string;
  cid: string;
  issuedAt: string;
  revoked: boolean;
}

export default function VerifyCredential() {
  const [credentialId, setCredentialId] = useState("");
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState<Credential | null>(null);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentialId) {
      toast({
        title: "Missing Information",
        description: "Please provide a credential ID",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setCredential(null);

    try {
      const response = await fetch(`${BACKEND_URL}/credential/${credentialId}`);

      if (!response.ok) {
        throw new Error("Credential not found");
      }

      const data = await response.json();
      setCredential(data);
      toast({
        title: "Credential Found",
        description: "Credential verified successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify credential",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Verify Credential</h1>
          <p className="text-muted-foreground">
            Check the authenticity of an academic credential
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Credential Verification</CardTitle>
            <CardDescription>
              Enter the credential ID to verify its authenticity on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID</Label>
                <Input
                  id="credentialId"
                  placeholder="Enter credential ID"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Verify Credential
                  </>
                )}
              </Button>
            </form>

            {credential && (
              <Alert
                className={`mt-6 ${
                  credential.revoked
                    ? "border-destructive bg-destructive/10"
                    : "border-success bg-success/10"
                }`}
              >
                {credential.revoked ? (
                  <XCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
                <AlertDescription className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">
                      {credential.revoked ? "Credential Revoked" : "Valid Credential"}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Credential ID:</span>
                        <span className="font-mono">{credential.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Student Address:</span>
                        <span className="font-mono">
                          {credential.studentAddress.slice(0, 6)}...
                          {credential.studentAddress.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Issued At:</span>
                        <span>{new Date(credential.issuedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span className={credential.revoked ? "text-destructive" : "text-success"}>
                          {credential.revoked ? "Revoked" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {credential.cid && !credential.revoked && (
                    <div className="pt-4 border-t">
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${credential.cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        View Document on IPFS
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
