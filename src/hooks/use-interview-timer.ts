"use client";

import { useEffect, useRef, useState } from "react";

export function useInterviewTimer(
  startedAt: number,
  duration: number,
  onExpired?: () => void
) {
  const expiredRef = useRef(false);

  const getRemaining = () => {
    const elapsed = Math.floor(
      (Date.now() - startedAt) / 1000
    );

    return Math.max(duration - elapsed, 0);
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextRemaining = getRemaining();

      setRemaining(nextRemaining);

      if (
        nextRemaining === 0 &&
        !expiredRef.current
      ) {
        expiredRef.current = true;

        clearInterval(timer);

        onExpired?.();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startedAt, duration, onExpired]);

  return remaining;
}