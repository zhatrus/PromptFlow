'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/llm-services';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      toast.success('Скопійовано!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Не вдалося скопіювати');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-1" />
          Скопійовано
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-1" />
          Копіювати
        </>
      )}
    </Button>
  );
}
