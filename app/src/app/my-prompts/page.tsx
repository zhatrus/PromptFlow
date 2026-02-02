'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Search, Trash2, Edit, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  type UserPrompt, 
  getAllPrompts, 
  addPrompt, 
  deletePrompt, 
  updatePrompt,
  promptCategories 
} from "@/lib/db";
import { CopyButton } from "@/components/copy-button";
import { LLMButtons } from "@/components/llm-buttons";

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<UserPrompt[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<UserPrompt | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<UserPrompt | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Загальне',
    tags: '',
  });

  useEffect(() => {
    loadPrompts();
  }, []);

  async function loadPrompts() {
    try {
      const data = await getAllPrompts();
      setPrompts(data);
    } catch (error) {
      console.error('Failed to load prompts:', error);
      toast.error('Помилка завантаження промптів');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Заповніть назву та текст промпта');
      return;
    }

    try {
      const tags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      if (editingPrompt?.id) {
        await updatePrompt(editingPrompt.id, {
          title: formData.title,
          content: formData.content,
          category: formData.category,
          tags,
        });
        toast.success('Промпт оновлено');
      } else {
        await addPrompt({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          tags,
        });
        toast.success('Промпт збережено');
      }

      setIsDialogOpen(false);
      setEditingPrompt(null);
      setFormData({ title: '', content: '', category: 'Загальне', tags: '' });
      loadPrompts();
    } catch (error) {
      console.error('Failed to save prompt:', error);
      toast.error('Помилка збереження');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Видалити цей промпт?')) return;
    
    try {
      await deletePrompt(id);
      toast.success('Промпт видалено');
      loadPrompts();
      if (selectedPrompt?.id === id) {
        setSelectedPrompt(null);
      }
    } catch (error) {
      console.error('Failed to delete prompt:', error);
      toast.error('Помилка видалення');
    }
  }

  function handleEdit(prompt: UserPrompt) {
    setEditingPrompt(prompt);
    setFormData({
      title: prompt.title,
      content: prompt.content,
      category: prompt.category,
      tags: prompt.tags.join(', '),
    });
    setIsDialogOpen(true);
  }

  function handleNewPrompt() {
    setEditingPrompt(null);
    setFormData({ title: '', content: '', category: 'Загальне', tags: '' });
    setIsDialogOpen(true);
  }

  const filteredPrompts = prompts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.content.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-muted-foreground">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Мої промпти</h1>
          <p className="text-muted-foreground mt-2">
            Ваші збережені промпти. Зберігаються локально у браузері.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewPrompt}>
              <Plus className="h-4 w-4 mr-2" />
              Новий промпт
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPrompt ? 'Редагувати промпт' : 'Новий промпт'}</DialogTitle>
              <DialogDescription>
                {editingPrompt ? 'Внесіть зміни до промпта' : 'Створіть новий промпт для збереження'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Назва</label>
                <Input 
                  placeholder="Назва промпта" 
                  className="mt-1"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Категорія</label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {promptCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Промпт</label>
                <textarea
                  className="mt-1 w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                  placeholder="Введіть текст промпта..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Теги (через кому)</label>
                <Input 
                  placeholder="code, gpt, assistant" 
                  className="mt-1"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleSave}>
                {editingPrompt ? 'Оновити' : 'Зберегти'}
              </Button>
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

      {filteredPrompts.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>{prompts.length === 0 ? 'Немає збережених промптів' : 'Нічого не знайдено'}</CardTitle>
            <CardDescription>
              {prompts.length === 0 
                ? 'Створіть свій перший промпт або збережіть з хелперів'
                : 'Спробуйте інший пошуковий запит'}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <Card 
              key={prompt.id} 
              className={`cursor-pointer transition-all ${
                selectedPrompt?.id === prompt.id 
                  ? 'ring-2 ring-primary shadow-md' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPrompt(selectedPrompt?.id === prompt.id ? null : prompt)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{prompt.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {prompt.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
                  {prompt.content}
                </p>
                {prompt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {prompt.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{prompt.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedPrompt && (
        <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[500px] shadow-xl border-2">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedPrompt.title}</CardTitle>
                <Badge variant="outline" className="mt-1">{selectedPrompt.category}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPrompt(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="bg-muted p-3 rounded-lg text-sm font-mono whitespace-pre-wrap max-h-[200px] overflow-y-auto">
              {selectedPrompt.content}
            </pre>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={selectedPrompt.content} />
              <LLMButtons text={selectedPrompt.content} />
              <Button variant="outline" size="sm" onClick={() => handleEdit(selectedPrompt)}>
                <Edit className="h-4 w-4 mr-1" />
                Редагувати
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => selectedPrompt.id && handleDelete(selectedPrompt.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Видалити
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
