import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { MOCK_MATERIALS } from '../../services/mockData';
import UploadModal from '../../components/UploadModal';

const ManageMaterials = () => {
  const { searchQuery } = useSearch();
  const [materials, setMaterials] = useState(MOCK_MATERIALS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(MOCK_MATERIALS.map(m => m.category))];

  const filteredMaterials = useMemo(() => {
    let filtered = materials;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.code.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, materials, selectedCategory]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Manage Materials</h1>
          <p className="text-gray-500 font-bold">Total {materials.length} library assets available.</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Add New Material
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
          <Filter size={16} className="text-gray-400" />
          <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Filter By:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border border-gray-100 text-gray-400 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Material Info</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Code</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stats</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMaterials.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-12 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                        <img src={book.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 group-hover:text-primary transition-colors">{book.title}</p>
                        <p className="text-[11px] font-bold text-gray-400">by {book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-primary text-[10px] font-black uppercase tracking-tighter">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-gray-600">{book.code}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-400">
                      <div className="flex items-center gap-1">
                        <ArrowUpDown size={12} className="text-gray-300" />
                        1.2k
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        ★ {book.rating}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMaterials.length === 0 && (
          <div className="py-20 text-center">
            <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-bold">No materials found matching your criteria.</p>
          </div>
        )}
      </div>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
};

export default ManageMaterials;
