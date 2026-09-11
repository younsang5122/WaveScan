import { useEffect, useState } from 'react';

export interface ToastMessage {
  id: number;
  text: string;
}

/** useToastMessages hook — 토스트 메시지 목록을 관리 */
export function useToastMessages() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { text } = (e as CustomEvent<{ text: string }>).detail;
      const id = Date.now();
      setMessages((prev) => [...prev, { id, text }]);
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, 2800);
    };
    window.addEventListener('wavescan_toast', handler);
    return () => window.removeEventListener('wavescan_toast', handler);
  }, []);

  return messages;
}

export default useToastMessages;
