"use client";

import React, { useState } from 'react';
import { Trash2, Edit3, Loader2 } from 'lucide-react';
import { deleteSkin } from '@/app/lib/actions';

interface PostActionsProps {
  id: string;
}

export const PostActions: React.FC<PostActionsProps> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("CONFIRM DESTRUCTIVE ACTION: PERMANENTLY DELETE ASSET?")) {
      setIsDeleting(true);
      try {
        await deleteSkin(id);
      } catch (err) {
        alert("Action failed: Internal system error.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <button 
        className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all rounded-sm"
        title="Edit Parameters"
      >
        <Edit3 size={16} />
      </button>
      
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all rounded-sm disabled:opacity-50"
        title="Terminate Asset"
      >
        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      </button>
    </div>
  );
};