import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    // Container utama dengan padding atas aman (pt-28) biar gak ketutup navbar
    <div className="min-h-screen bg-[#050505] pt-28 px-4 flex flex-col items-center justify-start relative overflow-hidden">
      
      {/* Background Blob (Biar konsisten ada cahayanya) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Loader Center - Glass Pill */}
      <div className="mb-12 relative z-10 flex flex-col items-center gap-6 mt-10">
        <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.15)] animate-pulse">
            <Loader2 className="w-8 h-8 text-[#00f0ff] animate-spin" />
        </div>
        <h2 className="text-[#00f0ff] font-oxanium font-bold text-xs md:text-sm uppercase tracking-[0.3em] animate-pulse opacity-80">
            Synchronizing Neural Link...
        </h2>
      </div>

      {/* Grid Skeleton ala iOS 26 */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-20">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          // GLASS CARD SKELETON
          // Update: Rounded-[32px] biar super bulat + Backdrop Blur
          <div key={i} className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-[32px] h-[380px] w-full relative overflow-hidden p-4 flex flex-col gap-5 shadow-lg">
            
            {/* Efek Kilatan Cahaya (Shimmer) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_1.5s_infinite]"></div>
            
            {/* Image Placeholder - Rounded dalam lebih kecil */}
            <div className="h-[220px] bg-white/5 rounded-[24px] w-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Content Placeholders */}
            <div className="space-y-4 px-2">
                {/* Title Line (Kapsul Panjang) */}
                <div className="h-5 bg-white/5 rounded-full w-3/4"></div>
                
                {/* Tags / Meta (Kapsul Pendek) */}
                <div className="flex gap-3">
                    <div className="h-8 w-24 bg-white/5 rounded-full"></div>
                    <div className="h-8 w-20 bg-white/5 rounded-full"></div>
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className="mt-auto h-1 w-full bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent rounded-full opacity-50"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
