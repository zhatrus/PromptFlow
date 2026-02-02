import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";
import { courseContent } from "@/data/course-content";

export default function CoursePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Курс з форматування промптів</h1>
        <p className="text-muted-foreground mt-2">
          Повний курс з 7 частин про техніки форматування промптів для ефективної роботи з ШІ.
        </p>
      </div>

      <div className="grid gap-4">
        {courseContent.map((part) => (
          <Link 
            key={part.id} 
            href={part.locked ? '#' : `/course/${part.id}`}
            className={part.locked ? 'pointer-events-none' : ''}
          >
            <Card className={`transition-all cursor-pointer group ${
              part.locked 
                ? 'opacity-60' 
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
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
