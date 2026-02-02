import Fuse from 'fuse.js';
import { courseContent } from '@/data/course-content';

export interface SearchResult {
  type: 'course' | 'technique' | 'helper';
  id: string;
  title: string;
  description: string;
  content?: string;
  partId?: string;
  partTitle?: string;
  url: string;
}

function buildSearchIndex(): SearchResult[] {
  const items: SearchResult[] = [];

  // Add course parts and techniques
  for (const part of courseContent) {
    // Add part itself
    items.push({
      type: 'course',
      id: part.id,
      title: `Частина ${part.num}: ${part.title}`,
      description: part.subtitle,
      url: `/course/${part.id}`,
    });

    // Add techniques from each part
    for (const technique of part.techniques) {
      items.push({
        type: 'technique',
        id: technique.id,
        title: technique.title,
        description: technique.description,
        content: technique.content,
        partId: part.id,
        partTitle: part.title,
        url: `/course/${part.id}#${technique.id}`,
      });
    }
  }

  // Add helpers (simplified list)
  const helpers = [
    { id: 'structurizer', title: 'Структуризатор промпта', description: 'Перетворює хаотичний промпт на структурований' },
    { id: 'pseudocode', title: 'Генератор псевдокоду', description: 'Конвертує текстові інструкції в псевдокод' },
    { id: 'self-check', title: 'Генератор Self-Check', description: 'Додає блок самоперевірки до промпта' },
    { id: 'ascii-frame', title: 'ASCII-рамка', description: 'Обрамлює текст ASCII-рамкою для виділення' },
    { id: 'json-structurizer', title: 'JSON-структуризатор', description: 'Конвертує промпт у JSON-формат' },
    { id: 'few-shot', title: 'Генератор Few-shot', description: 'Створює приклади для few-shot навчання' },
    { id: 'decorators', title: 'Prompt Decorators', description: 'Додає декоратори для уточнення поведінки' },
    { id: 'xml-structurizer', title: 'XML-структуризатор', description: 'Конвертує промпт у XML-формат' },
    { id: 'yaml-config', title: 'YAML-конфігуратор', description: 'Створює YAML-конфігурацію промпта' },
    { id: 'table-converter', title: 'Табличний конвертер', description: 'Перетворює дані в табличний формат' },
    { id: 'json-schema', title: 'JSON-схема OUTPUT', description: 'Генерує JSON-схему для структури відповіді' },
    { id: 'contrast-pairs', title: 'Контрастні пари', description: 'Створює приклади правильно/неправильно' },
    { id: 'prioritizer', title: 'Пріоритизатор', description: 'Додає кольорові пріоритети до інструкцій' },
    { id: 'metaglyph', title: 'MetaGlyph-конвертер', description: 'Конвертує у MetaGlyph нотацію' },
    { id: 'token-splitter', title: 'Токенний роздільник', description: 'Оптимізує промпт для економії токенів' },
  ];

  for (const helper of helpers) {
    items.push({
      type: 'helper',
      id: helper.id,
      title: helper.title,
      description: helper.description,
      url: `/helpers/${helper.id}`,
    });
  }

  return items;
}

const searchIndex = buildSearchIndex();

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'content', weight: 0.2 },
    { name: 'partTitle', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
});

export function search(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results = fuse.search(query, { limit: 20 });
  return results.map((r) => r.item);
}

export function getSearchSuggestions(): string[] {
  return [
    'markdown',
    'xml теги',
    'json схема',
    'self-check',
    'few-shot',
    'псевдокод',
    'розділювачі',
    'таблиці',
    'плейсхолдери',
  ];
}
