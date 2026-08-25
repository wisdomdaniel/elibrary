import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, X } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { getFilePictorialCover } from '../services/formatGraphicService';

const UploadModal = ({ isOpen, onClose }) => {
  const { refreshMaterials } = useSearch();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Lecture Note',
    code: '',
    department: 'Computer Science',
    description: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          type: file.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          content: event.target.result
        });
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.code) {
      setError('Please fill in required fields (Title and Course Code)');
      return;
    }

    const format = uploadedFile ? uploadedFile.name.split('.').pop() : 'docx';
    const pictorialImage = getFilePictorialCover(formData.title, format, formData.category);

    const newMaterial = {
      id: Date.now(),
      title: formData.title,
      author: formData.author || 'Department Lecturer',
      category: formData.category,
      code: formData.code.toUpperCase(),
      department: formData.department,
      rating: 4.8,
      image: pictorialImage,
      fileName: uploadedFile ? uploadedFile.name : `${formData.code}_${formData.title.replace(/\s+/g, '_')}.${format}`,
      fileContent: uploadedFile ? uploadedFile.content : null,
      time: 'Just now',
      description: formData.description || 'Uploaded learning resource.',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    const existing = JSON.parse(localStorage.getItem('uni_materials') || '[]');
    localStorage.setItem('uni_materials', JSON.stringify([newMaterial, ...existing]));

    window.dispatchEvent(new Event('storage'));
    if (refreshMaterials) refreshMaterials();

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ title: '', author: '', category: 'Lecture Note', code: '', department: 'Computer Science', description: '' });
      setUploadedFile(null);
      setError('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-all"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-slate-100 text-[#2B3649] flex items-center justify-center">
            <UploadCloud size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">Upload New Material</h2>
            <p className="text-[11px] font-bold text-slate-400">Add lecture notes or past questions to library</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto animate-bounce" />
            <p className="text-base font-black text-slate-900">Material Uploaded Successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase mb-1">Material Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Data Structures and Algorithms"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#2B3649] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase mb-1">Course Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSC301"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#2B3649] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#2B3649] focus:bg-white transition-all"
                >
                  <option value="Lecture Note">Lecture Note</option>
                  <option value="Past Question">Past Question</option>
                  <option value="Textbook">Textbook</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase mb-1">Author / Lecturer</label>
              <input
                type="text"
                placeholder="e.g. Dr. A. B. Smith"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#2B3649] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase mb-1">Attach Document File (.pdf, .docx, .pptx)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-[#2B3649] transition-colors relative cursor-pointer bg-slate-50/50">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.pptx,.ppt,.txt"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-xs">
                    <FileText size={16} />
                    <span>{uploadedFile.name} ({uploadedFile.size})</span>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs font-bold space-y-1">
                    <UploadCloud size={24} className="mx-auto text-slate-300" />
                    <p>Click or drag file here to attach</p>
                    <p className="text-[10px] font-semibold text-slate-400">PDF, DOCX, PPTX supported</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#2B3649] text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                Upload & Save Material
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
