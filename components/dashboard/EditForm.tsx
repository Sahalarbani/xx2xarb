"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateSkin } from "@/app/lib/actions"; // Panggil fungsi update
import { Edit3, Zap, Globe, Lock, ImageIcon, FolderOpen, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skin } from "@/types"; // Pastikan path type lu bener
import Script from "next/script";

// Tombol Submit dengan Loading State
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`w-full relative bg-brand-accent hover:bg-brand-accent/90 text-black font-oxanium font-bold text-xl py-6 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all flex items-center justify-center gap-4 group overflow-hidden ${pending ? 'opacity-70 cursor-wait' : ''}`}>
      {!pending && <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>}
      <span className="flex items-center gap-4 relative z-10">
        {pending ? <><Loader2 size={28} className="animate-spin" /> UPDATING MATRIX...</> : <><Zap size={28} strokeWidth={3} /> CONFIRM UPDATE</>}
      </span>
    </button>
  );
}

export default function EditForm({ skin }: { skin: any }) {
  // Bind ID ke Server Action biar dia tau skin mana yang diedit
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

  // Widget Cloudinary (Sama kayak Create)
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
    <div className="max-w-4xl mx-auto">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />
      
      <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-brand-accent mb-8 font-bold uppercase text-xs tracking-[0.2em] group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Cancel Update
      </Link>

      <div className="bg-brand-surface border border-white/5 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-brand-accent/10 rounded-sm border border-brand-accent/20"><Edit3 size={24} className="text-brand-accent" /></div>
          <div><h1 className="text-3xl font-oxanium font-black text-white uppercase tracking-tighter">Edit Sequence</h1><p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">Modify Asset: {skin.id}</p></div>
        </div>

        <form action={dispatch} className="space-y-8">
            {/* INPUTS (Sama kayak Create tapi pake Value dari state) */}
            <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Asset Designation</label>
                    <input name="title" type="text" value={formData.title} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-oxanium font-black uppercase tracking-widest" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Classification</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-oxanium font-bold uppercase tracking-widest cursor-pointer">
                            <option value="street">Street</option><option value="racing">Racing</option><option value="drift">Drift</option><option value="rally">Rally</option><option value="custom">Custom</option>
                        </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Status</label>
                      <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-lg h-[58px]">
                        <input type="hidden" name="published" value={formData.published.toString()} />
                        <button type="button" onClick={() => setFormData((p: any) => ({ ...p, published: !p.published }))} className={`flex-grow flex items-center justify-center gap-2 px-4 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all ${formData.published ? 'bg-brand-accent/20 text-brand-accent' : 'bg-white/5 text-gray-500'}`}>
                          {formData.published ? <Globe size={14} /> : <Lock size={14} />} {formData.published ? 'Public' : 'Private'}
                        </button>
                      </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                 <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Visual Source</label>
                    <div className="flex gap-4">
                        <input name="image" type="text" value={formData.image} onChange={handleInputChange} className="flex-grow bg-black/40 border border-white/10 rounded-lg p-4 text-gray-400 text-xs" />
                        <button type="button" onClick={() => openWidget('image')} className="px-4 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent rounded-lg"><ImageIcon size={18} /></button>
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Description</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-gray-200" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Download Link</label>
                    <div className="flex gap-4">
                        <input name="downloadUrl" type="text" value={formData.downloadUrl} onChange={handleInputChange} className="flex-grow bg-black/40 border border-white/10 rounded-lg p-4 text-white" />
                        <button type="button" onClick={() => openWidget('downloadUrl')} className="px-4 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent rounded-lg"><FolderOpen size={18} /></button>
                    </div>
                 </div>
            </div>

            {state?.message && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest">{state.message}</div>}
            <SubmitButton />
        </form>
      </div>
    </div>
  );
}
