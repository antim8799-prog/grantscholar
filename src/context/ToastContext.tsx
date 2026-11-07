import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type ToastType = 'info' | 'success' | 'warning' | 'error';
interface Toast { id: number; message: string; type: ToastType }
type AddToast = (message: string, type?: ToastType) => void;
const ToastStateContext = createContext<Toast[]>([]);
const ToastActionContext = createContext<AddToast | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const nextId = useRef(0);
  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);
  const addToast = useCallback<AddToast>((message, type = 'info') => {
    const id = ++nextId.current;
    setToasts(previous => [...previous, { id, message, type }]);
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setToasts(previous => previous.filter(toast => toast.id !== id));
    }, 4000);
    timers.current.add(timer);
  }, []);
  return <ToastActionContext.Provider value={addToast}>
    <ToastStateContext.Provider value={toasts}>{children}</ToastStateContext.Provider>
  </ToastActionContext.Provider>;
}

export const useToasts = () => useContext(ToastStateContext);
export function useAddToast() {
  const addToast = useContext(ToastActionContext);
  if (!addToast) throw new Error('Toast actions require ToastProvider');
  return addToast;
}
