import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

interface TimelineCredential {
  id: string;
  cid: string;
  issuedAt: string;
  studentAddress: string;
}

export default function Timeline() {
  const [credentials, setCredentials] = useState<TimelineCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      // Note: This endpoint would need to be implemented in the backend
      // For now, we'll show sample data
      const sampleData: TimelineCredential[] = [
        {
          id: "1",
          cid: "QmExample1234567890abcdef",
          issuedAt: new Date().toISOString(),
          studentAddress: "0x1234567890abcdef1234567890abcdef12345678",
        },
        {
          id: "2",
          cid: "QmExample0987654321fedcba",
          issuedAt: new Date(Date.now() - 86400000).toISOString(),
          studentAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
        },
      ];
      setCredentials(sampleData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load credentials timeline",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Credentials Timeline</h1>
          <p className="text-muted-foreground">
            View all issued credentials in chronological order
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading credentials...</p>
          </div>
        ) : credentials.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No credentials issued yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {credentials.map((credential, index) => (
                <div key={credential.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                  <Card className="shadow-card hover:shadow-glow transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline">ID: {credential.id}</Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(credential.issuedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground font-mono">
                            Student: {credential.studentAddress.slice(0, 10)}...
                            {credential.studentAddress.slice(-8)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">CID:</span>
                            <span className="ml-2 font-mono text-foreground">
                              {credential.cid.slice(0, 20)}...
                            </span>
                          </div>
                          <a
                            href={`https://gateway.pinata.cloud/ipfs/${credential.cid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            View on IPFS
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
