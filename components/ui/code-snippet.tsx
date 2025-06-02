"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = "typescript" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative rounded-md bg-muted/70 overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-muted/90 border-b border-border">
        <span className="text-sm text-foreground/60">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 text-foreground/60 hover:text-primary hover:bg-muted/90"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <ClipboardCopy className="h-4 w-4" />
          )}
          <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="font-mono text-foreground/90 whitespace-pre-wrap">
            {mounted ? code : code}
          </code>
        </pre>
      </div>
    </div>
  );
}