// /* eslint-disable react/no-unescaped-entities */
'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const contactRegex = /(^|[\s])\/contact([^\w]|$)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={`link-${index}`}
          href={part}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary underline'
        >
          {part}
        </a>
      );
    }
    const contactParts = part.split(contactRegex);
    if (contactParts.length > 1) {
      return contactParts.map((chunk, i) => {
        if (chunk === '/contact') {
          return (
            <a key={`contact-${index}-${i}`} href='/contact' className='text-primary underline'>
              /contact
            </a>
          );
        }
        return chunk;
      });
    }
    return part;
  });
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      "Hi! I'm Mohanteja's AI assistant. Ask me about his skills, projects, education, or experience.",
  },
];

function appendAssistantChunk(
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  chunk: string
) {
  setMessages((prev) => {
    if (prev.length === 0) return prev;
    const next = [...prev];
    const lastIndex = next.length - 1;
    const last = next[lastIndex];
    if (last.role !== 'assistant') return prev;
    next[lastIndex] = { ...last, content: last.content + chunk };
    return next;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const handleSend = useCallback(async () => {
    if (!canSend) return;
    const question = input.trim();
    setInput('');
    setError(null);
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: question },
      { role: 'assistant', content: '' },
    ]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.replace(/^data:\s*/, '');
          if (data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            const delta = json?.choices?.[0]?.delta?.content;
            if (delta) appendAssistantChunk(setMessages, delta);
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch {
      setError('Failed to get a response. Please try again.');
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [canSend, input]);

  const handleClose = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(false);
    setOpen(false);
  }, []);

  return (
    <>
      {open && (
        <div className='fixed bottom-24 right-6 z-50 w-[90vw] max-w-md rounded-2xl border border-border/70 bg-panel/95 shadow-card backdrop-blur-lg'>
          <div className='flex items-center justify-between border-b border-border/70 px-4 py-3'>
            <div>
              <p className='text-sm uppercase tracking-[0.2em] text-primary'>AI Assistant</p>
              <p className='text-xs text-muted'>Profile-only answers</p>
            </div>
            <button
              className='rounded-full p-2 text-muted hover:text-primary'
              onClick={handleClose}
              aria-label='Close chat'
            >
              <X size={18} />
            </button>
          </div>

          <div className='max-h-[50vh] overflow-y-auto px-4 py-3 space-y-3 text-sm tracking-wide leading-relaxed'>
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`rounded-2xl px-3 py-2 whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'ml-auto bg-primary text-ink'
                    : 'mr-auto bg-ink/40 text-text'
                }`}
              >
                {msg.content
                  ? linkify(msg.content.replace('CONTACT_BUTTON', '').trim())
                  : msg.role === 'assistant' && loading
                    ? '...'
                    : ''}
                {msg.role === 'assistant' && msg.content.includes('CONTACT_BUTTON') && (
                  <div className='mt-2'>
                    <a
                      href='/contact'
                      className='inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink'
                    >
                      Contact Mohanteja
                    </a>
                  </div>
                )}
              </div>
            ))}
            {error && <div className='text-xs text-red-400'>{error}</div>}
          </div>

          <div className='border-t border-border/70 p-3'>
            <div className='flex items-center gap-2'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder='Ask about skills, projects, experience...'
                className='w-full rounded-full border border-border/70 bg-transparent px-4 py-2 text-sm text-text outline-none focus:border-primary'
              />
              <button
                onClick={handleSend}
                disabled={!canSend}
                className='rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-primaryStrong disabled:opacity-50'
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className='fixed bottom-12 right-12 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-ink shadow-glow transition hover:bg-primaryStrong group'
        aria-label='Open AI assistant'
      >
        <MessageCircle size={24} />
        <span className='pointer-events-none absolute right-14 rounded-full bg-panel/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text opacity-0 shadow-card transition-opacity duration-300 group-hover:opacity-100'>
          Chat with my AI assistant
        </span>
      </button>
    </>
  );
}
