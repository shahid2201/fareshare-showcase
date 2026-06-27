"use client";

import { useCallback, useState } from "react";
import { useCsrfToken } from "@/components/CsrfProvider";
import { CSRF_HEADER_NAME } from "@/lib/csrf/constants";
import { RECEIPT_MAX_BYTES } from "@/lib/file-upload/constants";
import type { ShowcaseScanResult } from "@/lib/showcase-scan/public-types";

type UploadReceiptResult =
  | { ok: true; scan: ShowcaseScanResult | null }
  | { ok: false; error: string };

async function postReceiptUpload(
  file: File,
  honeypot: string,
  csrfToken: string,
): Promise<Response> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("company", honeypot);

  return fetch("/api/receipts/upload", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      [CSRF_HEADER_NAME]: csrfToken,
    },
    body: formData,
  });
}

export function useReceiptUpload() {
  const { token, loading: csrfLoading, error: csrfError, refreshToken } = useCsrfToken();
  const [uploading, setUploading] = useState(false);

  const uploadReceipt = useCallback(
    async (file: File, honeypot = ""): Promise<UploadReceiptResult> => {
      if (honeypot.trim()) {
        return { ok: true, scan: null };
      }

      let activeToken = token ?? (await refreshToken());

      if (!activeToken) {
        return {
          ok: false,
          error: csrfError ?? "Secure upload is not ready yet. Refresh and try again.",
        };
      }

      if (file.size > RECEIPT_MAX_BYTES) {
        return { ok: false, error: "File exceeds the 5 MB limit." };
      }

      setUploading(true);

      try {
        let response = await postReceiptUpload(file, honeypot, activeToken);

        if (response.status === 403) {
          activeToken = await refreshToken();
          if (activeToken) {
            response = await postReceiptUpload(file, honeypot, activeToken);
          }
        }

        const payload = (await response.json()) as {
          error?: string;
          scan?: ShowcaseScanResult | null;
        };

        if (!response.ok) {
          return {
            ok: false,
            error: payload.error ?? "Unable to scan receipt.",
          };
        }

        return {
          ok: true,
          scan: payload.scan ?? null,
        };
      } catch {
        return { ok: false, error: "Unable to scan receipt." };
      } finally {
        setUploading(false);
      }
    },
    [csrfError, refreshToken, token],
  );

  return {
    uploadReceipt,
    uploading,
    csrfLoading,
    csrfError,
    csrfReady: Boolean(token) && !csrfLoading,
  };
}
