import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { MOCK_MATERIALS } from '../../services/mockData';
import {
  Plus,
  Users,
  BookOpen,
  Download,
  MoreVertical,
  TrendingUp,
  Clock
} from 'lucide-react';
import UploadModal from '../../components/UploadModal';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const stats = [
    { label: 'Total Books', value: '1,284', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Active Users', value: '452', icon: Users, color: 'bg-green-500' },
    { label: 'Downloads', value: '12.5k', icon: Download, color: 'bg-purple-500' },
    { label: 'New This Week', value: '+48', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
          <p className="text-gray-500">Welcome back, {user?.name}. Manage your library assets here.</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="h-5 w-5" />
          Upload New Book
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`h-14 w-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gray-200`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recently Added Materials</h2>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Material</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Category</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_MATERIALS.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-8 rounded overflow-hidden">
                          <img src={book.image} className="h-full w-full object-cover" alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{book.title}</p>
                          <p className="text-xs text-gray-500">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        Published
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs / Quick Actions */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            System Activity
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 4 && <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-50"></div>}
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Material Uploaded</p>
                  <p className="text-xs text-gray-500">Admin User uploaded "Advanced CSS"</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-primary hover:text-primary transition-all text-sm">
            View All Logs
          </button>
        </div>
      </div>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
};

export default AdminDashboard;
