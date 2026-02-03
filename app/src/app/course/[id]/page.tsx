import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Lock, Lightbulb } from "lucide-react";
import { courseContent } from "@/data/course-content";
import { CopyButton } from "@/components/copy-button";
import { CourseCompleteButton } from "@/components/course-complete-button";

export default async function CoursePartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const part = courseContent.find((p) => p.id === id);

  if (!part) {
    notFound();
  }

  if (part.locked) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Lock className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">{part.title}</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Ця частина курсу ще в розробці. Скоро буде доступна!
        </p>
        <Button asChild>
          <Link href="/course">Повернутися до курсу</Link>
        </Button>
      </div>
    );
  }

  const partIndex = courseContent.findIndex((p) => p.id === id);
  const prevPart = partIndex > 0 ? courseContent[partIndex - 1] : null;
  const nextPart = partIndex < courseContent.length - 1 ? courseContent[partIndex + 1] : null;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/course" className="hover:text-primary">
          Курс
        </Link>
        <span>/</span>
        <span>{part.title}</span>
      </div>

      <div>
        <Badge 
          variant="outline" 
          className="mb-2"
          style={{ borderColor: part.color, color: part.color }}
        >
          Частина {part.num} з 7
        </Badge>
        <h1 className="text-3xl font-bold">{part.title}</h1>
        <p className="text-muted-foreground mt-2">{part.subtitle}</p>
      </div>

      <Separator />

      <div className="space-y-8">
        {part.techniques.map((technique) => (
          <Card key={technique.id} id={technique.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span 
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold"
                  style={{ backgroundColor: `${part.color}20`, color: part.color }}
                >
                  {technique.num}
                </span>
                <div>
                  <CardTitle>{technique.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{technique.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="whitespace-pre-line">{technique.content}</p>
              
              {technique.codeExamples && technique.codeExamples.length > 0 && (
                <div className="space-y-3">
                  {technique.codeExamples.map((example, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex items-center justify-between bg-muted px-3 py-1.5 rounded-t-lg border border-b-0">
                        <span className="text-xs text-muted-foreground">{example.title}</span>
                        <CopyButton text={example.code} />
                      </div>
                      <pre className="bg-muted/50 p-4 rounded-b-lg border overflow-x-auto text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {technique.tips && technique.tips.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    {technique.tips.map((tip, idx) => (
                      <p key={idx}>{tip}</p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <CourseCompleteButton partId={part.id} partTitle={part.title} />
        
        <div className="flex gap-2">
          {prevPart && !prevPart.locked ? (
            <Button variant="outline" asChild>
              <Link href={`/course/${prevPart.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{prevPart.title}</span>
                <span className="sm:hidden">Назад</span>
              </Link>
            </Button>
          ) : null}
          {nextPart && !nextPart.locked ? (
            <Button asChild>
              <Link href={`/course/${nextPart.id}`}>
                <span className="hidden sm:inline">{nextPart.title}</span>
                <span className="sm:hidden">Далі</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/course">
                Повернутися до курсу
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
