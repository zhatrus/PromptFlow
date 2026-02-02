'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Пошук</h1>
        <p className="text-muted-foreground mt-2">
          Знайдіть потрібний контент у курсі, хелперах та бібліотеці.
        </p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Введіть запит для пошуку..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 text-lg"
          autoFocus
        />
      </div>

      {query.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Почніть вводити запит для пошуку</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="outline" className="cursor-pointer" onClick={() => setQuery('JSON')}>
              JSON
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setQuery('структура')}>
              структура
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setQuery('few-shot')}>
              few-shot
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => setQuery('формат')}>
              формат
            </Badge>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Результати для &quot;{query}&quot;:
          </p>
          <Card className="border-dashed">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Пошук буде доступний після імпорту контенту</CardTitle>
              <CardDescription>
                Наразі контент курсу та хелперів імпортується
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
}
