"use client";

import React, { useState, useEffect } from "react";
import { Save, Trash2, ChevronDown, FileText, X, Check } from "lucide-react";
import { getPresets, savePreset, deletePreset } from "@/app/lib/actions";

interface Preset {
  id: string;
  name: string;
  content: string;
}

interface PresetSelectorProps {
  currentDescription: string;
  onSelect: (content: string) => void;
}

export default function PresetSelector({ currentDescription, onSelect }: PresetSelectorProps) {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    const data = await getPresets();
    setPresets(data);
  };

  const handleSave = async () => {
    if (!newName.trim() || !currentDescription.trim()) return;
    setLoading(true);
    const res = await savePreset(newName, currentDescription);
    if (res.success) {
      setNewName("");
      setIsSaving(false);
      loadPresets();
    }
    setLoading(false);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Delete this preset permanently?")) return;
    await deletePreset(id);
    loadPresets();
  };

  return (
    <div className="mb-4 relative z-20">
      <div className="flex gap-3">
        {/* DROPDOWN MAIN WRAPPER */}
        <div className="relative flex-grow">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00f0ff]/50 text-[#00f0ff] px-6 py-3 rounded-full text-xs font-oxanium font-bold uppercase tracking-widest transition-all duration-300 shadow-sm"
          >
            <span className="flex items-center gap-2">
              <FileText size={14} /> LOAD PRESET ({presets.length})
            </span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-3 bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden max-h-64 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200 p-2">
              {presets.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-xs font-mono">NO DATA FOUND</div>
              ) : (
                presets.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelect(p.content);
                      setIsOpen(false);
                    }}
                    className="group flex items-center justify-between px-4 py-3 hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
                  >
                    <span className="text-gray-300 group-hover:text-white text-xs font-oxanium truncate">{p.name}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, p.id)}
                      className="text-gray-600 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* SAVE BUTTON AREA */}
        {!isSaving ? (
          <button
            type="button"
            onClick={() => setIsSaving(true)}
            className="bg-white/5 border border-white/10 text-gray-400 hover:bg-[#00f0ff] hover:text-black hover:border-[#00f0ff] w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
            title="Save Current as Preset"
          >
            <Save size={18} />
          </button>
        ) : (
          <div className="flex items-center gap-2 animate-in slide-in-from-right-5 fade-in">
            <input
              type="text"
              placeholder="NAME..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-black/40 border border-[#00f0ff]/50 text-white text-xs px-4 py-3 rounded-full font-oxanium focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/20 w-32 md:w-48 placeholder-gray-600"
              autoFocus
            />
            <button type="button" onClick={handleSave} disabled={loading} className="text-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff] hover:text-black w-10 h-10 flex items-center justify-center rounded-full border border-[#00f0ff]/30 transition-all">
                <Check size={16} />
            </button>
            <button type="button" onClick={() => setIsSaving(false)} className="text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white w-10 h-10 flex items-center justify-center rounded-full border border-red-500/30 transition-all">
                <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
