import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] pt-24 px-4 flex flex-col items-center justify-center">
      {/* Animasi Logo Berdenyut */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin relative z-10" />
      </div>
      
      <h2 className="text-brand-accent font-oxanium font-bold text-xl uppercase tracking-[0.3em] animate-pulse mb-12">
        Initializing Uplink...
      </h2>

      {/* Grid Skeleton ala Cyberpunk */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl h-[300px] w-full relative overflow-hidden">
            {/* Efek Kilatan Cahaya Lewat */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_1.5s_infinite]"></div>
            
            <div className="h-[60%] bg-white/5 m-4 rounded-lg"></div>
            <div className="h-4 bg-white/5 mx-4 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 mx-4 mt-2 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
