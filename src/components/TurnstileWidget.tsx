"use client";

import Script from "next/script";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { TURNSTILE_SCRIPT_URL, TURNSTILE_SITE_KEY } from "@/lib/turnstile/constants";

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

export type TurnstileWidgetHandle = {
  reset: () => void;
};

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onToken, onExpire, onError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onTokenRef = useRef(onToken);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);

    onTokenRef.current = onToken;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;

    const renderWidget = () => {
      if (widgetIdRef.current || !containerRef.current || !window.turnstile) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onErrorRef.current?.(),
      });
    };

    const renderWidgetRef = useRef(renderWidget);
    renderWidgetRef.current = renderWidget;

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      let cancelled = false;

      const tryRender = () => {
        if (!cancelled) {
          renderWidgetRef.current();
        }
      };

      if (window.turnstile) {
        tryRender();
      } else {
        // Script may already be in the document from a prior mount without onLoad firing again.
        const existing = document.querySelector<HTMLScriptElement>(
          `script[src="${TURNSTILE_SCRIPT_URL}"]`,
        );
        if (existing) {
          existing.addEventListener("load", tryRender);
        }
      }

      return () => {
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, []);

    if (!TURNSTILE_SITE_KEY) {
      return null;
    }

    return (
      <>
        <Script
          src={TURNSTILE_SCRIPT_URL}
          strategy="afterInteractive"
          onLoad={() => {
            renderWidgetRef.current();
          }}
        />
        <div ref={containerRef} className="flex justify-center" />
      </>
    );
  },
);

export function isTurnstileEnabled(): boolean {
  return Boolean(TURNSTILE_SITE_KEY);
}
