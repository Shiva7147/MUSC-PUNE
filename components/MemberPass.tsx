'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface MemberPassProps {
  name: string;
  phone: string;
  email: string;
  category: string;
}

export const MemberPass: React.FC<MemberPassProps> = ({
  name,
  phone,
}) => {
  const displayName = name.trim() ? name : 'PUNE RED SUPPORTER';
  const displayPhone = phone.trim() ? phone : '+91 72767 35140';
  
  const memberHash = Math.abs(
    (displayName + displayPhone).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 137
  )
    .toString(16)
    .toUpperCase()
    .padStart(6, '9');

  const cardId = `PUNE-RED-2026-${memberHash}`;

  return (
    <div className="relative group perspective-1000">
      <div className="w-full bg-gradient-to-br from-[#E60012] via-[#99000A] to-[#400004] border border-[#E60012]/70 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[#E60012]/40">
        {/* Subtle Overlay Graphic */}
        <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />
        <div className="absolute right-[-20px] bottom-[-20px] font-display text-8xl font-bold opacity-10 select-none text-white pointer-events-none">
          PUNE
        </div>

        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center font-display text-xl font-bold border border-white/20 text-[#E60012]">
              MU
            </div>
            <div>
              <div className="font-display tracking-tight font-bold text-lg leading-tight">
                MUSC PUNE
              </div>
              <div className="text-[9px] font-mono tracking-widest text-white/80 uppercase">
                OFFICIAL DIGITAL RED CARD
              </div>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>ACTIVE MEMBER</span>
          </span>
        </div>

        {/* Member Details Body */}
        <div className="py-6 space-y-4 relative z-10">
          <div>
            <div className="text-[9px] font-mono tracking-widest text-white/70 uppercase">
              MEMBER NAME
            </div>
            <div className="font-display text-2xl font-bold tracking-tight uppercase truncate text-white drop-shadow">
              {displayName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <div className="text-[9px] text-white/70 uppercase">HELPLINE</div>
              <div className="font-bold text-white truncate">{displayPhone}</div>
            </div>
            <div>
              <div className="text-[9px] text-white/70 uppercase">PREFERRED AREA</div>
              <div className="font-bold text-white truncate">The Mills, Pune</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/15 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono text-white/70 uppercase">MEMBER ID</div>
              <div className="font-mono text-sm font-bold tracking-widest text-white">{cardId}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-mono text-white/70 uppercase">SEASON</div>
              <div className="font-mono text-xs font-bold text-white">2026 / 2027</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Live Dynamic QR */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/80">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Verified Matchday Pass Holder</span>
          </div>

          {/* Mini QR Graphic */}
          <div className="w-10 h-10 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
              <path d="M10 10h30v30H10zM15 15v20h20V15zM50 10h40v40H50zM55 15v30h30V15zM10 50h40v40H10zM15 55v30h30V55zM60 60h10v10H60zM80 60h10v10H80zM70 70h10v10H70zM60 80h10v10H60zM80 80h10v10H80z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
