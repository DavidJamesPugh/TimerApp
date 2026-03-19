import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseTimerOptions = {
  initialSeconds?: number;
  autoStart?: boolean;
};

export function useTimer(options: UseTimerOptions = {}) {
  const { initialSeconds = 25 * 60, autoStart = false } = options;
  const [durationSeconds, setDurationSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTicker = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTicker();
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return clearTicker;
  }, [clearTicker, isRunning]);

  useEffect(() => clearTicker, [clearTicker]);

  const setDuration = useCallback((seconds: number) => {
    const next = Math.max(0, Math.floor(seconds));
    setDurationSeconds(next);
    setRemainingSeconds(next);
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
    }
  }, [remainingSeconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(durationSeconds);
  }, [durationSeconds]);

  const progress = useMemo(() => {
    if (durationSeconds <= 0) {
      return 0;
    }

    return (durationSeconds - remainingSeconds) / durationSeconds;
  }, [durationSeconds, remainingSeconds]);

  return {
    durationSeconds,
    remainingSeconds,
    isRunning,
    progress,
    setDuration,
    start,
    pause,
    reset,
  };
}
