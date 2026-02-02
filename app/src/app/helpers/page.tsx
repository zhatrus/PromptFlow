import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const helpers = [
  {
    id: "structurizer",
    title: "Структуризатор промпта",
    description: "Перетворює хаотичний промпт на структурований",
    category: "Структура",
  },
  {
    id: "pseudocode",
    title: "Генератор псевдокоду",
    description: "Конвертує текстові інструкції в псевдокод",
    category: "Код",
  },
  {
    id: "self-check",
    title: "Генератор Self-Check",
    description: "Додає блок самоперевірки до промпта",
    category: "Валідація",
  },
  {
    id: "ascii-frame",
    title: "ASCII-рамка",
    description: "Обрамлює текст ASCII-рамкою для виділення",
    category: "Візуалізація",
  },
  {
    id: "json-structurizer",
    title: "JSON-структуризатор",
    description: "Конвертує промпт у JSON-формат",
    category: "Формат",
  },
  {
    id: "few-shot",
    title: "Генератор Few-shot",
    description: "Створює приклади для few-shot навчання",
    category: "Приклади",
  },
  {
    id: "decorators",
    title: "Prompt Decorators",
    description: "Додає декоратори для уточнення поведінки",
    category: "Модифікатори",
  },
  {
    id: "xml-structurizer",
    title: "XML-структуризатор",
    description: "Конвертує промпт у XML-формат",
    category: "Формат",
  },
  {
    id: "yaml-config",
    title: "YAML-конфігуратор",
    description: "Створює YAML-конфігурацію промпта",
    category: "Формат",
  },
  {
    id: "table-converter",
    title: "Табличний конвертер",
    description: "Перетворює дані в табличний формат",
    category: "Візуалізація",
  },
  {
    id: "json-schema",
    title: "JSON-схема OUTPUT",
    description: "Генерує JSON-схему для структури відповіді",
    category: "Валідація",
  },
  {
    id: "contrast-pairs",
    title: "Контрастні пари",
    description: "Створює приклади правильно/неправильно",
    category: "Приклади",
  },
  {
    id: "prioritizer",
    title: "Пріоритизатор 🔴🟡🟢",
    description: "Додає кольорові пріоритети до інструкцій",
    category: "Візуалізація",
  },
  {
    id: "metaglyph",
    title: "MetaGlyph-конвертер",
    description: "Конвертує у MetaGlyph нотацію",
    category: "Формат",
  },
  {
    id: "token-splitter",
    title: "Токенний роздільник",
    description: "Оптимізує промпт для економії токенів",
    category: "Оптимізація",
  },
];

const categories = [...new Set(helpers.map((h) => h.category))];

export default function HelpersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Промпти-хелпери</h1>
        <p className="text-muted-foreground mt-2">
          15 готових промптів для покращення ваших запитів до ШІ. Копіюйте та використовуйте.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge key={category} variant="outline">
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {helpers.map((helper) => (
          <Link key={helper.id} href={`/helpers/${helper.id}`}>
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{helper.category}</Badge>
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {helper.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription>{helper.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
