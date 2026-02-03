import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Стилізація для списків
          ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          // Стилізація для жирного тексту
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          // Стилізація для параграфів
          p: ({ children }) => <p className="leading-relaxed my-2">{children}</p>,
          // Стилізація для code inline
          code: ({ children }) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
