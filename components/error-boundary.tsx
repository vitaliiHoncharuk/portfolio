"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">Something went wrong!</h1>
        
        <p className="text-muted-foreground">
          We encountered an unexpected error. This might be due to a temporary issue.
        </p>
        
        {error.message && (
          <div className="p-4 rounded-lg bg-muted/50 text-left">
            <p className="text-sm font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => {
              // Clear Next.js cache and reload
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
            variant="outline"
          >
            Refresh Page
          </Button>
          
          <Button onClick={reset}>
            Try Again
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          If this error persists, try clearing your browser cache or contact support.
        </p>
      </div>
    </div>
  );
}