interface AccountPlaceholderProps {
  message: string;
}

export function AccountPlaceholder({ message }: AccountPlaceholderProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-zinc-400">
      {message}
    </div>
  );
}
