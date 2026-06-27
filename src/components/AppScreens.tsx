"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { MVP_ACCOUNT_MENU } from "@/lib/account/constants";
import { SafeLink } from "./ui/SafeLink";

interface PhoneFrameProps {
  children: ReactNode;
  label: string;
  index: number;
}

export function PhoneFrame({ children, label, index }: PhoneFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, rotateY: 5, rotateX: -3 }}
      className="group shrink-0 snap-center"
      style={{ perspective: 1000 }}
    >
      <div className="relative w-56 md:w-64">
        <div className="rounded-[2.5rem] border-4 border-zinc-800 bg-zinc-900 p-2 shadow-2xl shadow-black/40 transition-shadow group-hover:shadow-emerald-500/10">
          <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-zinc-800" />
          <div className="overflow-hidden rounded-[2rem] aspect-[9/19]">
            {children}
          </div>
        </div>
        <p className="mt-4 text-center text-sm font-medium text-zinc-400 group-hover:text-emerald-400 transition-colors">
          {label}
        </p>
        <div className="absolute -inset-4 -z-10 rounded-full bg-emerald-500/0 blur-2xl transition-all group-hover:bg-emerald-500/5" />
      </div>
    </motion.div>
  );
}

export function HomeScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-2 text-[8px] font-bold text-emerald-400">FareShare</div>
      <div className="mb-3 text-[9px] font-semibold text-zinc-300">Your Shared Money</div>
      <div className="mb-2 grid grid-cols-3 gap-1">
        {[
          { label: "You owe", value: "$12" },
          { label: "Owed", value: "$37" },
          { label: "Attention", value: "3" },
        ].map((tile) => (
          <div key={tile.label} className="rounded-md bg-zinc-800/80 p-1.5 text-center">
            <div className="text-[6px] text-zinc-500">{tile.label}</div>
            <div className="text-[8px] font-bold text-emerald-400">{tile.value}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1.5">
        {["Spent · $412", "Open · $48", "Settled · $142"].map((a) => (
          <div key={a} className="flex justify-between rounded-md bg-zinc-800/50 px-2 py-1.5 text-[8px]">
            <span className="text-zinc-400">{a.split(" · ")[0]}</span>
            <span className="text-zinc-200">{a.split(" · ")[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ItemsScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-2 text-xs font-bold text-zinc-300">My Items</div>
      <div className="mb-2 flex gap-1">
        <div className="flex-1 rounded-md bg-emerald-500/20 py-1 text-center text-[7px] text-emerald-400">My Receipts</div>
        <div className="flex-1 rounded-md bg-zinc-800 py-1 text-center text-[7px] text-zinc-500">I Need to Pay</div>
      </div>
      {[
        { name: "Trader Joe's", meta: "3 items · Jun 18", amount: "$15.47" },
        { name: "Whole Foods", meta: "6 items · Jun 15", amount: "$29.24" },
      ].map((receipt) => (
        <div key={receipt.name} className="mb-1.5 rounded-lg bg-zinc-800/80 p-2">
          <div className="flex justify-between">
            <div className="text-[9px] font-medium text-zinc-300">{receipt.name}</div>
            <div className="text-[9px] text-emerald-400">{receipt.amount}</div>
          </div>
          <div className="text-[7px] text-zinc-500">{receipt.meta}</div>
        </div>
      ))}
    </div>
  );
}

export function ActivityScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-bold text-zinc-300">Activity</div>
        <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800">
          <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
          <span className="text-[8px]">🔔</span>
        </div>
      </div>
      <div className="mb-2 flex gap-1">
        <div className="flex-1 rounded-md bg-emerald-500/20 py-1 text-center text-[6px] text-emerald-400">Confirmations</div>
        <div className="flex-1 rounded-md bg-zinc-800 py-1 text-center text-[6px] text-zinc-500">History</div>
      </div>
      {[
        { who: "Alex marked paid", amt: "Confirm?", time: "2h ago" },
        { who: "You paid Jordan", amt: "-$8.50", time: "1d ago" },
        { who: "New assignment", amt: "$4.99", time: "3d ago" },
      ].map((a) => (
        <div key={a.who} className="mb-2 border-b border-zinc-800 pb-2">
          <div className="flex justify-between">
            <span className="text-[8px] text-zinc-400">{a.who}</span>
            <span className="text-[8px] font-medium text-emerald-400">{a.amt}</span>
          </div>
          <div className="text-[7px] text-zinc-600">{a.time}</div>
        </div>
      ))}
    </div>
  );
}

function AccountMenuRow({
  label,
  href,
  destructive = false,
}: {
  label: string;
  href?: string;
  destructive?: boolean;
}) {
  const className = `mb-1.5 flex items-center justify-between rounded-lg px-2.5 py-2 text-[8px] ${
    destructive
      ? "bg-red-500/10 text-red-400"
      : "bg-zinc-800/50 text-zinc-400"
  }`;

  if (href) {
    return (
      <SafeLink href={href} className={className}>
        {label}
        <span className="text-zinc-600">›</span>
      </SafeLink>
    );
  }

  return (
    <div className={className} aria-disabled="true">
      {label}
      <span className={destructive ? "text-red-400/60" : "text-zinc-600"}>›</span>
    </div>
  );
}

export function AccountScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">S</div>
        <div className="text-[10px] font-medium text-zinc-300">Sheikh A.</div>
        <div className="text-[8px] text-zinc-500">Individual Plan</div>
      </div>
      {MVP_ACCOUNT_MENU.map((item) =>
        "action" in item ? (
          <AccountMenuRow key={item.label} label={item.label} destructive />
        ) : (
          <AccountMenuRow key={item.label} label={item.label} href={item.href} />
        )
      )}
    </div>
  );
}

export function ScanFlowScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-3 text-xs font-bold text-zinc-300">Scan Receipt</div>
      <div className="mb-3 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="mb-2 h-16 w-full rounded-lg bg-zinc-800/80" />
        <div className="text-[8px] text-emerald-400">Align receipt in frame</div>
      </div>
      <div className="rounded-lg bg-zinc-800/80 p-2 text-center text-[8px] text-zinc-400">
        Long-press shutter for manual entry
      </div>
    </div>
  );
}

export function ReviewFlowScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-1 text-xs font-bold text-zinc-300">Review scan</div>
      <div className="mb-2 flex gap-1">
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-400">High confidence</span>
        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[7px] text-amber-400">1 to review</span>
      </div>
      {[
        { name: "Milk", price: "$4.99", status: "Ready" },
        { name: "Bread", price: "$5.49", status: "Ready" },
        { name: "Avocados", price: "$3.99", status: "Review" },
      ].map((item) => (
        <div key={item.name} className="mb-1.5 flex items-center justify-between rounded-lg bg-zinc-800/80 p-2">
          <span className="text-[8px] text-zinc-300">{item.name}</span>
          <div className="flex items-center gap-1">
            <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[6px] text-zinc-500">{item.status}</span>
            <span className="text-[8px] text-zinc-200">{item.price}</span>
          </div>
        </div>
      ))}
      <div className="mt-auto rounded-lg bg-emerald-500 py-2 text-center text-[9px] font-bold text-black">
        Save & continue
      </div>
    </div>
  );
}

export function FriendsScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-3 text-xs font-bold text-zinc-300">Friends</div>
      {[
        { name: "Alex M.", status: "Friend" },
        { name: "Jordan K.", status: "Friend" },
        { name: "Sam R.", status: "Request sent" },
      ].map((friend) => (
        <div key={friend.name} className="mb-2 flex items-center gap-2 rounded-lg bg-zinc-800/80 p-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-[8px] font-bold text-emerald-400">
            {friend.name[0]}
          </div>
          <div className="flex-1">
            <div className="text-[9px] text-zinc-300">{friend.name}</div>
            <div className="text-[7px] text-zinc-500">{friend.status}</div>
          </div>
        </div>
      ))}
      <div className="mt-auto rounded-lg border border-emerald-500/30 py-2 text-center text-[8px] text-emerald-400">
        Add friend by username
      </div>
    </div>
  );
}

/** @deprecated Use HomeScreen */
export const DashboardScreen = HomeScreen;
