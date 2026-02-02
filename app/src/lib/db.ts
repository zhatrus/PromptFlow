import Dexie, { type EntityTable } from 'dexie';

export interface UserPrompt {
  id?: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const db = new Dexie('PromptGuideDB') as Dexie & {
  prompts: EntityTable<UserPrompt, 'id'>;
};

db.version(1).stores({
  prompts: '++id, title, category, *tags, createdAt, updatedAt',
});

export { db };

export async function addPrompt(prompt: Omit<UserPrompt, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
  const now = new Date();
  const id = await db.prompts.add({
    ...prompt,
    createdAt: now,
    updatedAt: now,
  });
  return id as number;
}

export async function updatePrompt(id: number, updates: Partial<Omit<UserPrompt, 'id' | 'createdAt'>>): Promise<number> {
  return db.prompts.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
}

export async function deletePrompt(id: number): Promise<void> {
  return db.prompts.delete(id);
}

export async function getAllPrompts(): Promise<UserPrompt[]> {
  return db.prompts.orderBy('updatedAt').reverse().toArray();
}

export async function getPromptById(id: number): Promise<UserPrompt | undefined> {
  return db.prompts.get(id);
}

export async function searchPrompts(query: string): Promise<UserPrompt[]> {
  const lowerQuery = query.toLowerCase();
  return db.prompts
    .filter((prompt) => 
      prompt.title.toLowerCase().includes(lowerQuery) ||
      prompt.content.toLowerCase().includes(lowerQuery) ||
      prompt.category.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
    .toArray();
}

export async function getPromptsByCategory(category: string): Promise<UserPrompt[]> {
  return db.prompts.where('category').equals(category).toArray();
}

export const promptCategories = [
  'Загальне',
  'Програмування',
  'Написання тексту',
  'Аналіз',
  'Переклад',
  'Креатив',
  'Бізнес',
  'Освіта',
  'Інше',
];
