"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateSkin } from "@/app/lib/actions";
import { Edit3, Zap, Globe, Lock, ImageIcon, FolderOpen, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
        type="submit" 
        disabled={pending} 
        className={`w-full relative bg-[#00f0ff] hover:bg-[#00f0ff]/80 text-black font-oxanium font-black text-xl py-4 md:py-5 rounded-full shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:shadow-[0_0_60px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-4 group overflow-hidden ${pending ? 'opacity-70 cursor-wait' : 'hover:scale-[1.01]'}`}
    >
      {!pending && <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>}
      <span className="flex items-center gap-3 relative z-10">
        {pending ? <><Loader2 size={24} className="animate-spin" /> SYNCHRONIZING...</> : <><Zap size={24} strokeWidth={3} fill="black" /> CONFIRM UPDATE</>}
      </span>
    </button>
  );
}

export default function EditForm({ skin }: { skin: any }) {
  const updateSkinWithId = updateSkin.bind(null, skin.id);
  const [state, dispatch] = useFormState(updateSkinWithId, { message: null, errors: {} });
   
  const [formData, setFormData] = useState({
    title: skin.title,
    description: skin.description,
    image: skin.image,
    category: skin.category,
    published: skin.published,
    downloadUrl: skin.downloadUrl
  });

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? e.target.checked : value }));
  };

  const openWidget = (targetField: 'image' | 'downloadUrl') => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        sources: ["cloudinary", "local", "url"], 
        multiple: false,
        resourceType: targetField === 'image' ? 'image' : 'auto', 
        folder: "arbskin_uploads",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
           setFormData((prev: any) => ({ ...prev, [targetField]: result.info.secure_url }));
        }
      }
    );
    widget.open();
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 w-full">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />
      
      <Link href="/dashboard" className="inline-flex items-center gap-3 text-gray-500 hover:text-[#00f0ff] mb-6 md:mb-8 font-bold uppercase text-xs tracking-[0.2em] group transition-colors px-2">
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#00f0ff]/10 transition-colors">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        Cancel Sequence
      </Link>

      {/* MAIN FORM CARD - GLASS & ROUNDED */}
      {/* FIX: Mobile p-4 rounded-2xl | Desktop p-12 rounded-[40px] */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-3xl md:rounded-[40px] p-4 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-12 relative z-10">
          <div className="p-3 md:p-4 bg-[#00f0ff]/10 rounded-2xl border border-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <Edit3 size={24} className="md:w-7 md:h-7" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xl md:text-3xl font-oxanium font-black text-white uppercase tracking-tighter truncate">Edit Sequence</h1>
            <p className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1 truncate">
                Target Asset ID: <span className="font-mono text-[#00f0ff]">{skin.id.substring(0,8)}...</span>
            </p>
          </div>
        </div>

        <form action={dispatch} className="space-y-6 md:space-y-8 relative z-10">
            {/* SECTION 1: CORE DATA */}
            {/* FIX: Mobile p-4 | Desktop p-8 */}
            <div className="space-y-5 md:space-y-6 p-4 md:p-8 bg-black/20 rounded-2xl md:rounded-[32px] border border-white/5">
                <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-[#00f0ff] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2 md:ml-4">Asset Designation</label>
                    <input 
                        name="title" 
                        type="text" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        className="w-full bg-white/5 hover:bg-white/10 focus:bg-black/40 border border-white/10 focus:border-[#00f0ff] rounded-2xl md:rounded-full px-5 py-3 md:px-6 md:py-4 text-white font-oxanium font-bold text-sm md:text-lg uppercase tracking-wider outline-none transition-all duration-300 placeholder-gray-600 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)]" 
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label className="block text-[9px] md:text-[10px] font-black text-[#00f0ff] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2 md:ml-4">Classification</label>
                        <div className="relative">
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/5 border border-white/10 focus:border-[#00f0ff] rounded-full px-5 py-3 md:px-6 md:py-4 text-white font-oxanium font-bold uppercase tracking-widest cursor-pointer outline-none appearance-none transition-all text-sm"
                            >
                                <option value="street" className="bg-black text-gray-300">Street</option>
                                <option value="racing" className="bg-black text-gray-300">Racing</option>
                                <option value="drift" className="bg-black text-gray-300">Drift</option>
                                <option value="rally" className="bg-black text-gray-300">Rally</option>
                                <option value="custom" className="bg-black text-gray-300">Custom</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
                        </div>
                    </div>
                    <div>
                      <label className="block text-[9px] md:text-[10px] font-black text-[#00f0ff] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2 md:ml-4">Visibility</label>
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 h-[50px] md:h-[60px]">
                        <input type="hidden" name="published" value={formData.published.toString()} />
                        <button 
                            type="button" 
                            onClick={() => setFormData((p: any) => ({ ...p, published: !p.published }))} 
                            className={`flex-grow h-full rounded-full flex items-center justify-center gap-2 md:gap-3 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${formData.published ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'bg-transparent text-gray-500 hover:text-white'}`}
                        >
                          {formData.published ? <Globe size={14} className="md:w-4 md:h-4" /> : <Lock size={14} className="md:w-4 md:h-4" />} 
                          {formData.published ? 'Public Access' : 'Private'}
                        </button>
                      </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: ASSETS & LINKS */}
            {/* FIX: Mobile p-4 | Desktop p-8 */}
            <div className="space-y-5 md:space-y-6 p-4 md:p-8 bg-black/20 rounded-2xl md:rounded-[32px] border border-white/5">
                 <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-[#00f0ff] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2 md:ml-4">Visual Source URL</label>
                    <div className="flex gap-2 md:gap-3">
                        <input 
                            name="image" 
                            type="text" 
                            value={formData.image} 
                            onChange={handleInputChange} 
                            className="flex-grow bg-white/5 border border-white/10 focus:border-[#00f0ff] rounded-full px-5 py-3 md:px-6 md:py-4 text-gray-300 text-[10px] md:text-xs font-mono outline-none transition-all w-0" 
                        />
                        {/* Tombol Upload (Icon) tetap fixed size, Input flex-grow */}
                        <button 
                            type="button" 
                            onClick={() => openWidget('image')} 
                            className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-[#00f0ff]/10 hover:bg-[#00f0ff] border border-[#00f0ff]/30 text-[#00f0ff] hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
                        >
                            <ImageIcon size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-[#00f0ff] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2 md:ml-4">Technical Description</label>
                    <textarea 
                        name="description" 
                        rows={5} 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        className="w-full bg-white/5 hover:bg-white/10 focus:bg-black/40 border border-white/10 focus:border-[#00f0ff] rounded-2xl md:rounded-3xl p-4 md:p-6 text-gray-200 font-rajdhani text-sm leading-relaxed outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(0,240,255,0.1)]" 
                    />
                 </div>

                 <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-[#00f0ff] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2 md:ml-4">Data Uplink (Download Link)</label>
                    <div className="flex gap-2 md:gap-3">
                        <input 
                            name="downloadUrl" 
                            type="text" 
                            value={formData.downloadUrl} 
                            onChange={handleInputChange} 
                            className="flex-grow bg-white/5 border border-white/10 focus:border-[#00f0ff] rounded-full px-5 py-3 md:px-6 md:py-4 text-gray-300 text-[10px] md:text-xs font-mono outline-none transition-all w-0" 
                        />
                        <button 
                            type="button" 
                            onClick={() => openWidget('downloadUrl')} 
                            className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-[#00f0ff]/10 hover:bg-[#00f0ff] border border-[#00f0ff]/30 text-[#00f0ff] hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
                        >
                            <FolderOpen size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>
                 </div>
            </div>

            {state?.message && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Error: {state.message}
                </div>
            )}
            
            <SubmitButton />
        </form>
      </div>
    </div>
  );
}
