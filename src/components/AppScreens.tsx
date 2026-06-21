"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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

/* Screen mockups */
export function DashboardScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-3 text-xs font-bold text-zinc-300">Dashboard</div>
      <div className="mb-2 rounded-lg bg-emerald-500/10 p-2.5 border border-emerald-500/20">
        <div className="text-[8px] text-zinc-500">Net Balance</div>
        <div className="text-sm font-bold text-emerald-400">+$24.50</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {["Owe $12", "Owed $37", "Open 4", "Paid $142"].map((s) => (
          <div key={s} className="rounded-md bg-zinc-800/80 p-2 text-[8px] text-zinc-400">{s}</div>
        ))}
      </div>
      <div className="flex-1 space-y-1.5">
        {["Coffee · $18", "Groceries · $67", "Trip · $234"].map((a) => (
          <div key={a} className="flex justify-between rounded-md bg-zinc-800/50 px-2 py-1.5 text-[8px]">
            <span className="text-zinc-400">{a.split(" · ")[0]}</span>
            <span className="text-emerald-400">{a.split(" · ")[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ItemsScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-3 text-xs font-bold text-zinc-300">Items</div>
      {[
        { name: "Milk", price: "$4.99", conf: "98%" },
        { name: "Bread", price: "$5.49", conf: "95%" },
        { name: "Avocados", price: "$3.99", conf: "92%" },
        { name: "Coffee", price: "$12.99", conf: "97%" },
      ].map((item) => (
        <div key={item.name} className="mb-1.5 flex items-center justify-between rounded-lg bg-zinc-800/80 p-2">
          <div>
            <div className="text-[9px] text-zinc-300">{item.name}</div>
            <div className="text-[7px] text-emerald-500">{item.conf}</div>
          </div>
          <div className="text-[9px] font-medium text-zinc-200">{item.price}</div>
        </div>
      ))}
      <div className="mt-auto flex gap-1">
        {["Round", "Merge", "Assign"].map((b) => (
          <div key={b} className="flex-1 rounded-md bg-emerald-500/20 py-1.5 text-center text-[7px] text-emerald-400">{b}</div>
        ))}
      </div>
    </div>
  );
}

export function ActivityScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-3 text-xs font-bold text-zinc-300">Activity</div>
      {[
        { who: "Alex paid you", amt: "+$12.30", time: "2h ago" },
        { who: "You paid Jordan", amt: "-$8.50", time: "1d ago" },
        { who: "Sam settled up", amt: "+$24.00", time: "3d ago" },
        { who: "New bill: Groceries", amt: "$67.22", time: "5d ago" },
      ].map((a) => (
        <div key={a.who} className="mb-2 border-b border-zinc-800 pb-2">
          <div className="flex justify-between">
            <span className="text-[8px] text-zinc-400">{a.who}</span>
            <span className={`text-[8px] font-medium ${a.amt.startsWith("+") ? "text-emerald-400" : a.amt.startsWith("-") ? "text-red-400" : "text-zinc-300"}`}>{a.amt}</span>
          </div>
          <div className="text-[7px] text-zinc-600">{a.time}</div>
        </div>
      ))}
    </div>
  );
}

export function AccountScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">S</div>
        <div className="text-[10px] font-medium text-zinc-300">Sheikh A.</div>
        <div className="text-[8px] text-zinc-500">Household Plan</div>
      </div>
      {["Profile", "Notifications", "Privacy", "Subscription", "Help"].map((item) => (
        <div key={item} className="mb-1.5 flex items-center justify-between rounded-lg bg-zinc-800/50 px-2.5 py-2 text-[8px] text-zinc-400">
          {item}
          <span className="text-zinc-600">›</span>
        </div>
      ))}
    </div>
  );
}

export function ScanFlowScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-3 text-xs font-bold text-zinc-300">Scan Receipt</div>
      <div className="relative mb-3 w-full rounded-lg border-2 border-dashed border-emerald-500/30 bg-emerald-500/5 p-6">
        <div className="text-center text-[8px] text-emerald-400/70">Tap to scan or upload</div>
        <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-400/50 shadow-[0_0_8px_#34d399]" />
      </div>
      <div className="w-full rounded-lg bg-zinc-800/80 p-2">
        <div className="text-[7px] text-zinc-500 mb-1">Recent</div>
        <div className="text-[8px] text-zinc-400">Trader Joe&apos;s · $15.47</div>
      </div>
    </div>
  );
}

export function ReviewFlowScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0b] p-3 pt-8">
      <div className="mb-1 text-xs font-bold text-zinc-300">Review & Assign</div>
      <div className="mb-2 text-[8px] text-zinc-500">6 items · $29.24 total</div>
      {["Milk → Alex", "Bread → All", "Wine → Jordan"].map((a) => (
        <div key={a} className="mb-1.5 flex items-center justify-between rounded-lg bg-zinc-800/80 p-2">
          <span className="text-[8px] text-zinc-400">{a.split(" → ")[0]}</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-400">{a.split(" → ")[1]}</span>
        </div>
      ))}
      <div className="mt-auto rounded-lg bg-emerald-500 py-2 text-center text-[9px] font-bold text-black">
        Confirm Split
      </div>
    </div>
  );
}
