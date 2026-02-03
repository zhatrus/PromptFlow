'use client';

import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { CheckCircle, Circle } from 'lucide-react';
import { toast } from 'sonner';

interface CourseCompleteButtonProps {
  partId: string;
  partTitle: string;
}

export function CourseCompleteButton({ partId, partTitle }: CourseCompleteButtonProps) {
  const { isPartComplete, markPartComplete, markPartIncomplete } = useAppStore();
  const completed = isPartComplete(partId);

  const handleToggle = () => {
    if (completed) {
      markPartIncomplete(partId);
      toast.info(`"${partTitle}" знято з пройдених`);
    } else {
      markPartComplete(partId);
      toast.success(`"${partTitle}" позначено як пройдене!`);
    }
  };

  return (
    <Button
      variant={completed ? 'default' : 'outline'}
      onClick={handleToggle}
      className={completed ? 'bg-green-600 hover:bg-green-700' : ''}
    >
      {completed ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          Пройдено
        </>
      ) : (
        <>
          <Circle className="h-4 w-4 mr-2" />
          Позначити як пройдене
        </>
      )}
    </Button>
  );
}
