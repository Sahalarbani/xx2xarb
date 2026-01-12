"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { createSkin } from "@/app/lib/actions";
import { ArrowLeft, Edit3, Zap, Globe, Lock, Upload, Plus } from "lucide-react";
import Link from "next/link";
import { SkinCard } from "@/components/SkinCard";
import { Skin } from "@/types";
import Script from "next/script";

export default function CreateSkinPage() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSkin, initialState);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // ✅ STATE: Pakai 'image' (bukan imageUrl)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2670&auto=format&fit=crop",
    category: "street",
    published: true,
    downloadUrl: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Logic Kategori Manual
    if (name === "categorySelect") {
      if (value === "custom") {
        setIsCustomCategory(true);
        setFormData(prev => ({ ...prev, category: "" }));
      } else {
        setIsCustomCategory(false);
        setFormData(prev => ({ ...prev, category: value }));
      }
      return;
    }

    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  // ✅ WIDGET CLOUDINARY
  const openWidget = () => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "ganti_nama_cloud_lu", // ⚠️ GANTI
        uploadPreset: "ganti_preset_lu", // ⚠️ GANTI
        sources: ["local", "url"],
        multiple: false,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          // ✅ Simpan ke 'image'
          setFormData(prev => ({ ...prev, image: result.info.secure_url }));
        }
      }
    );
    widget.open();
  };

  const previewSkin: Skin = {
    id: "PREVIEW",
    title: formData.title || "Target Asset Designation",
    description: formData.description || "Sequence briefing required...",
    image: formData.image, // ✅ Pakai 'image'
    downloadUrl: formData.downloadUrl || "#",
    category: formData.category || "UNCLASSIFIED",
    author: "Active Operator",
    downloads: 0,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 px-4 pb-12">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />

      <div className="max-w-[1440px] mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-brand-accent mb-8 transition-all group font-bold uppercase text-xs tracking-[0.2em]">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Abort Deployment / Return to Center
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Editor Side */}
          <div className="lg:w-7/12 space-y-8">
            <div className="bg-brand-surface border border-white/5 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
               
              <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-accent/10 rounded-sm border border-brand-accent/20">
                      <Edit3 size={24} className="text-brand-accent" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-oxanium font-black text-white uppercase tracking-tighter">Sequence Editor</h1>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">Initialize New Asset Parameters</p>
                    </div>
                  </div>
               </div>

              <form action={dispatch} className="space-y-8">
                {/* Identification */}
                <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                   <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Asset Designation</label>
                    <input
                      name="title"
                      type="text"
                      placeholder="e.g. NEON VORTEX LIVERY"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-oxanium font-black focus:border-brand-accent focus:outline-none uppercase tracking-widest"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Asset Classification</label>
                      <select
                        name="categorySelect"
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-oxanium font-bold text-sm focus:border-brand-accent focus:outline-none appearance-none uppercase tracking-widest cursor-pointer mb-2"
                      >
                        <option value="street">Street Division</option>
                        <option value="racing">Racing Division</option>
                        <option value="drift">Drift Division</option>
                        <option value="rally">Rally Division</option>
                        <option value="custom">+ Input Manual Category</option>
                      </select>

                      {isCustomCategory && (
                         <div className="relative animate-in fade-in slide-in-from-top-2">
                            <input 
                                type="text" 
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="TYPE CUSTOM CATEGORY..."
                                className="w-full bg-brand-accent/10 border border-brand-accent/50 rounded-lg p-4 text-brand-accent font-black uppercase tracking-widest focus:outline-none"
                            />
                            <Plus size={16} className="absolute right-4 top-4 text-brand-accent" />
                         </div>
                      )}
                      {!isCustomCategory && <input type="hidden" name="category" value={formData.category} />}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Transmission Status</label>
                      <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-lg h-[58px]">
                        <input type="hidden" name="published" value={formData.published.toString()} />
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
                          className={`flex-grow flex items-center justify-center gap-2 px-4 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all ${
                            formData.published ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' : 'bg-white/5 text-gray-500 border border-white/10'
                          }`}
                        >
                          {formData.published ? <Globe size={14} /> : <Lock size={14} />}
                          {formData.published ? 'Public Broadcast' : 'Private Encrypted'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uplinks */}
                <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                  <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Visual Source</label>
                      <div className="flex gap-4">
                        {/* ✅ NAME DIGANTI JADI 'image' */}
                        <input
                            name="image" 
                            type="text"
                            placeholder="Image URL..."
                            value={formData.image}
                            onChange={handleInputChange}
                            className="flex-grow bg-black/40 border border-white/10 rounded-lg p-4 text-gray-400 font-medium text-xs focus:border-brand-accent focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={openWidget}
                            className="bg-white text-black px-6 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center gap-2"
                        >
                            <Upload size={16} /> Upload
                        </button>
                      </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-gray-200 focus:border-brand-accent focus:outline-none"
                    />
                  </div>

                  <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Download URL</label>
                      <input
                        name="downloadUrl"
                        type="text"
                        value={formData.downloadUrl}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-brand-accent focus:outline-none"
                      />
                  </div>
                </div>

                {state.message && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    {state.message}
                  </div>
                )}

               <button
                 type="submit"
                   className="w-full relative bg-brand-accent hover:bg-brand-accent/90 text-black font-oxanium font-bold text-xl py-6 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all flex items-center justify-center gap-4 group overflow-hidden"
                   >
                     <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                     <span className="flex items-center gap-4 relative z-10">
                         <Zap size={28} strokeWidth={3} />
                         FINALIZE DEPLOYMENT
                     </span>
                </button>                                      
              </form>
            </div>
          </div>

          {/* Preview Side */}
          <div className="lg:w-5/12">
             <div className="sticky top-28">
                <SkinCard skin={previewSkin} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
