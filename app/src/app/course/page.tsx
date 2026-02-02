import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";

const courseParts = [
  {
    id: 1,
    title: "Організація промпта",
    description: "Структура, порядок секцій, візуальне форматування",
    techniques: 8,
    status: "ready",
  },
  {
    id: 2,
    title: "Подача даних",
    description: "Формати даних, контекст, приклади",
    techniques: 5,
    status: "ready",
  },
  {
    id: 3,
    title: "Опис правил",
    description: "Інструкції, обмеження, умови",
    techniques: 6,
    status: "ready",
  },
  {
    id: 4,
    title: "Контроль формату відповіді",
    description: "Структура виводу, шаблони, валідація",
    techniques: 8,
    status: "ready",
  },
  {
    id: 5,
    title: "Лексика і синтаксис",
    description: "Вибір слів, стиль, тон",
    techniques: 7,
    status: "ready",
  },
  {
    id: 6,
    title: "Few-shot приклади",
    description: "Навчання на прикладах, шаблони відповідей",
    techniques: 5,
    status: "ready",
  },
  {
    id: 7,
    title: "Лайфхаки",
    description: "Поради та трюки для кращих результатів",
    techniques: 5,
    status: "ready",
  },
];

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
        {courseParts.map((part) => (
          <Link key={part.id} href={`/course/${part.id}`}>
            <Card className="transition-all hover:shadow-md hover:border-primary/50 cursor-pointer group">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl">
                  {part.id}
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {part.title}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </CardTitle>
                  <CardDescription>{part.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{part.techniques} технік</Badge>
                  {part.status === "ready" && (
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
