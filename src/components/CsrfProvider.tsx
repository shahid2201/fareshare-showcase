"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CSRF_HEADER_NAME } from "@/lib/csrf/constants";
import { fetchCsrfToken } from "@/lib/csrf/client";

type CsrfContextValue = {
  token: string | null;
  loading: boolean;
  error: string | null;
  refreshToken: () => Promise<string | null>;
  csrfHeaders: Record<string, string> | undefined;
};

const CsrfContext = createContext<CsrfContextValue | null>(null);

export function CsrfProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshToken = useCallback(async (): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const nextToken = await fetchCsrfToken();
      setToken(nextToken);
      return nextToken;
    } catch (fetchError) {
      setToken(null);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to initialize secure form.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshToken();
  }, [refreshToken]);

  const value = useMemo<CsrfContextValue>(
    () => ({
      token,
      loading,
      error,
      refreshToken,
      csrfHeaders: token ? { [CSRF_HEADER_NAME]: token } : undefined,
    }),
    [error, loading, refreshToken, token],
  );

  return <CsrfContext.Provider value={value}>{children}</CsrfContext.Provider>;
}

export function useCsrfToken() {
  const context = useContext(CsrfContext);

  if (!context) {
    throw new Error("useCsrfToken must be used within CsrfProvider.");
  }

  return context;
}
