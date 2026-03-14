// hooks/useAlert.js
"use client"
import { useState, useCallback } from "react";

export function useAlert() {
  const [alerts, setAlerts] = useState([]);

  const fire = useCallback((type, title, message, duration = 4000) => {
    const id = Date.now() + Math.random();
    setAlerts(prev => [{ id, type, title, message, duration }, ...prev]);
  }, []);

  const dismiss = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  return { alerts, fire, dismiss };
}