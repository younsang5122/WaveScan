import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';

const slideUp = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateX(-50%) translateY(0); }
  to   { opacity: 0; transform: translateX(-50%) translateY(20px); }
`;

const ToastEl = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: calc(var(--bottom-nav-height, 64px) + 16px);
  left: 50%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  max-width: 340px;
  text-align: center;
  animation: ${({ $visible }) => ($visible ? slideUp : slideDown)} 0.3s
    cubic-bezier(0.4, 0, 0.2, 1) both;
`;

export interface ToastMessage {
  id: number;
  text: string;
}

interface ToastProps {
  messages: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ messages }) => {
  if (messages.length === 0) return null;
  const latest = messages[messages.length - 1];
  return createPortal(
    <ToastEl $visible key={latest.id}>
      {latest.text}
    </ToastEl>,
    document.body,
  );
};

export default Toast;

/** useToast hook — 토스트 메시지 목록을 관리 */
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
