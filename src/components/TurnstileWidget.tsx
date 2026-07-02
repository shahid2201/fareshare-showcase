"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

import { TURNSTILE_SCRIPT_URL, TURNSTILE_SITE_KEY } from "@/lib/turnstile/constants";

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

export function TurnstileWidget({ onToken, onExpire, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptReadyRef = useRef(false);

  const renderWidget = useCallback(() => {
    if (!scriptReadyRef.current || !containerRef.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      callback: onToken,
      "expired-callback": onExpire,
      "error-callback": onError,
    });
  }, [onError, onExpire, onToken]);

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  if (!TURNSTILE_SITE_KEY) {
    return null;
  }

  return (
    <>
      <Script
        src={TURNSTILE_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={() => {
          scriptReadyRef.current = true;
          renderWidget();
        }}
      />
      <div ref={containerRef} className="flex justify-center" />
    </>
  );
}

export function isTurnstileEnabled(): boolean {
  return Boolean(TURNSTILE_SITE_KEY);
}
