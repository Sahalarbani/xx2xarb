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
    <div className="mb-3 relative z-20">
      <div className="flex gap-2">
        {/* DROPDOWN */}
        <div className="relative flex-grow">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-black/40 border border-brand-accent/30 hover:border-brand-accent text-brand-accent px-4 py-2 rounded-lg text-[10px] font-oxanium font-bold uppercase tracking-widest transition-all"
          >
            <span className="flex items-center gap-2">
              <FileText size={14} /> LOAD PRESET ({presets.length})
            </span>
            <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-black border border-brand-accent rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.2)] overflow-hidden max-h-60 overflow-y-auto z-50">
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
                    className="group flex items-center justify-between p-3 hover:bg-brand-accent/10 cursor-pointer border-b border-white/5 last:border-0"
                  >
                    <span className="text-white text-xs font-oxanium truncate">{p.name}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, p.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* SAVE BUTTON */}
        {!isSaving ? (
          <button
            type="button"
            onClick={() => setIsSaving(true)}
            className="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-black px-4 py-2 rounded-lg transition-all"
          >
            <Save size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="NAME..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-black/60 border border-brand-accent text-white text-xs px-3 py-2 rounded-lg font-oxanium focus:outline-none w-24 sm:w-32"
              autoFocus
            />
            <button type="button" onClick={handleSave} disabled={loading} className="text-green-500 bg-green-500/10 p-2 rounded-lg border border-green-500/30"><Check size={16} /></button>
            <button type="button" onClick={() => setIsSaving(false)} className="text-red-500 bg-red-500/10 p-2 rounded-lg border border-red-500/30"><X size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
