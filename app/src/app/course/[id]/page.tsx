import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";

const courseData: Record<string, { title: string; techniques: Array<{ name: string; description: string }> }> = {
  "1": {
    title: "Організація промпта",
    techniques: [
      { name: "Заголовки секцій", description: "Використовуйте заголовки для структуризації промпта" },
      { name: "Нумеровані списки", description: "Впорядковуйте інструкції за допомогою нумерації" },
      { name: "Маркеровані списки", description: "Групуйте пов'язані пункти" },
      { name: "Розділювачі", description: "Візуально відокремлюйте секції" },
      { name: "Відступи", description: "Створюйте ієрархію за допомогою відступів" },
      { name: "Порожні рядки", description: "Покращуйте читабельність" },
      { name: "Коментарі", description: "Додавайте пояснення до секцій" },
      { name: "Мітки секцій", description: "Іменуйте блоки для легкого посилання" },
    ],
  },
  "2": {
    title: "Подача даних",
    techniques: [
      { name: "Контекст на початку", description: "Розміщуйте фоновий контекст першим" },
      { name: "Структуровані дані", description: "Використовуйте JSON, XML, YAML для даних" },
      { name: "Приклади даних", description: "Показуйте формат очікуваних даних" },
      { name: "Змінні та плейсхолдери", description: "Позначайте місця для підстановки" },
      { name: "Посилання на дані", description: "Вказуйте на джерела інформації" },
    ],
  },
  "3": {
    title: "Опис правил",
    techniques: [
      { name: "Явні інструкції", description: "Формулюйте правила чітко та однозначно" },
      { name: "Негативні правила", description: "Вказуйте що НЕ робити" },
      { name: "Умовні правила", description: "Використовуйте if/then/else логіку" },
      { name: "Пріоритети правил", description: "Вказуйте важливість правил" },
      { name: "Обмеження", description: "Встановлюйте границі поведінки" },
      { name: "Винятки", description: "Описуйте особливі випадки" },
    ],
  },
  "4": {
    title: "Контроль формату відповіді",
    techniques: [
      { name: "Шаблон відповіді", description: "Надавайте структуру для заповнення" },
      { name: "JSON Output", description: "Вимагайте JSON формат відповіді" },
      { name: "Markdown форматування", description: "Вказуйте використання Markdown" },
      { name: "Довжина відповіді", description: "Обмежуйте кількість слів/символів" },
      { name: "Стиль мови", description: "Вказуйте формальність та тон" },
      { name: "Структура секцій", description: "Визначайте розділи відповіді" },
      { name: "Приклад виводу", description: "Показуйте бажаний результат" },
      { name: "Валідація", description: "Додавайте self-check блоки" },
    ],
  },
  "5": {
    title: "Лексика і синтаксис",
    techniques: [
      { name: "Імперативний стиль", description: "Використовуйте дієслова-накази: зроби, напиши, проаналізуй" },
      { name: "Конкретна лексика", description: "Уникайте розмитих формулювань" },
      { name: "Технічні терміни", description: "Використовуйте доменну термінологію" },
      { name: "Послідовність часів", description: "Дотримуйтесь єдиного часу дієслів" },
      { name: "Активний стан", description: "Перевага активному стану над пасивним" },
      { name: "Короткі речення", description: "Одна думка — одне речення" },
      { name: "Уникання двозначності", description: "Формулюйте так, щоб було лише одне тлумачення" },
    ],
  },
  "6": {
    title: "Few-shot приклади",
    techniques: [
      { name: "Вхід-вихід пари", description: "Показуйте input та очікуваний output" },
      { name: "Різноманітність прикладів", description: "Покривайте різні сценарії" },
      { name: "Контрастні приклади", description: "Показуйте правильно vs неправильно" },
      { name: "Градація складності", description: "Від простих до складних прикладів" },
      { name: "Коментування прикладів", description: "Пояснюйте чому саме такий результат" },
    ],
  },
  "7": {
    title: "Лайфхаки",
    techniques: [
      { name: "Chain of Thought", description: "Просіть модель думати покроково" },
      { name: "Role prompting", description: "Призначайте роль/персону моделі" },
      { name: "Температура та параметри", description: "Налаштовуйте креативність відповідей" },
      { name: "Ітеративне уточнення", description: "Покращуйте промпт через діалог" },
      { name: "Розбиття на підзадачі", description: "Складні задачі → прості кроки" },
    ],
  },
};

export default async function CoursePartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = courseData[id];

  if (!data) {
    notFound();
  }

  const partNumber = parseInt(id);
  const prevPart = partNumber > 1 ? partNumber - 1 : null;
  const nextPart = partNumber < 7 ? partNumber + 1 : null;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/course" className="hover:text-primary">
          Курс
        </Link>
        <span>/</span>
        <span>Частина {id}</span>
      </div>

      <div>
        <Badge variant="outline" className="mb-2">
          Частина {id} з 7
        </Badge>
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground mt-2">
          {data.techniques.length} технік форматування
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {data.techniques.map((technique, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                {index + 1}
              </span>
              {technique.name}
            </h3>
            <p className="text-muted-foreground pl-8">{technique.description}</p>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex justify-between">
        {prevPart ? (
          <Button variant="outline" asChild>
            <Link href={`/course/${prevPart}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Частина {prevPart}
            </Link>
          </Button>
        ) : (
          <div />
        )}
        {nextPart ? (
          <Button asChild>
            <Link href={`/course/${nextPart}`}>
              Частина {nextPart}
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
  );
}
