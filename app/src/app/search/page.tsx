'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, BookOpen, Sparkles, Wrench, ArrowRight } from "lucide-react";
import { search, getSearchSuggestions, type SearchResult } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const suggestions = getSearchSuggestions();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        const searchResults = search(query);
        setResults(searchResults);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'technique':
        return <Sparkles className="h-4 w-4" />;
      case 'helper':
        return <Wrench className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course':
        return 'Курс';
      case 'technique':
        return 'Техніка';
      case 'helper':
        return 'Хелпер';
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
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
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Спробуйте пошукати:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <Badge 
                key={suggestion}
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      ) : isSearching ? (
        <div className="text-center py-12 text-muted-foreground">
          Пошук...
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Нічого не знайдено за запитом «{query}»
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Спробуйте інший запит
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Знайдено {results.length} результат{results.length === 1 ? '' : results.length < 5 ? 'и' : 'ів'}
          </p>
          {results.map((result) => (
            <Link key={`${result.type}-${result.id}`} href={result.url}>
              <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                <CardHeader className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base line-clamp-1">{result.title}</CardTitle>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
                      </div>
                      <CardDescription className="line-clamp-2 mt-1">
                        {result.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(result.type)}
                        </Badge>
                        {result.partTitle && (
                          <span className="text-xs text-muted-foreground">
                            {result.partTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
