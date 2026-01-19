import React, { useEffect, useState } from "react";
import { X, Image as ImageIcon, Loader2, Check } from "lucide-react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function ImageGalleryModal({ isOpen, onClose, onSelect }: ImageGalleryModalProps) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resources");
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getThumbnailUrl = (url: string) => {
    if (!url) return "/placeholder.png";
    return url.replace("/upload/", "/upload/w_400,c_scale,f_auto,q_auto/");
  };

  if (!isOpen) return null;

  return (
    // OVERLAY: Lebih soft dengan blur
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-in fade-in duration-300">
      
      {/* MODAL CONTAINER: Super Rounded & Glass */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-[#00f0ff] font-oxanium font-bold uppercase tracking-widest flex items-center gap-3 text-lg">
            <div className="p-2 rounded-full bg-[#00f0ff]/10">
              <ImageIcon size={20} />
            </div>
            Media Library ({images.length})
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/20 hover:rotate-90 transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-60 gap-4">
              <Loader2 className="animate-spin text-[#00f0ff]" size={40} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] animate-pulse">
                Establishing Cloud Uplink...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div 
                  key={img.public_id} 
                  onClick={() => { 
                    onSelect(img.secure_url);
                    onClose(); 
                  }}
                  className="group relative aspect-video bg-white/5 rounded-2xl border border-white/5 hover:border-[#00f0ff]/50 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                >
                  <img 
                    src={getThumbnailUrl(img.secure_url)} 
                    alt="asset" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-[#00f0ff] flex items-center justify-center shadow-[0_0_15px_#00f0ff] scale-0 group-hover:scale-100 transition-transform duration-300">
                       <Check className="text-black" size={20} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* FOOTER HINT */}
        <div className="px-8 py-4 border-t border-white/5 bg-black/20 text-center">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Select an asset to attach to matrix</span>
        </div>
      </div>
    </div>
  );
}
