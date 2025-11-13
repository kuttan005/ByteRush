import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileCheck, Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function IssueCredential() {
  const [studentAddress, setStudentAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ cid: string; txHash: string } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentAddress || !file) {
      toast({
        title: "Missing Information",
        description: "Please provide both student address and file",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Step 1: Upload to IPFS
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to IPFS");
      }

      const { cid } = await uploadResponse.json();

      // Step 2: Issue credential on blockchain
      const issueResponse = await fetch(`${BACKEND_URL}/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentAddress,
          cid,
        }),
      });

      if (!issueResponse.ok) {
        throw new Error("Failed to issue credential");
      }

      const { txHash } = await issueResponse.json();

      setResult({ cid, txHash });
      toast({
        title: "Success!",
        description: "Credential issued successfully on blockchain",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to issue credential",
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
          <h1 className="text-4xl font-bold mb-2">Issue Credential</h1>
          <p className="text-muted-foreground">
            Upload document and issue credential on blockchain
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Credential Details</CardTitle>
            <CardDescription>
              Provide the student's wallet address and upload the credential document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentAddress">Student Wallet Address</Label>
                <Input
                  id="studentAddress"
                  placeholder="0x..."
                  value={studentAddress}
                  onChange={(e) => setStudentAddress(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Credential Document</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="flex-1"
                  />
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileCheck className="h-4 w-4 text-success" />
                      {file.name}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Issue Credential
                  </>
                )}
              </Button>
            </form>

            {result && (
              <Alert className="mt-6 border-success bg-success/10">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertDescription className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Credential Issued Successfully!</p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">IPFS CID:</span>
                        <a
                          href={`https://gateway.pinata.cloud/ipfs/${result.cid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {result.cid.slice(0, 20)}...
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div>
                        <span className="font-medium">Transaction Hash:</span>
                        <span className="ml-2 font-mono">{result.txHash.slice(0, 20)}...</span>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
