import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Lock,
  Moon,
  Sun,
  ChevronRight,
  Save,
  Mail,
  Building,
  ShieldCheck,
  Palette
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'preferences', name: 'Preferences', icon: Palette },
  ];

  const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        <input
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg py-3 pl-11 pr-4 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          {...props}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-400 dark:text-slate-500 font-bold">Manage your account preferences and security</p>
      </div>

      <div className="flex gap-8">
        {/* Navigation Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-100 dark:border-slate-700'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-6 pb-8 border-b border-slate-50 dark:border-slate-800">
                <div className="h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <User size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{user?.role} Account</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <InputField label="Full Name" icon={User} defaultValue={user?.name} />
                <InputField label="Email Address" icon={Mail} defaultValue={user?.email} readOnly />
                <InputField label="Department" icon={Building} defaultValue="Computer Science" />
                <InputField label="Student ID" icon={ShieldCheck} defaultValue="STU-2024-001" readOnly />
              </div>

              <div className="pt-4">
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-sm font-black transition-all shadow-lg shadow-primary/20 active:scale-95">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-4 border-b border-slate-50 dark:border-slate-800">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Security Settings</h3>
                <p className="text-sm text-slate-400 font-bold">Update your password and protect your account</p>
              </div>

              <div className="max-w-md space-y-6">
                <InputField label="Current Password" icon={Lock} type="password" placeholder="••••••••" />
                <InputField label="New Password" icon={Lock} type="password" placeholder="••••••••" />
                <InputField label="Confirm New Password" icon={Lock} type="password" placeholder="••••••••" />
              </div>

              <div className="pt-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-sm font-black transition-all shadow-lg shadow-primary/20 active:scale-95">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-4 border-b border-slate-50 dark:border-slate-800">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">App Preferences</h3>
                <p className="text-sm text-slate-400 font-bold">Customize your reading experience</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-white text-slate-900'} shadow-sm transition-all`}>
                      {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white">Dark Mode</h4>
                      <p className="text-xs text-slate-400 font-bold">Switch to a darker theme for night reading</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors outline-none ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 opacity-50">
                  <h4 className="font-black text-slate-900 dark:text-white mb-1">Language</h4>
                  <p className="text-xs text-slate-400 font-bold">Default system language (English Only in Beta)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
