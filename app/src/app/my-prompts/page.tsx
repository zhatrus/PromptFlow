'use client';

import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MyPromptsPage() {
  const [prompts] = useState<Array<{ id: string; title: string; content: string; tags: string[] }>>([]);
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Мої промпти</h1>
          <p className="text-muted-foreground mt-2">
            Ваші збережені промпти. Зберігаються локально у браузері.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Новий промпт
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новий промпт</DialogTitle>
              <DialogDescription>
                Створіть новий промпт для збереження
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Назва</label>
                <Input placeholder="Назва промпта" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Промпт</label>
                <textarea
                  className="mt-1 w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Введіть текст промпта..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Теги (через кому)</label>
                <Input placeholder="code, gpt, assistant" className="mt-1" />
              </div>
              <Button className="w-full">Зберегти</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Пошук промптів..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {prompts.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Немає збережених промптів</CardTitle>
            <CardDescription>
              Створіть свій перший промпт або збережіть з хелперів
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prompts
            .filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase()) ||
              p.content.toLowerCase().includes(search.toLowerCase())
            )
            .map((prompt) => (
              <Card key={prompt.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {prompt.content}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
