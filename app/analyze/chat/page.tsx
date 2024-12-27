// app/analyze/chat/page.tsx
'use client';

import { Chatbot } from '@/components/Features/Analyze/Chatbot';

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Chat Assistant</h1>
      <Chatbot />
    </div>
  );
}