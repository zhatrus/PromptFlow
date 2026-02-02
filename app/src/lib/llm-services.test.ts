import { describe, it, expect, vi, beforeEach } from 'vitest';
import { llmServices, copyToClipboard, copyAndOpenLLM } from './llm-services';

describe('llmServices', () => {
  it('should have 5 LLM services', () => {
    expect(llmServices).toHaveLength(5);
  });

  it('should include ChatGPT', () => {
    const chatgpt = llmServices.find((s) => s.id === 'chatgpt');
    expect(chatgpt).toBeDefined();
    expect(chatgpt?.name).toBe('ChatGPT');
    expect(chatgpt?.url).toBe('https://chat.openai.com/');
  });

  it('should include Claude', () => {
    const claude = llmServices.find((s) => s.id === 'claude');
    expect(claude).toBeDefined();
    expect(claude?.name).toBe('Claude');
    expect(claude?.url).toBe('https://claude.ai/');
  });

  it('should include Gemini', () => {
    const gemini = llmServices.find((s) => s.id === 'gemini');
    expect(gemini).toBeDefined();
    expect(gemini?.url).toBe('https://gemini.google.com/');
  });

  it('should include Qwen', () => {
    const qwen = llmServices.find((s) => s.id === 'qwen');
    expect(qwen).toBeDefined();
    expect(qwen?.url).toBe('https://chat.qwen.ai/');
  });

  it('should include DeepSeek', () => {
    const deepseek = llmServices.find((s) => s.id === 'deepseek');
    expect(deepseek).toBeDefined();
    expect(deepseek?.url).toBe('https://deepseek.com/');
  });
});

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should copy text to clipboard', async () => {
    const text = 'Test prompt';
    const result = await copyToClipboard(text);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
    expect(result).toBe(true);
  });

  it('should return false on error', async () => {
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Failed'));

    const result = await copyToClipboard('test');
    expect(result).toBe(false);
  });
});

describe('copyAndOpenLLM', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should copy prompt and open LLM URL', async () => {
    const prompt = 'Test prompt';
    const serviceId = 'chatgpt';

    const result = await copyAndOpenLLM(prompt, serviceId);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(prompt);
    expect(window.open).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return false for unknown service', async () => {
    const result = await copyAndOpenLLM('test', 'unknown');

    expect(window.open).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
