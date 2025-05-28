"use client";

import { useEffect } from "react";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export default function NProgressProvider() {

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      handleStart();
      try {
        const response = await originalFetch(...args);
        return response;
      } finally {
        handleStop();
      }
    };

    return () => {
      window.fetch = originalFetch; // Clean up
    };
  }, []);

  return null;
}
