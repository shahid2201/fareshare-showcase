"use client";

import { useCallback, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useReceiptUpload } from "@/hooks/useReceiptUpload";
import { ALLOWED_RECEIPT_MIME_TYPES } from "@/lib/file-upload/constants";
import type { ShowcaseScanResult } from "@/lib/showcase-scan/public-types";
import { sanitizeFileName } from "@/lib/security";
import { cn } from "@/lib/utils";

const ACCEPT_TYPES = ALLOWED_RECEIPT_MIME_TYPES.join(",");

interface ReceiptUploadZoneProps {
  variant?: "default" | "compact";
  className?: string;
  onScanComplete?: (result: ShowcaseScanResult) => void;
  onScanReset?: () => void;
}

export function ReceiptUploadZone({
  variant = "default",
  className,
  onScanComplete,
  onScanReset,
}: ReceiptUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { uploadReceipt, uploading, csrfLoading, csrfError, csrfReady } = useReceiptUpload();

  const isCompact = variant === "compact";
  const disabled = uploading || csrfLoading || !csrfReady;

  const resetState = useCallback(() => {
    setError("");
    setCompleted(false);
    setFileName("");
    onScanReset?.();
  }, [onScanReset]);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      resetState();

      if (!file) {
        return;
      }

      if (!csrfReady) {
        setError("Secure upload is still initializing. Please wait a moment.");
        return;
      }

      setFileName(sanitizeFileName(file.name));

      const result = await uploadReceipt(file, honeypot);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      if (result.scan) {
        setCompleted(true);
        onScanComplete?.(result.scan);
      }
    },
    [csrfReady, honeypot, onScanComplete, resetState, uploadReceipt],
  );

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    void handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDragging(false);
    void handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_TYPES}
        className="sr-only"
        disabled={disabled}
        onChange={onInputChange}
      />

      <input
        tabIndex={-1}
        autoComplete="off"
        name="company"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <motion.button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (completed) {
            resetState();
          }
          inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        whileHover={disabled ? undefined : { scale: 1.01 }}
        whileTap={disabled ? undefined : { scale: 0.99 }}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl border-2 border-dashed transition-colors",
          isCompact ? "rounded-lg p-4" : "p-8",
          dragging
            ? "border-emerald-400 bg-emerald-500/10"
            : "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/50 hover:bg-emerald-500/10",
          disabled && "cursor-not-allowed opacity-80",
        )}
      >
        {!isCompact && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-emerald-400/40 shadow-[0_0_12px_#34d399]" />
        )}

        <div className="relative flex flex-col items-center gap-2 text-center">
          {uploading || csrfLoading ? (
            <Loader2
              className={cn(
                "animate-spin text-emerald-400",
                isCompact ? "h-4 w-4" : "h-8 w-8",
              )}
            />
          ) : completed ? (
            <CheckCircle2
              className={cn("text-emerald-400", isCompact ? "h-4 w-4" : "h-8 w-8")}
            />
          ) : (
            <Upload
              className={cn(
                "text-emerald-400/80 transition-colors group-hover:text-emerald-400",
                isCompact ? "h-4 w-4" : "h-8 w-8",
              )}
            />
          )}

          <div>
            <p
              className={cn(
                "font-medium text-emerald-300",
                isCompact ? "text-[8px]" : "text-sm",
              )}
            >
              {csrfLoading
                ? "Preparing secure scan..."
                : uploading
                  ? "Reading your receipt..."
                  : completed
                    ? "Scan complete — tap to try another"
                    : "Tap to scan or upload"}
            </p>
            {!isCompact && (
              <p className="mt-1 text-xs text-zinc-500">
                JPEG, PNG, WebP, or PDF up to 5 MB
              </p>
            )}
          </div>
        </div>
      </motion.button>

      {fileName ? (
        <p
          className={cn(
            "mt-2 truncate text-zinc-500",
            isCompact ? "text-[7px]" : "text-xs",
          )}
        >
          {fileName}
        </p>
      ) : null}

      {csrfError ? (
        <p
          className={cn("mt-2 text-amber-400", isCompact ? "text-[7px]" : "text-xs")}
          role="alert"
        >
          Secure upload could not start. Refresh the page and try again.
        </p>
      ) : null}

      {error ? (
        <p
          className={cn("mt-2 text-red-400", isCompact ? "text-[7px]" : "text-xs")}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
