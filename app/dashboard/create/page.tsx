"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createSkin } from "@/app/lib/actions";
import { ArrowLeft, Edit3, Zap, Globe, Lock, Link as LinkIcon, ImageIcon, Plus, FolderOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { SkinCard } from "@/components/SkinCard";
import { Skin } from "@/types";
import Script from "next/script";
import ImageGalleryModal from "@/components/ImageGalleryModal";
import PresetSelector from "@/components/PresetSelector"; 

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`w-full relative bg-brand-accent hover:bg-brand-accent/90 text-black font-oxanium font-bold text-xl py-4 md:py-6 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all flex items-center justify-center gap-4 group overflow-hidden ${pending ? 'opacity-70 cursor-wait' : ''}`}>
      {!pending && <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>}
      <span className="flex items-center gap-3 md:gap-4 relative z-10 text-sm md:text-xl">
        {pending ? <><Loader2 size={24} className="animate-spin" /> INITIALIZING...</> : <><Zap size={24} strokeWidth={3} className="md:w-7 md:h-7" /> FINALIZE DEPLOYMENT</>}
      </span>
    </button>
  );
}

const ErrorMessage = ({ error }: { error?: string[] }) => (
  error ? <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> {error[0]}</p> : null
);

export default function CreateSkinPage() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSkin, initialState);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [targetField, setTargetField] = useState<'image' | 'downloadUrl'>('image');

  const [formData, setFormData] = useState({
    title: "", description: "", image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2670&auto=format&fit=crop",
    category: "street", published: true, downloadUrl: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === "categorySelect") {
      if (value === "custom") { setIsCustomCategory(true); setFormData(p => ({ ...p, category: "" })); }
      else { setIsCustomCategory(false); setFormData(p => ({ ...p, category: value })); }
      return;
    }
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const openUploadWidget = (field: 'image' | 'downloadUrl') => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType: field === 'image' ? 'image' : 'auto',
        folder: "arbskin_uploads",
        styles: { palette: { window: "#000000", sourceBg: "#1a1a1a", windowBorder: "#00f0ff", tabIcon: "#00f0ff", inactiveTabIcon: "#69778A", menuIcons: "#00f0ff", link: "#00f0ff", action: "#00f0ff", inProgress: "#00f0ff", complete: "#33ff00", error: "#cc0000", textDark: "#000000", textLight: "#ffffff" } },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") { setFormData(prev => ({ ...prev, [field]: result.info.secure_url })); }
      }
    );
    widget.open();
  };

  const openGallery = (field: 'image' | 'downloadUrl') => { setTargetField(field); setIsGalleryOpen(true); };

  const previewSkin: Skin = {
    id: "PREVIEW", title: formData.title || "Target Asset Designation", description: formData.description || "Briefing...",
    image: formData.image, downloadUrl: formData.downloadUrl || "#", category: formData.category || "UNCLASSIFIED",
    author: "Active Operator", downloads: 0, createdAt: new Date().toISOString(),
  };

  // FIX: Padding tombol dikecilin di mobile (px-3) biar muat
  const buttonStyle = "h-[50px] px-3 md:px-6 rounded-full font-oxanium font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center gap-2 md:gap-3 border border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 whitespace-nowrap";

  return (
    <div className="min-h-screen bg-brand-dark pt-20 md:pt-24 px-2 md:px-4 pb-12 w-full overflow-x-hidden">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />
      <ImageGalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} onSelect={(url) => setFormData(prev => ({ ...prev, [targetField]: url }))} />

      <div className="max-w-[1440px] mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-brand-accent mb-6 md:mb-8 transition-all group font-bold uppercase text-xs tracking-[0.2em] px-2">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Abort Deployment
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
          <div className="lg:w-7/12 space-y-8">
            {/* FIX: Mobile padding p-4, Desktop p-10. Rounded Mobile 3xl, Desktop 40px */}
            <div className="bg-brand-surface border border-white/5 rounded-3xl md:rounded-[40px] p-4 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
              <div className="flex items-center gap-4 mb-6 md:mb-10 pl-2">
                <div className="p-3 bg-brand-accent/10 rounded-2xl border border-brand-accent/20"><Edit3 size={24} className="text-brand-accent" /></div>
                <div className="overflow-hidden">
                    <h1 className="text-xl md:text-3xl font-oxanium font-black text-white uppercase tracking-tighter truncate">Sequence Editor</h1>
                    <p className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] truncate">Initialize New Asset</p>
                </div>
              </div>

              <form action={dispatch} className="space-y-6 md:space-y-8">
                {/* Section 1 */}
                <div className="space-y-5 md:space-y-6 p-4 md:p-6 bg-black/20 rounded-2xl md:rounded-3xl border border-white/5">
                  <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Asset Designation</label>
                    <input name="title" type="text" placeholder="e.g. NEON VORTEX LIVERY" value={formData.title} onChange={handleInputChange} className={`w-full bg-black/40 border ${state.errors?.title ? 'border-red-500 animate-pulse' : 'border-white/10'} rounded-full p-4 text-white font-oxanium font-black focus:border-brand-accent focus:outline-none uppercase tracking-widest transition-colors text-sm md:text-base`} />
                    <ErrorMessage error={state.errors?.title} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Classification</label>
                      <select name="categorySelect" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-full p-4 text-white font-oxanium font-bold text-xs md:text-sm focus:border-brand-accent focus:outline-none uppercase tracking-widest cursor-pointer mb-2 appearance-none">
                        <option value="street">Street Division</option>
                        <option value="racing">Racing Division</option>
                        <option value="drift">Drift Division</option>
                        <option value="rally">Rally Division</option>
                        <option value="custom">+ Input Manual</option>
                      </select>
                      {isCustomCategory && (<div className="relative animate-in fade-in slide-in-from-top-2"><input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="TYPE CUSTOM..." className={`w-full bg-brand-accent/10 border ${state.errors?.category ? 'border-red-500' : 'border-brand-accent/50'} rounded-full p-4 text-brand-accent font-black uppercase tracking-widest focus:outline-none text-xs md:text-sm`} /><Plus size={16} className="absolute right-4 top-4 text-brand-accent" /></div>)}
                      {!isCustomCategory && <input type="hidden" name="category" value={formData.category} />}
                      <ErrorMessage error={state.errors?.category} />
                    </div>
                    <div>
                      <label className="block text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Transmission</label>
                      <div className="flex items-center gap-4 p-1 md:p-4 bg-black/40 border border-white/10 rounded-full h-[58px]">
                        <input type="hidden" name="published" value={formData.published.toString()} />
                        <button type="button" onClick={() => setFormData(p => ({ ...p, published: !p.published }))} className={`flex-grow h-full flex items-center justify-center gap-2 px-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${formData.published ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                          {formData.published ? <Globe size={14} /> : <Lock size={14} />} {formData.published ? 'Public Broadcast' : 'Private'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-5 md:space-y-6 p-4 md:p-6 bg-black/20 rounded-2xl md:rounded-3xl border border-white/5">
                  <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Visual Source (Preview)</label>
                    {/* FIX: gap-2 biar rapet di HP. Input dikasih min-w-0 biar bisa mengecil */}
                    <div className="flex gap-2 md:gap-4 items-center">
                      <input name="image" type="text" placeholder="URL..." value={formData.image} onChange={handleInputChange} className={`flex-grow min-w-0 bg-black/40 border ${state.errors?.image ? 'border-red-500' : 'border-white/10'} rounded-full p-4 text-gray-400 font-medium text-[10px] md:text-xs focus:border-brand-accent focus:outline-none h-[50px]`} />
                      <button type="button" onClick={() => openUploadWidget('image')} className={`${buttonStyle} !bg-white/5 !text-white hover:!bg-white/10 !border-white/10 flex-shrink-0`}><FolderOpen size={16} /> <span className="hidden sm:inline">NEW</span></button>
                      <button type="button" onClick={() => openGallery('image')} className={`${buttonStyle} flex-shrink-0`}><ImageIcon size={16} /> <span className="hidden sm:inline">LIBRARY</span></button>
                    </div>
                    <ErrorMessage error={state.errors?.image} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3 ml-2">
                      <label className="block text-[9px] font-black text-brand-accent uppercase tracking-[0.2em]">Description</label>
                    </div>
                    <PresetSelector currentDescription={formData.description} onSelect={(val) => setFormData(prev => ({ ...prev, description: val }))} />
                     
                    <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className={`w-full bg-black/40 border ${state.errors?.description ? 'border-red-500' : 'border-white/10'} rounded-2xl md:rounded-3xl p-4 text-gray-200 focus:border-brand-accent focus:outline-none mt-2 text-sm`} />
                    <ErrorMessage error={state.errors?.description} />
                  </div>

                  <div>
                    <label className="block text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Payload (Download Link)</label>
                    {/* FIX: gap-2 & min-w-0 */}
                    <div className="flex gap-2 md:gap-4 items-center">
                      <input name="downloadUrl" type="text" placeholder="Link..." value={formData.downloadUrl} onChange={handleInputChange} className={`flex-grow min-w-0 bg-black/40 border ${state.errors?.downloadUrl ? 'border-red-500' : 'border-white/10'} rounded-full p-4 text-white focus:border-brand-accent focus:outline-none h-[50px] text-[10px] md:text-xs`} />
                      <button type="button" onClick={() => openUploadWidget('downloadUrl')} className={`${buttonStyle} !bg-white/5 !text-white hover:!bg-white/10 !border-white/10 flex-shrink-0`}><FolderOpen size={16} /> <span className="hidden sm:inline">UPLOAD</span></button>
                      <button type="button" onClick={() => openGallery('downloadUrl')} className={`${buttonStyle} flex-shrink-0`}><ImageIcon size={16} /> <span className="hidden sm:inline">LIBRARY</span></button>
                    </div>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, downloadUrl: prev.image }))} className="text-[9px] md:text-[10px] font-bold text-gray-500 mt-3 hover:text-brand-accent transition-colors flex items-center gap-2 uppercase tracking-widest cursor-pointer group ml-2"><LinkIcon size={12} className="group-hover:rotate-45 transition-transform" />[OR USE PREVIEW IMAGE SOURCE]</button>
                    <ErrorMessage error={state.errors?.downloadUrl} />
                  </div>
                </div>

                {state.message && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> {state.message}
                  </div>
                )}
                <SubmitButton />
              </form>
            </div>
          </div>
          <div className="lg:w-5/12"><div className="sticky top-28"><SkinCard skin={previewSkin} /></div></div>
        </div>
      </div>
    </div>
  );
}
