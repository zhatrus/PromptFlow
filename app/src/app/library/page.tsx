import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Library, Clock } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Бібліотека промптів</h1>
        <p className="text-muted-foreground mt-2">
          Колекція промптів від спільноти з голосуванням та статистикою використання.
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Library className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Скоро буде доступно</CardTitle>
          <CardDescription>
            Ми працюємо над бібліотекою промптів від спільноти
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Фаза 2
            </Badge>
            <Badge variant="outline">Голосування</Badge>
            <Badge variant="outline">Публічні промпти</Badge>
            <Badge variant="outline">Категорії</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
