import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  account: string | null;
  onConnect: () => void;
}

export const Navbar = ({ account, onConnect }: NavbarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AcademiChain
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/issue"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/issue") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Issue Credential
            </Link>
            <Link
              to="/verify"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/verify") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Verify
            </Link>
            <Link
              to="/timeline"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/timeline") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Timeline
            </Link>
          </div>

          <Button
            onClick={onConnect}
            variant={account ? "outline" : "default"}
            className="gap-2"
          >
            <Wallet className="h-4 w-4" />
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};
