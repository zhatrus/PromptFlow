import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock } from "lucide-react";

export default function QuizPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Квізи</h1>
        <p className="text-muted-foreground mt-2">
          Перевірте свої знання з форматування промптів.
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Brain className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Скоро буде доступно</CardTitle>
          <CardDescription>
            Ми готуємо інтерактивні квізи для перевірки знань
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Фаза 1.1
            </Badge>
            <Badge variant="outline">7 частин курсу</Badge>
            <Badge variant="outline">Множинний вибір</Badge>
            <Badge variant="outline">Практичні завдання</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
