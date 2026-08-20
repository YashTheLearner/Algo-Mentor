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

  const [remaining, setRemaining] = useState(duration);

 useEffect(() => {
  const update = () => {
    const nextRemaining = getRemaining();

    setRemaining(nextRemaining);

    if (nextRemaining === 0 && !expiredRef.current) {
      expiredRef.current = true;
      onExpired?.();
    }
  };

  update(); // immediately after hydration

  const timer = setInterval(update, 1000);

  return () => clearInterval(timer);
}, [startedAt, duration, onExpired]);

  return remaining;
}