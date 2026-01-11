import React, { useEffect, useState } from 'react';
import { Skin } from '../types';
import { getSkinById } from '../services/db';
import { ArrowLeft, Download, Calendar, User, Tag, Share2 } from 'lucide-react';

interface SkinDetailsProps {
  id: string;
  onBack: () => void;
}

export const SkinDetails: React.FC<SkinDetailsProps> = ({ id, onBack }) => {
  const [skin, setSkin] = useState<Skin | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setSkin(getSkinById(id));
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-accent">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-current"></div>
      </div>
    );
  }

  if (!skin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Skin not found</h2>
        <button onClick={onBack} className="text-brand-accent hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Side */}
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-accent/5">
              <img src={skin.imageUrl} alt={skin.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
               {/* Mock thumbnails */}
               <div className="aspect-video rounded-lg bg-brand-surface border border-white/10 overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <img src={skin.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0" />
               </div>
               <div className="aspect-video rounded-lg bg-brand-surface border border-white/10 overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <img src={skin.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0 scale-125" />
               </div>
               <div className="aspect-video rounded-lg bg-brand-surface border border-white/10 overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <img src={skin.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0 scale-150" />
               </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded text-xs font-bold bg-brand-accent/10 text-brand-accent border border-brand-accent/20 uppercase tracking-wider">
                {skin.category}
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {skin.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-400 border-b border-white/10 pb-8">
              <div className="flex items-center gap-2">
                <User size={16} className="text-brand-secondary" />
                <span>By <span className="text-white font-medium">{skin.author}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-secondary" />
                <span>{new Date(skin.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-brand-secondary" />
                <span>Version 1.0</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-8 text-gray-300">
              <p className="text-lg leading-relaxed">{skin.description}</p>
            </div>

            <div className="mt-auto space-y-4">
              <button 
                onClick={() => window.open(skin.downloadUrl || '#', '_blank')}
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-black font-bold text-lg py-4 px-6 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-3"
              >
                <Download size={24} />
                Download Skin
              </button>
              
              <button className="w-full bg-brand-surface border border-white/10 hover:border-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};