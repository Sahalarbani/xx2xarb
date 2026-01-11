import React, { useState, useEffect } from 'react';
import { Skin } from '../types';
import { getSkins, addSkin, deleteSkin } from '../services/db';
import { Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkin, setNewSkin] = useState({
    title: '',
    description: '',
    image: '',
    category: 'street' as Skin['category'],
    author: 'Admin',
    downloadUrl: '#'
  });

  useEffect(() => {
    setSkins(getSkins());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skin?')) {
      deleteSkin(id);
      setSkins(getSkins());
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newSkin.image) newSkin.image = 'https://picsum.photos/800/600'; // Fallback
    
    addSkin(newSkin);
    setSkins(getSkins());
    setIsModalOpen(false);
    // Reset form
    setNewSkin({
        title: '',
        description: '',
        image: '',
        category: 'street',
        author: 'Admin',
        downloadUrl: '#'
    });
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your skin database</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-secondary hover:bg-brand-secondary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-brand-secondary/20"
        >
          <Plus size={20} />
          Add New Skin
        </button>
      </div>

      <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-black/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Skin Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {skins.map((skin) => (
                <tr key={skin.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-16 flex-shrink-0 bg-gray-800 rounded overflow-hidden mr-4">
                        <img className="h-full w-full object-cover" src={skin.image} alt="" />
                      </div>
                      <div className="text-sm font-medium text-white">{skin.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                      {skin.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {skin.downloads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDelete(skin.id)}
                      className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 p-2 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-brand-surface border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Upload New Skin</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:outline-none"
                  value={newSkin.title}
                  onChange={e => setNewSkin({...newSkin, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:outline-none h-24"
                  value={newSkin.description}
                  onChange={e => setNewSkin({...newSkin, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                   <select 
                     className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:outline-none"
                     value={newSkin.category}
                     onChange={e => setNewSkin({...newSkin, category: e.target.value as any})}
                   >
                     <option value="racing">Racing</option>
                     <option value="street">Street</option>
                     <option value="drift">Drift</option>
                     <option value="rally">Rally</option>
                   </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-accent focus:outline-none"
                    value={newSkin.image}
                    onChange={e => setNewSkin({...newSkin, image: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-accent text-black font-bold py-3 rounded-lg hover:bg-brand-accent/90 transition-colors mt-4"
              >
                Create Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
