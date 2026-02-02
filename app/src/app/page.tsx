import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Library, FileText, Brain, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Курс",
    description: "7 частин з технік форматування промптів",
    icon: BookOpen,
    href: "/course",
    badge: "7 частин",
    color: "text-purple-500",
  },
  {
    title: "Хелпери",
    description: "Готові промпти для копіювання та використання",
    icon: Sparkles,
    href: "/helpers",
    badge: "15 промптів",
    color: "text-cyan-500",
  },
  {
    title: "Бібліотека",
    description: "Колекція промптів від спільноти",
    icon: Library,
    href: "/library",
    badge: "Скоро",
    color: "text-orange-500",
  },
  {
    title: "Мої промпти",
    description: "Ваші збережені промпти",
    icon: FileText,
    href: "/my-prompts",
    badge: "Локально",
    color: "text-green-500",
  },
  {
    title: "Квізи",
    description: "Перевірте свої знання",
    icon: Brain,
    href: "/quiz",
    badge: "Скоро",
    color: "text-pink-500",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
            Prompt Guide
          </span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Інтерактивний посібник з форматування промптів для ефективної роботи з ШІ.
          Курс, готові хелпери та бібліотека промптів.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="flex items-center gap-2">
                  {feature.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-8 p-6 rounded-lg bg-muted/50 border">
        <h2 className="text-xl font-semibold mb-2">🇺🇦 Про проєкт</h2>
        <p className="text-muted-foreground">
          Цей посібник створено для україномовної спільноти. Весь контент перекладено
          та адаптовано українською мовою. Працює офлайн як PWA — встановіть на телефон
          або комп&apos;ютер.
        </p>
      </section>
    </div>
  );
}
