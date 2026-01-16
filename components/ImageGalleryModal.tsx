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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-brand-accent/30 w-full max-w-3xl rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-brand-accent font-oxanium font-bold uppercase tracking-widest flex items-center gap-2">
            <ImageIcon size={20} /> Media Library
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Grid Gambar */}
        <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-4">
              <Loader2 className="animate-spin text-brand-accent" size={32} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fetching Assets...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div 
                  key={img.public_id} 
                  onClick={() => { onSelect(img.secure_url); onClose(); }}
                  className="group relative aspect-video bg-white/5 rounded-lg border border-white/10 hover:border-brand-accent cursor-pointer overflow-hidden transition-all hover:scale-105"
                >
                  <img src={img.secure_url} alt="asset" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Check className="text-brand-accent" size={24} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
