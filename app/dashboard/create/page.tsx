"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { createSkin } from "@/app/lib/actions";
// Import Icon yang lengkap biar ga error 'Plus' lagi
import { ArrowLeft, Edit3, Zap, Globe, Lock, Link as LinkIcon, FileArchive, Image as ImageIcon, Plus, FolderOpen } from "lucide-react";
import Link from "next/link";
import { SkinCard } from "@/components/SkinCard";
import { Skin } from "@/types";
import Script from "next/script";

export default function CreateSkinPage() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSkin, initialState);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // State Data
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

  // ✅ WIDGET SAKTI (MEDIA LIBRARY PRIORITY)
  const openWidget = (targetField: 'image' | 'downloadUrl') => {
    const resourceType = targetField === 'image' ? 'image' : 'auto';

    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        // 🔥 UPDATE: 'cloudinary' ditaruh PERTAMA biar jadi tab utama (Media Library)
        sources: ["cloudinary", "local", "url", "camera"], 
        multiple: false,
        resourceType: resourceType, 
        folder: "arbskin_uploads",
        showAdvancedOptions: true,
        // Styling Widget biar gelap (Dark Mode)
        styles: {
            palette: {
                window: "#000000",
                sourceBg: "#1a1a1a",
                windowBorder: "#00f0ff",
                tabIcon: "#00f0ff",
                inactiveTabIcon: "#69778A",
                menuIcons: "#00f0ff",
                link: "#00f0ff",
                action: "#00f0ff",
                inProgress: "#00f0ff",
                complete: "#33ff00",
                error: "#cc0000",
                textDark: "#000000",
                textLight: "#ffffff"
            },
        },
        // 🔒 TANDA TANGAN BACKEND
        uploadSignature: generateSignature
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          if (targetField === 'image') {
             setFormData(prev => ({ ...prev, image: result.info.secure_url }));
          } else {
             setFormData(prev => ({ ...prev, downloadUrl: result.info.secure_url }));
          }
        }
      }
    );
    widget.open();
  };

  // Helper Signature
  const generateSignature = async (callback: Function, paramsToSign: any) => {
    try {
      const response = await fetch("/api/sign-cloudinary", {
        method: "POST",
        body: JSON.stringify({ paramsToSign }),
      });
      const data = await response.json();
      callback(data.signature);
    } catch (error) {
      console.error("Sign failed", error);
    }
  };

  const previewSkin: Skin = {
    id: "PREVIEW",
    title: formData.title || "Target Asset Designation",
    description: formData.description || "Sequence briefing required...",
    image: formData.image,
    downloadUrl: formData.downloadUrl || "#",
    category: formData.category || "UNCLASSIFIED",
    author: "Active Operator",
    downloads: 0,
    createdAt: new Date().toISOString(),
  };

  // 🔥 STYLE TOMBOL KONSISTEN (CYBERPUNK STYLE)
  // Kita simpan class-nya di variabel biar gak ngetik ulang & pasti sama
  const buttonStyle = "h-[50px] px-6 rounded-lg font-oxanium font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-3 border border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 whitespace-nowrap";

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
                
                {/* 1. IDENTITAS */}
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
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Classification</label>
                      <select name="categorySelect" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-oxanium font-bold text-sm focus:border-brand-accent focus:outline-none uppercase tracking-widest cursor-pointer mb-2">
                        <option value="street">Street Division</option>
                        <option value="racing">Racing Division</option>
                        <option value="drift">Drift Division</option>
                        <option value="rally">Rally Division</option>
                        <option value="custom">+ Input Manual</option>
                      </select>
                      {isCustomCategory && (
                         <div className="relative animate-in fade-in slide-in-from-top-2">
                            <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="TYPE CUSTOM CATEGORY..." className="w-full bg-brand-accent/10 border border-brand-accent/50 rounded-lg p-4 text-brand-accent font-black uppercase tracking-widest focus:outline-none" />
                            <Plus size={16} className="absolute right-4 top-4 text-brand-accent" />
                         </div>
                      )}
                      {!isCustomCategory && <input type="hidden" name="category" value={formData.category} />}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Transmission</label>
                      <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-lg h-[58px]">
                        <input type="hidden" name="published" value={formData.published.toString()} />
                        <button type="button" onClick={() => setFormData(p => ({ ...p, published: !p.published }))} className={`flex-grow flex items-center justify-center gap-2 px-4 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all ${formData.published ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                          {formData.published ? <Globe size={14} /> : <Lock size={14} />}
                          {formData.published ? 'Public Broadcast' : 'Private Encrypted'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. VISUAL & PAYLOAD */}
                <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                  
                  {/* PREVIEW IMAGE */}
                  <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Visual Source (Preview)</label>
                      <div className="flex gap-4 items-center">
                        <input name="image" type="text" placeholder="Image URL..." value={formData.image} onChange={handleInputChange} className="flex-grow bg-black/40 border border-white/10 rounded-lg p-4 text-gray-400 font-medium text-xs focus:border-brand-accent focus:outline-none h-[50px]" />
                        
                        {/* TOMBOL 1: MEDIA LIBRARY / BROWSE */}
                        <button type="button" onClick={() => openWidget('image')} className={buttonStyle}>
                            <ImageIcon size={18} /> 
                            <span>Media Library</span>
                        </button>
                      </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Description</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-gray-200 focus:border-brand-accent focus:outline-none" />
                  </div>

                  {/* DOWNLOAD LINK */}
                  <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Payload (Download Link)</label>
                      <div className="flex gap-4 items-center">
                        <input name="downloadUrl" type="text" placeholder="Link or Upload File..." value={formData.downloadUrl} onChange={handleInputChange} className="flex-grow bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-brand-accent focus:outline-none h-[50px]" />
                        
                        {/* TOMBOL 2: UPLOAD FILE */}
                        <button type="button" onClick={() => openWidget('downloadUrl')} className={buttonStyle}>
                            <FolderOpen size={18} />
                            <span>Upload File</span>
                        </button>
                      </div>
                      
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, downloadUrl: prev.image }))} className="text-[10px] font-bold text-gray-500 mt-3 hover:text-brand-accent transition-colors flex items-center gap-2 uppercase tracking-widest cursor-pointer group">
                         <LinkIcon size={12} className="group-hover:rotate-45 transition-transform" />
                         [OR USE PREVIEW IMAGE SOURCE]
                      </button>
                  </div>
                </div>

                {state.message && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    {state.message}
                  </div>
                )}

               <button type="submit" className="w-full relative bg-brand-accent hover:bg-brand-accent/90 text-black font-oxanium font-bold text-xl py-6 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all flex items-center justify-center gap-4 group overflow-hidden">
                     <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                     <span className="flex items-center gap-4 relative z-10">
                         <Zap size={28} strokeWidth={3} />
                         FINALIZE DEPLOYMENT
                     </span>
                </button>                                      
              </form>
            </div>
          </div>

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
