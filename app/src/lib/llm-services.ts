export interface LLMService {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

export const llmServices: LLMService[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com/',
    icon: '🤖',
    color: '#10a37f',
  },
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai/',
    icon: '🟣',
    color: '#7c5cff',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.google.com/',
    icon: '✨',
    color: '#4285f4',
  },
  {
    id: 'qwen',
    name: 'Qwen',
    url: 'https://chat.qwen.ai/',
    icon: '🔵',
    color: '#1890ff',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    url: 'https://deepseek.com/',
    icon: '🌊',
    color: '#0066cc',
  },
];

export async function copyAndOpenLLM(text: string, serviceId: string): Promise<boolean> {
  const service = llmServices.find((s) => s.id === serviceId);
  if (!service) return false;

  try {
    await navigator.clipboard.writeText(text);
    window.open(service.url, '_blank', 'noopener,noreferrer');
    return true;
  } catch {
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
