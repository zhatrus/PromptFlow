'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { llmServices, copyAndOpenLLM } from '@/lib/llm-services';
import { ExternalLink, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface LLMButtonsProps {
  text: string;
  className?: string;
}

export function LLMButtons({ text, className }: LLMButtonsProps) {
  const handleOpenLLM = async (serviceId: string) => {
    const service = llmServices.find((s) => s.id === serviceId);
    const success = await copyAndOpenLLM(text, serviceId);
    if (success) {
      toast.success(`Промпт скопійовано — вставте в ${service?.name}`);
    } else {
      toast.error('Не вдалося відкрити');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className={className}>
          <Sparkles className="h-4 w-4 mr-1" />
          Спробувати
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {llmServices.map((service) => (
          <DropdownMenuItem
            key={service.id}
            onClick={() => handleOpenLLM(service.id)}
            className="cursor-pointer"
          >
            <span className="mr-2">{service.icon}</span>
            {service.name}
            <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
