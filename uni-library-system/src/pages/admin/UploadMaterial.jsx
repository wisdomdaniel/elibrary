import React, { useState } from 'react';
import { xanoService } from '../../services/xanoService';
import { useSearch } from '../../context/SearchContext';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  BookOpen,
  Hash,
  User,
  Layout,
  Info,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const UploadMaterial = () => {
  const { refreshMaterials } = useSearch();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Lecture Note',
    code: '',
    department: 'Computer Science',
    description: '',
    file: null
  });

  const categories = ['Lecture Note', 'Past Question', 'Textbook', 'Reference', 'Syllabus'];
  const departments = ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Business', 'Law', 'Medicine'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await xanoService.uploadMaterial({
        title: formData.title,
        author: formData.author,
        category: formData.category,
        code: formData.code,
        department: formData.department,
        description: formData.description,
        fileName: formData.file ? formData.file.name : 'document.pdf'
      });
      if (refreshMaterials) refreshMaterials();
      setIsUploading(false);
      setUploadSuccess(true);
    } catch (err) {
      setIsUploading(false);
      alert('Upload error: ' + err.message);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (uploadSuccess) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white rounded-[3rem] p-12 border border-gray-50 shadow-2xl shadow-green-100 text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900">Upload Successful!</h2>
            <p className="text-gray-500 font-bold">"{formData.title}" has been added to the library.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setUploadSuccess(false);
                setStep(1);
                setFormData({
                    title: '',
                    author: '',
                    category: 'Lecture Note',
                    code: '',
                    department: 'Computer Science',
                    description: '',
                    file: null
                });
              }}
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-xl shadow-primary/25 transition-all"
            >
              Upload Another
            </button>
            <button
              onClick={() => window.location.href = '/admin/manage'}
              className="w-full sm:w-auto px-10 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Upload New Material</h1>
          <p className="text-gray-500 font-bold mt-1">Publish academic resources for students to access.</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-500 ${
                step === s ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' :
                step > s ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              {s < 3 && <div className={`w-8 h-1 rounded-full transition-colors duration-500 ${step > s ? 'bg-green-500' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Info Panel */}
        <div className="lg:col-span-4 bg-gray-50/50 p-10 border-r border-gray-50">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Info size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900">Guidelines</h3>
              <p className="text-sm font-bold text-gray-500 leading-relaxed">
                Ensure materials are in PDF or Office formats. Maximum file size is 50MB. Verify the copyright and accuracy of the content before publishing.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-green-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Metadata Accuracy</h4>
                  <p className="text-xs font-bold text-gray-400 mt-1">Correct course codes help students find your material faster.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Format Preview</h4>
                  <p className="text-xs font-bold text-gray-400 mt-1">Add a clear description to give students a preview of what they'll learn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-8 p-10 md:p-14">
          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Layout size={14} /> Material Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Advanced Algorithms"
                      className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <User size={14} /> Author / Lecturer
                    </label>
                    <input
                      type="text"
                      name="author"
                      required
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="e.g. Prof. John Doe"
                      className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <BookOpen size={14} /> Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Hash size={14} /> Course Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      required
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="e.g. CSC401"
                      className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Layout size={14} /> Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} /> Description
                  </label>
                  <textarea
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe what this material covers..."
                    className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300 resize-none"
                  ></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <UploadCloud size={14} /> Select File
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className={`border-3 border-dashed rounded-[2rem] p-16 text-center transition-all ${
                      formData.file ? 'border-green-200 bg-green-50/50' : 'border-gray-100 group-hover:border-primary/30 group-hover:bg-primary/5'
                    }`}>
                      <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all ${
                        formData.file ? 'bg-green-100 text-green-500' : 'bg-gray-50 text-gray-400 group-hover:text-primary group-hover:scale-110'
                      }`}>
                        {formData.file ? <CheckCircle2 size={40} /> : <UploadCloud size={40} />}
                      </div>
                      {formData.file ? (
                        <div className="space-y-1">
                          <p className="text-sm font-black text-gray-900">{formData.file.name}</p>
                          <p className="text-xs font-bold text-gray-400">{(formData.file.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-sm font-black text-gray-900">Drop your file here or click to browse</p>
                          <p className="text-xs font-bold text-gray-400 uppercase">PDF, DOCX, PPTX up to 50MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {formData.file && (
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 flex items-center gap-4 text-blue-600">
                        <AlertCircle size={24} className="flex-shrink-0" />
                        <p className="text-xs font-black leading-relaxed">
                            Double-check that you've entered the correct course code (<strong>{formData.code}</strong>) before finalizing the upload.
                        </p>
                    </div>
                )}
              </div>
            )}

            {/* Form Footer / Navigation */}
            <div className="pt-10 border-t border-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1 || isUploading}
                className={`flex items-center gap-2 text-sm font-black transition-all ${
                  step === 1 || isUploading ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-black transition-all hover:shadow-xl active:scale-95"
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.file || isUploading}
                  className={`bg-primary text-white px-12 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg shadow-primary/25 transition-all active:scale-95 ${
                    !formData.file || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark hover:shadow-xl'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Publish Material
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMaterial;
