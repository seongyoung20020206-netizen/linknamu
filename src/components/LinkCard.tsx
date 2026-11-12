"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
};

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // sendBeacon은 페이지를 떠나도 요청이 유실되지 않음
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="group relative block w-full rounded-2xl border border-white/60 bg-white/45 px-12 py-4 text-center text-[0.9375rem] font-semibold text-slate-800 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_8px_24px_-12px_rgb(30_37_48/0.35)] backdrop-blur-xl transition duration-300 ease-out hover:bg-white/60 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_12px_28px_-12px_rgb(30_37_48/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 active:scale-[0.99] motion-safe:hover:-translate-y-px"
    >
      {link.title}
      {/* 외부 링크임을 알리는 작은 화살표 — 호버 시 살짝만 움직임 */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-slate-500/70 transition duration-300 group-hover:text-slate-700 motion-safe:group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}
