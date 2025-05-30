"use client";

import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = "typescript" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightedCode = code
    .replace(/(import|export|from|function|const|let|var|return|if|for|while|class|interface|type|extends|implements)(\s)/g, '<span class="text-violet-400">$1</span>$2')
    .replace(/(\(|\)|\{|\}|\[|\]|;|,|=>|=|\+|-|\*|\/|:|\?|&lt;|&gt;)/g, '<span class="text-gray-400">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/'([^'\\]*(\\.[^'\\]*)*)'|"([^"\\]*(\\.[^"\\]*)*)"/g, '<span class="text-amber-300">$&</span>')
    .replace(/\b(true|false|null|undefined|this|async|await|try|catch|new)\b/g, '<span class="text-amber-300">$1</span>');

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
          <code 
            className="font-mono text-foreground/90"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}