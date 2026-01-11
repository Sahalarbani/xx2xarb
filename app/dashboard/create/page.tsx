	"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { createSkin } from "@/app/lib/actions";
import { ArrowLeft, Loader2, Monitor, Edit3, Eye, Zap, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { SkinCard } from "@/components/SkinCard";
import { Skin } from "@/types";

export default function CreateSkinPage() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSkin, initialState);

  // Form State for Live Preview
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2670&auto=format&fit=crop",
    category: "street" as Skin['category'],
    published: true,
    downloadUrl: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  // Construct preview object compatible with SkinCard
  const previewSkin: Skin = {
    id: "PREVIEW",
    title: formData.title || "Target Asset Designation",
    description: formData.description || "Sequence briefing required. Enter asset parameters in the console to generate live preview data...",
    image: formData.image || "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2670&auto=format&fit=crop",
    downloadUrl: formData.downloadUrl || "#",
    category: formData.category,
    author: "Active Operator",
    downloads: 0,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 px-4 pb-12">
      <div className="max-w-[1440px] mx-auto">
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 text-gray-500 hover:text-brand-accent mb-8 transition-all group font-bold uppercase text-xs tracking-[0.2em]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Abort Deployment / Return to Center
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Editor Side (Left) */}
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
                    <label htmlFor="title" className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">
                      Asset Designation (Title)
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="e.g. NEON VORTEX LIVERY v2.0"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full bg-black/40 border ${state.errors?.title ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-white font-oxanium font-black placeholder-gray-800 focus:border-brand-accent focus:outline-none transition-all uppercase tracking-widest`}
                    />
                    {state.errors?.title && (
                      <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{state.errors.title[0]}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">
                        Asset Classification
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-oxanium font-bold text-sm focus:border-brand-accent focus:outline-none transition-colors appearance-none uppercase tracking-widest cursor-pointer"
                      >
                        <option value="racing">Racing Division</option>
                        <option value="street">Street Division</option>
                        <option value="drift">Drift Division</option>
                        <option value="rally">Rally Division</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">
                        Transmission Status
                      </label>
                      <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-lg h-[58px]">
                        <input type="hidden" name="published" value={formData.published.toString()} />
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
                          className={`flex-grow flex items-center justify-center gap-2 px-4 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all ${
                            formData.published 
                              ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' 
                              : 'bg-white/5 text-gray-500 border border-white/10'
                          }`}
                        >
                          {formData.published ? <Globe size={14} /> : <Lock size={14} />}
                          {formData.published ? 'Public Broadcast' : 'Private Encrypted'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                  <div>
                    <label htmlFor="description" className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">
                      Mission Briefing (Description)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={8}
                      placeholder="Provide detailed asset specifications and installation requirements..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full bg-black/40 border ${state.errors?.description ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-gray-200 font-medium placeholder-gray-800 focus:border-brand-accent focus:outline-none transition-colors resize-none leading-relaxed whitespace-pre-wrap`}
                    />
                    {state.errors?.description && (
                      <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{state.errors.description[0]}</p>
                    )}
                  </div>
                </div>

                {/* Uplinks */}
                <div className="space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="imageUrl" className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">
                        Visual Source (Image URL)
                      </label>
                      <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        placeholder="https://source.com/preview.png"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-medium text-xs focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="downloadUrl" className="block text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">
                        Asset Payload (Download URL)
                      </label>
                      <input
                        id="downloadUrl"
                        name="downloadUrl"
                        type="text"
                        placeholder="https://storage.com/asset.zip"
                        value={formData.downloadUrl}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white font-medium text-xs focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
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

          {/* Preview Side (Right) */}
          <div className="lg:w-5/12">
             <div className="sticky top-28 space-y-8">
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_10px_#00f0ff]"></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Live Uplink Active</span>
                   </div>
                   <div className="flex items-center gap-2 text-brand-secondary">
                      <Monitor size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">WYSWIG Feed</span>
                   </div>
                </div>

                {/* Card Container with HUD Elements */}
                <div className="relative group">
                   {/* HUD Frame Decorations */}
                   <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-brand-accent/30 pointer-events-none group-hover:border-brand-accent transition-colors duration-500"></div>
                   <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-brand-accent/30 pointer-events-none group-hover:border-brand-accent transition-colors duration-500"></div>
                   
                   <div className="p-2 border border-white/5 bg-black/40 rounded-2xl backdrop-blur-md shadow-2xl">
                      <div className="pointer-events-none opacity-95 transition-all duration-300">
                         <SkinCard skin={previewSkin} />
                      </div>
                   </div>

                   <div className="mt-8 p-8 bg-brand-surface border border-white/5 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                      
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-2 bg-brand-secondary/10 rounded-sm">
                            <Eye size={20} className="text-brand-secondary" />
                         </div>
                         <div>
                            <h3 className="font-oxanium font-bold text-white uppercase tracking-widest text-sm">Deployment Summary</h3>
                            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Metadata Audit Ready</p>
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-3">
                            <span className="text-gray-500 font-bold uppercase tracking-widest">Protocol</span>
                            <span className="text-white font-black tracking-widest">{formData.category.toUpperCase()} // TRANSIT</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-3">
                            <span className="text-gray-500 font-bold uppercase tracking-widest">Broadcast Level</span>
                            <span className={formData.published ? "text-brand-accent font-black tracking-widest" : "text-gray-400 font-black tracking-widest"}>
                               {formData.published ? "UNRESTRICTED ACCESS" : "LOCAL CACHE ONLY"}
                            </span>
                         </div>
                         <div className="flex justify-between items-center text-[10px]">
                            <span className="text-gray-500 font-bold uppercase tracking-widest">Operator</span>
                            <span className="text-brand-secondary font-black tracking-widest">AUTHORIZED DIVISION</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
