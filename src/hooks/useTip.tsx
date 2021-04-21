import { useEffect, useRef } from 'react';
import cuid from 'cuid';
import { useNotifyContext, Dispatch } from '../notificationsContext/Context';

const useTutorial = () => {
  const { dispatch }: { dispatch: Dispatch } = useNotifyContext();
  const ref = useRef<any>();

  // Set an item in local storage
  // Format should be "fotogroove-tips-[tip name here]"
  const setItem = (item: string) => window.localStorage.setItem(item, 'true');

  // Adds a new notification if not already sent
  const addTimer = (id: string, timer: () => any) => {
    if (!ref.current) ref.current = [{ id, timer: timer() }];
    else if (ref.current?.every((e: any) => e.id !== id)) ref.current.push({ id, timer: timer() });
  };

  // Returns approximate time to read message in ms
  const calcTimeToRead = (message: string): number => {
    const numWords = message?.split(' ').length;
    const secToRead = numWords / 3.5; // Calculate for 3.5 words per second
    return Math.floor(secToRead * 1000);
  };

  // Configures a new tip
  const addTip = (id: string, content: string, config?: { timeout?: number; duration?: number }) => {
    const { timeout, duration } = config || {};
    addTimer(id, () => {
      setTimeout(() => {
        setItem(id);
        dispatch({
          type: 'ADD_NOTIFICATION',
          value: {
            id: cuid(),
            severity: 'info',
            content,
            duration: duration || calcTimeToRead(content) + 1500,
          },
        });
      }, timeout || 2000);
    });
  };

  // Clears all timeouts
  const clearAllTimers = () => {
    if (ref.current) return;
    ref.current?.forEach((e: any) => clearTimeout(e.timer));
  };

  // Clean up timers
  useEffect(() => () => clearAllTimers(), []);

  return addTip;
};

export default useTutorial;
