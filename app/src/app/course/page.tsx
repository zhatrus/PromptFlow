'use client';

import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Lock, Circle } from "lucide-react";
import { courseContent } from "@/data/course-content";
import { useAppStore } from "@/lib/store";

export default function CoursePage() {
  const { isPartComplete } = useAppStore();
  const completedCount = courseContent.filter(p => !p.locked && isPartComplete(p.id)).length;
  const totalUnlocked = courseContent.filter(p => !p.locked).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Курс з форматування промптів</h1>
        <p className="text-muted-foreground mt-2">
          Повний курс з {courseContent.length} частин про техніки форматування промптів для ефективної роботи з ШІ.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(completedCount / totalUnlocked) * 100}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {completedCount} / {totalUnlocked} пройдено
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {courseContent.map((part) => {
          const completed = isPartComplete(part.id);
          
          return (
            <Link 
              key={part.id} 
              href={part.locked ? '#' : `/course/${part.id}`}
              className={part.locked ? 'pointer-events-none' : ''}
            >
              <Card className={`transition-all cursor-pointer group ${
                part.locked 
                  ? 'opacity-60' 
                  : completed
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'hover:shadow-md hover:border-primary/50'
              }`}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl"
                    style={{ 
                      backgroundColor: `${part.color}20`, 
                      color: part.color 
                    }}
                  >
                    {part.num}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {part.title}
                      {!part.locked && (
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      )}
                    </CardTitle>
                    <CardDescription>{part.subtitle}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{part.techniques.length} технік</Badge>
                    {part.locked ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
