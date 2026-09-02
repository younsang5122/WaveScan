import { useCallback, useRef } from 'react';

export const useToast = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, duration = 2500) => {
    const toastEl = document.getElementById('toast');
    if (!toastEl) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    timerRef.current = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }, []);

  return { showToast };
};
